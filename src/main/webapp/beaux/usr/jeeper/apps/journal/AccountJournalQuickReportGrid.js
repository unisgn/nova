Ext.define('Jeeper.apps.journal.AccountJournalQuickReportGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Jeeper.model.AccountJournalItem',
        'Jeeper.lib.FinancialAccountType',
        'Jeeper.apps.journal.JournalCard'
    ],

    width: 1000,
    height: 600,
    columnLines: true,
    account: null,
    isDebitBalance: false,
    constructor: function(cfg) {
        var me = this;
        //console.log(cfg);
        Ext.apply(me, cfg);

        var FAT = Jeeper.lib.FinancialAccountType;
        var type = me.account.get('type');
        me.isDebitBalance = FAT.isAsset(type) || type === FAT.cog || type === FAT.expense;
        me.callParent();
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: Ext.create('Ext.data.Store', {
                model: 'Jeeper.model.AccountJournalItem',
                proxy: {
                    type: 'ajax',
                    url: '../res/financial_account_journal_items/by_account/' + me.account.getId(),
                    reader: {
                        type: 'json',
                        root: 'data'
                    }

                },
                sorters: {
                    property: 'journal_date',
                    direction: 'DESC'
                },
                groupField: 'linkedPartner_fk',
                autoLoad: true
            }),
            features: [{
                ftype: 'summary'
            }, {

                ftype: 'groupingsummary',
                groupHeaderTpl: '{columnName}'
            }],

            columns: {
                defaults: {
                    sortable: true
                },
                items: [{
                    text: '日期',
                    dataIndex: 'journal_date',
                    renderer: this.render_journalDate,
                    width: 100,
                    summaryRenderer: function() {
                        return '总计';
                    }
                }, {
                    text: '编号',
                    dataIndex: 'journal_number',
                    renderer: me.render_journalNumber,
                    width: 120
                }, {
                    text: '摘要',
                    dataIndex: 'memo',
                    flex: 1
                }, {
                    text: '借',
                    width: 100,
                    dataIndex: 'debit',
                    align: 'right',
                    renderer: function(value) {
                        return value ? Ext.util.Format.number(value, '0,0.00') : '&nbsp';
                    },
                    summaryType: 'sum'
                }, {
                    text: '贷',
                    dataIndex: 'credit',
                    width: 100,
                    align: 'right',
                    renderer: function(value) {
                        return value ? Ext.util.Format.number(value, '0,0.00') : '&nbsp';
                    },
                    summaryType: 'sum'
                }, {
                    text: '合作伙伴',
                    dataIndex: 'linkedPartner_fk',
                    flex: 1,
                    renderer: this.render_partner
                }]
            },

            listeners: {
                itemdblclick: this.onItemDblClick,
                scope: this
            }
        });
        me.callParent();
    },

    onItemDblClick: function(dom, record, index, e, eOpts) {
        Jeeper.model.AccountJournal.load(record.raw.journal.id, {
            success: function(rec) {
                this.launchGeneralJournal({
                    journal: rec
                });
            },
            scope: this
        });
    },


    launchGeneralJournal: function(cfg) {
        Ext.create('Jeeper.apps.journal.JournalCard', cfg).show();
    },

    render_journalDate: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //console.log(record);
        return Ext.Date.format(new Date(record.raw.journal.journalDate), 'Y-m-d');
    },

    render_journalNumber: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return record.raw.journal.number;
    },

    render_partner: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var partner = record.raw.linkedPartner;
        return partner ? partner.name : '-';
    }
});