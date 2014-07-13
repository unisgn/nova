Ext.define('Jeeper.apps.journal.GeneralJournalGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['Jeeper.model.AccountJournal'],

    width: 800,
    height: 600,
    columnLines: true,
    
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            store: Ext.create('Ext.data.Store', {
                model: 'Jeeper.model.AccountJournal',
                proxy: {
                    type: 'ajax',
                    url: 'usr/jeeper/data/general_journals.json',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                },
                autoLoad: true
            }),
            columns:[{
                text: 'Date',
                dataIndex: 'journalDate',
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                flex: 1
            }, {
                text: 'Number',
                dataIndex: 'number',
                flex: 1
            }, {
                text: 'Memo',
                dataIndex: 'memo',
                flex: 3
            }]
        });
        me.callParent();
    }

});
