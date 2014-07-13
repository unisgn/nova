Ext.define('Jeeper.model.FinancialAccount', {
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
        name: 'number',
        type: 'string'
    }, {
        name: 'code',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'searchKey',
        type: 'string'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'nodname',
        type: 'string'
    }, {
        name: 'type',
        type: 'string'
    }, {
        name: 'balance',
        type: 'float'
    }, {
        name:'parentId',
        type:'int'
    }, {
        name: 'parentNode_id',
        type: 'int'
    }],

    proxy: {
        type: 'rest',
        url: '../res/financial_accounts',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
