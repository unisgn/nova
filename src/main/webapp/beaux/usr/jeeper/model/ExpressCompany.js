Ext.define('Jeeper.model.ExpressCompany', {
    extend: 'Ext.data.Model',

    fields:[{
        name: 'id',
        type: 'int'
    }, {
        name:'version',
        type:'int'
    }, {
        name: 'active',
        type:'boolean',
        defaultValue: true
    }, {
        name:'name',
        type:'string'
    }, {
        name:'kuaidi100code',
        type:'string'
        
    }],

    proxy:{
        type:'rest',
        url:'../res/express_companies',
        reader:{
            type:'json',
            root:'data',
            messageProperty:'message'
        }
    }
});
