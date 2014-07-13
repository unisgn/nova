Ext.define('Jeeper.model.ExpressForm', {
    extend: 'Ext.data.Model',

    fields:[{
        name:'id',
        type:'int'
    }, {
        name:'version',
        type:'int'
    }, {
        name:'active',
        type:'boolean',
        defaultValue:true
    }, {
        name:'formDate',
        type:'date',
        dateFormat:'time',
        defaultValue: new Date()
    }, {
        name:'formNumber',
        type:'string'
    }, {
        name:'company_fk',
        type:'int'
    }, {
        name:'memo',
        type:'string'
    }],

    proxy:{
        type:'rest',
        url:'../res/express_forms',
        reader:{
            type:'json',
            root:'data',
            messageProperty:'message'
        }
    }
});
