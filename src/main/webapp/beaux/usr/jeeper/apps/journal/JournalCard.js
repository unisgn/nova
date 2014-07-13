Ext.define('Jeeper.apps.journal.JournalCard', {
    extend: 'Beaux.sys.XWindow',

    statics: {
        lastJournalDate: new Date(),
        lastJournalNumber: null
    },
    requires: [
        'Jeeper.model.AccountJournal',
        'Jeeper.model.AccountJournalItem',
        'Jeeper.model.FinancialAccount',
        'Jeeper.model.Partner',
        'Beaux.widget.MathExpField'
    ],

    model: 'Jeeper.model.AccountJournal',
    newTitle: 'new AccountJournal',
    titleProperty: 'number',


    layout: 'vbox',
    bodyPadding: 5,

    i18n: {

        btn_save: 'SAVE',
        btn_saveAndNew: 'Save & New',
        form_journalDate: 'Date',
        form_journalNumber: 'Number',
        grid_header_memo: 'Memo',
        grid_summary_total: 'Total',
        grid_header_account: 'Account',
        grid_header_debit: 'Debit',
        grid_header_credit: 'Credit',
        grid_header_partner: 'Partner',
        errMsg_title: 'ERROR'
    },


    itemGrid: null,

    journal: null,

    predictedMemo: '',

    /*
     * current editor(activaed) position
     */
    editorIndex: {
        row: -1,
        col: -1
    },

    constructor: function(cfg) {
        var me = this;
        me.journal = cfg.journal ? cfg.journal : Ext.create(me.model);
        if (me.journal.phantom) {
            me.journal.set('journalDate', me.statics().lastJournalDate);
        }

        me.callParent();
    },

    initComponent: function() {
        var me = this;

        // store loaded in chain
        // as of account and partner is not rendered directly, instead using 
        // the data of store, so the render process may delay for a while
        me.partnerStore = Ext.create('Ext.data.Store', {
            model: 'Jeeper.model.Partner',
            listeners: {
                load: function() {
                    me.partnerStore.add({
                        name: ''
                    });
                    me.initItemStore();
                },
                scope: me
            }
        });
        me.accountStore = Ext.create('Ext.data.Store', {
            model: 'Jeeper.model.FinancialAccount',
            listeners: {
                load: function() {
                    me.accountStore.add({
                        fullPathName: ''
                    });
                    me.partnerStore.load();
                },
                scope: me
            }
        });

        me.cellEditor = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeedit: me.onCellEditorBeforeEdit,
                // reset index after edit
                edit: function() {
                    me.editorIndex.row = -1;
                    me.editorIndex.col = -1;
                },
                scope: me
            }
        });

        me.card = me.buildModelCard();
        me.itemGrid = me.buildItemGrid();
        me.itemGrid.on({
            containercontextmenu: me.onGridContainerContextMenu,
            itemcontextmenu: me.onGridItemContextMenu,
            scope: me
        });

        Ext.apply(me, {
            items: [
                me.card, me.itemGrid
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                defaults: {
                    minWidth: 80
                },
                items: [{
                    xtype: 'component',
                    flex: 1
                }, {

                    text: me.i18n.btn_save,
                    handler: me.handle_btn_save,
                    socpe: me
                }, {
                    text: me.i18n.btn_saveAndNew,
                    handler: me.handle_btn_saveAndNew,
                    scope: me
                }]
            }]
        });

        me.card.loadRecord(me.journal);
        me.accountStore.load();
        me.callParent();
    },

    buildModelCard: function() {
        var me = this;
        return Ext.create('Ext.form.Panel', {
            width: 800,
            bodyPadding: 5,
            defaultType: 'textfield',
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                fieldDefaults: {
                    labelWidth: 60
                },
                items: [{
                    fieldLabel: me.i18n.form_journalDate,
                    name: 'journalDate',
                    xtype: 'datefield',
                    defaultValue: me.statics().lastJournalDate,
                }, {
                    xtype: 'component',
                    flex: 1
                }, {
                    fieldLabel: me.i18n.form_journalNumber,
                    name: 'number',
                    xtype: 'textfield'

                }]
            }]

        });
    },

    buildItemGrid: function() {
        var me = this;
        me.itemStore = Ext.create('Ext.data.Store', {
            model: 'Jeeper.model.AccountJournalItem'
        });


        return Ext.create('Ext.grid.Panel', {
            xtype: 'cell-editing',
            plugins: [
                me.cellEditor
            ],
            features: [{
                ftype: 'summary'
            }],
            width: 800,
            height: 300,
            columnLines: true,
            store: me.itemStore,

            selModel: {
                selType: 'cellmodel'
            },

            columns: {
                defaults: {
                    sortable: false
                },
                items: [{
                    header: me.i18n.grid_header_memo,
                    dataIndex: 'memo',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        //allowBlank: true
                        listeners: {
                            focus: function(field, eOpts) {
                                if (!field.getValue().trim()) {
                                    field.setValue(me.predictedMemo);
                                }
                            },
                            blur: function(field, eOpts) {
                                if (field.getValue().trim()) {
                                    me.predictedMemo = field.getValue().trim();
                                }
                            },
                            scope: me
                        }
                    },
                    summaryRenderer: function() {
                        return me.i18n.grid_summary_total;
                    }
                }, {
                    header: me.i18n.grid_header_account,
                    dataIndex: 'account_fk',
                    width: 150,
                    editor: Ext.create('Ext.form.field.ComboBox', {
                        displayField: 'fullPathName',
                        valueField: 'id',
                        typeAhead: true,
                        store: me.accountStore,
                        queryMode: 'local',
                        enableRegEx: true,
                        matchFieldWidth: false

                    }),

                    renderer: function(value) {
                        if (value > 0) {
                            return me.accountStore.findRecord('id', value).get('fullPathName');
                        } else {
                            return '';
                        }
                    }

                }, {
                    header: me.i18n.grid_header_debit,
                    align: 'right',
                    dataIndex: 'debit',
                    width: 100,
                    summaryRenderer: function() {
                        return me.getTotalDebit();
                    },
                    editor: {
                        xtype: 'mathexpfield',

                        listeners: {
                            focus: function(field, eOpts) {
                                var debit = me.itemStore.getAt(me.editorIndex.row).get('debit');
                                var credit = me.itemStore.getAt(me.editorIndex.row).get('credit');
                                if (!debit && !credit) {
                                    var totalDebit = me.getTotalDebit(),
                                        totalCredit = me.getTotalCredit();

                                    if (totalDebit < totalCredit) {
                                        field.setValue(Ext.Number.correctFloat(totalCredit - totalDebit));

                                    }
                                }
                            }
                        },
                        scope: me


                    },
                    renderer: function(value) {
                        return value > 0 ? value : '';
                    }
                }, {
                    header: me.i18n.grid_header_credit,
                    dataIndex: 'credit',
                    summaryRenderer: function() {
                        return me.getTotalCredit();
                    },
                    align: 'right',
                    width: 100,
                    editor: {
                        xtype: 'mathexpfield',

                        listeners: {
                            focus: function(field, eOpts) {
                                var debit = me.itemStore.getAt(me.editorIndex.row).get('debit');
                                var credit = me.itemStore.getAt(me.editorIndex.row).get('credit');
                                if (!debit && !credit) {
                                    var totalDebit = me.getTotalDebit(),
                                        totalCredit = me.getTotalCredit();
                                    if (totalCredit < totalDebit) {
                                        field.setValue(Ext.Number.correctFloat(totalDebit - totalCredit));

                                    }
                                }
                            }
                        },
                        scope: me

                    },
                    renderer: function(value) {
                        return value > 0 ? value : '';
                    }
                }, {
                    header: me.i18n.grid_header_partner,
                    dataIndex: 'linkedPartner_fk',
                    width: 150,
                    editor: {
                        xtype: 'combobox',
                        matchFieldWidth: false,
                        displayField: 'name',
                        typeAhead: true,
                        valueField: 'id',
                        queryMode: 'local',
                        enableRegEx: true,
                        listConfig: {
                            resizeable: true,
                            width: 200
                        },
                        store: me.partnerStore
                    },

                    renderer: function(value) {
                        return value > 0 ? me.partnerStore.findRecord('id', value).get('name') : '';
                    }
                }]
            }
        });
    },



    onGridContainerContextMenu: function(grid, e) {
        menu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: '添加新条目',
                handler: function() {
                    grid.getStore().add(Ext.create('Jeeper.model.AccountJournalItem'));
                },
                scope: this
            }]
        }).showAt(e.getXY());
    },
    onGridItemContextMenu: function(grid, record, item, index, e) {
        Ext.create('Ext.menu.Menu', {
            items: [{
                text: '清除当前条目',
                handler: function() {
                    // clear current line
                    var newRecord = Ext.create('Jeeper.model.AccountJournalItem');
                    // ref: Ext.form.Basic.updateRecord()
                    record.beginEdit();
                    record.set(newRecord.getData());
                    record.endEdit();
                },
                scope: this
            }, {
                text: '删除当前条目',
                handler: function() {
                    // delete current line
                    grid.getStore().removeAt(index);
                },
                scope: this
            }, '-', {
                text: '添加新条目',
                handler: function() {
                    grid.getStore().add(Ext.create('Jeeper.model.AccountJournalItem'));
                },
                scope: this
            }]
        }).showAt(e.getXY());
    },

    onCellEditorBeforeEdit: function(editor, e, eOpts) {
        var me = this,
            totalDebit = me.getTotalDebit(),
            totalCredit = me.getTotalCredit(),
            balancedDebit = totalDebit >= totalCredit ? 0 : Ext.Number.correctFloat(totalCredit - totalDebit),
            balancedCredit = totalCredit >= totalDebit ? 0 : Ext.Number.correctFloat(totalDebit - totalCredit);

        me.editorIndex.row = e.rowIdx;
        me.editorIndex.col = e.colIdx;

        switch (e.field) {
            case 'memo':
                if (!e.record.get('debit') && !e.record.get('credit')) {
                    if (balancedDebit) {
                        e.record.set('debit', balancedDebit);
                    }
                    if (balancedCredit) {
                        e.record.set('credit', balancedCredit);
                    }
                }
                break;
            case 'debit':
                if (!e.record.get('memo')) {
                    e.record.set('memo', me.predictedMemo);
                }
                break;
            case 'credit':
                if (!e.record.get('memo')) {
                    e.record.set('memo', me.predictedMemo);
                }
                break;
            default:
                if (!e.record.get('debit') && !e.record.get('credit')) {
                    if (balancedDebit) {
                        e.record.set('debit', balancedDebit);
                    }
                    if (balancedCredit) {
                        e.record.set('credit', balancedCredit);
                    }
                }
                if (!e.record.get('memo')) {
                    e.record.set('memo', me.predictedMemo);
                }
                break;
        }
    },

    handle_btn_save: function() {
        var me = this,
            win = me.up('panel');

        win.card.updateRecord(me.journal);
        var journalJson = win.journal.getData(),
            store = win.itemGrid.getStore(),
            nextUnblankLine = 0,
            totalDebit = 0,
            totalCredit = 0;

        win.statics().lastJournalDate = journalJson.journalDate;

        journalJson.journalDate = win.journal.get('journalDate');
        journalJson.number = win.journal.get('number');
        journalJson.items = new Array();
        store.each(function(record) {
            if (record.get('account_fk') && (record.get('credit') + record.get('debit'))) {
                totalDebit += record.get('debit');
                totalCredit += record.get('credit');
                journalJson.items[nextUnblankLine++] = record.getData();

            }
        }, this);

        if (nextUnblankLine > 0 && (Ext.Number.correctFloat(totalCredit) === Ext.Number.correctFloat(totalDebit))) {
            var action = win.journal.phantom ? 'POST' : 'PUT';
            var id = win.journal.getId();
            journalJson.id = id;
            Ext.Ajax.request({
                url: '../res/financial_account_journals/' + id,
                method: action,
                jsonData: journalJson,

                failure: function(record, op, success) {
                    Ext.Msg.alert('服务器错误', '');
                },
                scope: this
            });

        } else {
            Ext.Msg.alert('错误', '请检查，1,至少有一项条目；2,条目科目项不能为空；3, 应收账款或应付账款的科目需指明合作伙伴； 4,借贷需平衡');
        }


    },

    initItemStore: function() {
        // init 5 blank item if in new mode
        var me = this;
        if (me.journal.raw) {
            var items = me.journal.raw.items;
            for (var i = 0; i < items.length; i++) {
                var target = items[i];
                var item = Ext.create('Jeeper.model.AccountJournalItem');
                item.beginEdit();
                item.set('id', target.id);
                item.set('version', target.version);
                item.set('memo', target.memo);
                item.set('account_fk', target.account.id);
                item.set('debit', target.debit);
                item.set('credit', target.credit);
                item.set('linkedPartner_fk', target.linkedPartner ? target.linkedPartner.id : 0);
                item.endEdit();
                me.itemStore.add(item);
            }

        } else {
            for (var j = 1; j <= 5; j++) {
                me.itemStore.add(Ext.create('Jeeper.model.AccountJournalItem'));
            }
        }
    },
    handle_btn_reset: Ext.emptyFn,

    handle_btn_saveAndNew: function() {
        var me = this;
        var win = me.up('panel');

        me.card.updateRecord(me.journal);

        var journalJson = me.journal.getData(),
            store = me.itemGrid.getStore(),
            nextUnblankLine = 0,
            totalDebit = 0,
            totalCredit = 0;

        me.statics().lastJournalDate = journalJson.journalDate;

        journalJson.journalDate = me.journal.get('journalDate');
        journalJson.number = me.journal.get('number');
        journalJson.items = new Array();
        store.each(function(record) {
            if (record.get('account_fk') && (record.get('credit') + record.get('debit'))) {
                totalDebit += record.get('debit');
                totalCredit += record.get('credit');
                journalJson.items[nextUnblankLine++] = record.getData();

            }
        }, this);

        if (nextUnblankLine > 0 && (Ext.Number.correctFloat(totalCredit) === Ext.Number.correctFloat(totalDebit))) {
            var action = me.journal.phantom ? 'POST' : 'PUT';
            var id = me.journal.getId();
            journalJson.id = id;
            Ext.Ajax.request({
                url: '../res/financial_account_journals/' + id,
                method: action,
                jsonData: journalJson,
                success: function() {
                    me.journal = Ext.create(me.model);
                    me.journal.set('journalDate', me.self.lastJournalDate);
                    me.card.loadRecord(me.journal);
                    me.itemStore.removeAll();
                    me.initItemStore();

                },
                failure: function(record, op, success) {
                    Ext.Msg.alert('服务器错误', '');
                },
                scope: me
            });

        } else {
            Ext.Msg.alert('错误', '请检查，1,至少有一项条目；2,条目科目项不能为空；3, 应收账款或应付账款的科目需指明合作伙伴； 4,借贷需平衡');
        }


    },

    getTotalDebit: function() {
        return Ext.Number.correctFloat(this.itemStore.sum('debit'));
    },
    getTotalCredit: function() {
        return Ext.Number.correctFloat(this.itemStore.sum('credit'));
    }
});