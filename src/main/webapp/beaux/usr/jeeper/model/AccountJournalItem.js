Ext.define('Jeeper.model.AccountJournalItem', {
    extend: 'Ext.data.Model',

    requires: [
        'Jeeper.model.Partner',
        'Jeeper.model.FinancialAccount'
    ],
    
    fields: [
        { name: 'id', type: 'int' },
        { name: 'version', type: 'int' },
        { name: 'active', type: 'boolean', defaultValue: true},
        { name: 'memo',type: 'string' },
        { name: 'debit', type: 'float' },
        { name: 'credit', type: 'float' },
        { name: 'linkedPartner_fk', type: 'int' },
        { name: 'account_fk', type: 'int' }
    ],

    proxy: {
        type: 'rest',
        url: '../res/financial_account_journal_items',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});
