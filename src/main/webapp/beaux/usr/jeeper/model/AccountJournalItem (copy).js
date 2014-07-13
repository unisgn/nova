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
        { name: 'account_journal_id', type: 'int' },
        { name: 'partner_id', type: 'int' },
        { name: 'financial_account_id', type: 'int' }
    ],


    associations: [{
        type: 'hasOne',
        model: 'Jeeper.model.Partner',
        foreignKey: 'partner_id'
    }, {
        type: 'hasOne',
        model: 'Jeeper.model.FinancialAccount',
        foreignKey: 'financial_account_id'
    }, {
        type: 'belongsTo',
        model: 'Jeeper.model.AccountJournal',
        foreignKey: 'account_journal_id'
    }],

    proxy: {
        type: 'rest',
        url: '../res/financial_account_journal_items',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});
