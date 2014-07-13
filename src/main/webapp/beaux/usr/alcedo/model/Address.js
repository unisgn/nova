Ext.define('Alcedo.model.Address', {
    extend: 'Ext.data.Model',
    
    fields: [{
        name: 'country',
        type: 'string'
    },{
        name: 'state',
        type: 'string'
    },{
        name: 'city',
        type: 'string'
    },{
        name: 'addr',
        type: 'string'
    },{
        name: 'description',
        type: 'string'
    }]
    
});
