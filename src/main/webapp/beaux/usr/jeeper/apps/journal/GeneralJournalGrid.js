Ext.define('Jeeper.apps.journal.GeneralJournalGrid', {
    extend: 'Ext.grid.Panel',

    requires: 'Jeeper.model.AccountJournal',

    width: 1000,
    height: 600,
    columnLines: true,



    i18n: {
        grid_header_journalDate: 'Date',
        grid_header_number: 'Number',
        grid_header_memo: 'Memo',
        grid_header_account: 'Account',
        grid_header_debit: 'Debit',
        grid_header_credit: 'Credit',
        grid_header_partner: 'Partner',
        menu_newJournal: 'New Journal',
        menu_deleteJournal: 'DELETE',
        menu_refreshGrid: 'Refresh',
        msg_confirmDelete: 'Sure to Detele',
        bbar_startDate: 'Start',
        bbar_startDate_labelWidth: 50,
        bbar_endDate: 'End',
        bbar_endDate_labelWidth: 50,
        bbar_periodPicker_width: 150,
        periodData_THIS_MONTH: 'THIS_MONTH',
        periodData_LAST_MONTH: 'LAST_MONTH',
        periodData_THIS_QUARTER: 'THIS_QUARTER',
        periodData_LAST_QUARTER: 'LAST_QUARTER',
        periodData_THIS_YEAR: 'THIS_YEAR',
        periodData_LAST_YEAR: 'LAST_YEAR'
    },

    periodData: [{
        name: 'THIS_MONTH',
        value: 'THIS_MONTH'
    }, {
        name: 'LAST_MONTH',
        value: 'LAST_MONTH'
    }, {
        name: 'THIS_QUARTER',
        value: 'THIS_QUARTER'
    }, {
        name: 'LAST_QUARTER',
        value: 'LAST_QUARTER'
    }, {
        name: 'THIS_YEAR',
        value: 'THIS_YEAR'
    }, {
        name: 'LAST_YEAR',
        value: 'LAST_YEAR'
    }],

    initComponent: function() {
        var me = this;


        Ext.apply(me, {
            store: Ext.create('Ext.data.Store', {
                model: 'Jeeper.model.AccountJournal',
                autoLoad: true,
                sorters: [{
                    property: 'journalDate',
                    direction: 'DESC'
                }]
            }),

            columns: {
                defaults: {
                    sortable: false
                },
                items: [{
                    text: me.i18n.grid_header_journalDate,
                    dataIndex: 'journalDate',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    width: 100
                }, {
                    text: me.i18n.grid_header_number,
                    dataIndex: 'number',
                    width: 80,
                    renderer: function(value) {
                        return value ? value : '-';
                    }
                }, {
                    text: me.i18n.grid_header_memo,
                    dataIndex: 'memo',
                    renderer: function(value, metaData, record) {
                        var html = '';
                        var items = record.raw.items;
                        var length = items.length;
                        for (var i = 0; i < length; i++) {
                            var memo = items[i].memo ? items[i].memo : '';
                            html += ('<p class="x-grid-cell-inner">' + memo + '</p>');
                        }
                        return html;
                    },
                    flex: 1
                }, {
                    text: me.i18n.grid_header_account,
                    dataIndex: 'account',
                    renderer: function(value, metaData, record) {
                        var html = '';
                        var items = record.raw.items;
                        var length = items.length;
                        for (var i = 0; i < length; i++)
                            html += ('<p class="x-grid-cell-inner">' + items[i].account.fullPathName + '</p>');
                        return html;
                    },
                    flex: 1
                }, {
                    text: me.i18n.grid_header_debit,
                    dataIndex: 'debit',
                    renderer: function(value, metaData, record) {
                        var html = '';
                        var items = record.raw.items;
                        var length = items.length;
                        for (var i = 0; i < length; i++) {
                            var debit = (items[i].debit ? Ext.util.Format.number(items[i].debit, '0,0.00') : '&nbsp');
                            html += ('<p class="x-grid-cell-inner" style="text-align:right;">' + debit + '</p>');
                        }

                        return html;
                    },
                    width: 100
                }, {
                    text: me.i18n.grid_header_credit,
                    dataIndex: 'credit',
                    width: 100,
                    renderer: function(value, metaData, record) {
                        var html = '';
                        var items = record.raw.items;
                        var length = items.length;
                        for (var i = 0; i < length; i++) {
                            var credit = items[i].credit ? Ext.util.Format.number(items[i].credit, '0,0.00') : '&nbsp';
                            html += ('<p class="x-grid-cell-inner" style="text-align:right;">' + credit + '</p>');
                        }

                        return html;
                    }
                }, {
                    text: me.i18n.grid_header_partner,
                    dataIndex: 'partner_name',
                    renderer: function(value, metaData, record) {
                        var html = '';
                        var items = record.raw.items;
                        var length = items.length;
                        for (var i = 0; i < length; i++) {
                            var partner = items[i].linkedPartner ? items[i].linkedPartner.name : '-';
                            html += ('<p class="x-grid-cell-inner">' + partner + '</p>');
                        }
                        return html;
                    },
                    flex: 1
                }]
            },

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    iconCls: Ext.baseCSSPrefix + 'tbar-page-prev'
                }, {
                    xtype: 'combobox',
                    width: me.i18n.bbar_periodPicker_width,
                    editable: false,
                    valueField: 'value',
                    displayField: 'name',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'value'],
                        data: me.periodData
                    })
                }, {
                    iconCls: Ext.baseCSSPrefix + 'tbar-page-next'
                }, {
                    xtype: 'datefield',
                    labelAlign: 'right',
                    labelWidth: me.i18n.bbar_startDate_labelWidth,
                    width: 180,
                    fieldLabel: me.i18n.bbar_startDate
                }, {
                    xtype: 'datefield',
                    labelAlign: 'right',
                    labelWidth: me.i18n.bbar_endDate_labelWidth,
                    width: 180,
                    fieldLabel: me.i18n.bbar_endDate
                }, {
                    iconCls: Ext.baseCSSPrefix + 'tbar-loading',
                    handler: me.handle_btn_refresh,
                    scope: me
                }]
            }],

        });

        me.on({
            containercontextmenu: me.onContainerContextMenu,
            itemcontextmenu: me.onItemContextMenu,
            itemdblclick: me.onItemDblClick,
            scope: me
        });
        me.callParent();
    },

    onContainerContextMenu: function(dom, e) {
        var menu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: this.i18n.menu_newJournal,
                handler: this.launchJournalCard,
                scope: this
            }]
        });

        menu.showAt(e.getXY());
    },

    onItemContextMenu: function(dom, record, item, index, e) {
        Ext.create('Ext.menu.Menu', {
            items: [{
                text: this.i18n.menu_deleteJournal,
                handler: function() {
                    Ext.Msg.show({
                        title: this.i18n.msg_confirmDelete,
                        buttons: Ext.Msg.OKCANCEL,
                        fn: function(bid) {
                            switch (bid) {
                                case 'ok':
                                    record.destroy();
                                    break;
                                default:
                                    break;
                            }
                        },
                        scope: this
                    });
                },
                scope: this
            }, '-', {
                text: this.i18n.menu_newJournal,
                handler: this.launchJournalCard,
                scope: this
            }]
        }).showAt(e.getXY());
    },
    onItemDblClick: function(dom, record) {
        this.launchJournalCard({
            journal: record
        });
    },

    handle_btn_refresh: function() {
        this.store.reload();
    },

    launchJournalCard: function(cfg) {
        Ext.create('Jeeper.apps.journal.JournalCard', cfg).show();
    }

});