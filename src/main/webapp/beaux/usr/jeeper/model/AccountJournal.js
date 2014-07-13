Ext.define('Jeeper.model.AccountJournal', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'version',
        type: 'int'
    }, {
        name: 'active',
        type: 'boolean',
        defaultValue: true
    }, {
        name: 'journalDate',
        type: 'date',
        dateFormat:'time',
        defaultValue: new Date()
    }, {
        name: 'number',
        type: 'string'
    }],
    
    proxy: {
        type: 'rest',
        url: '../res/financial_account_journals',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
