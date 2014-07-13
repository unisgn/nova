Ext.define('Alcedo.model.Activity', {
    extend: 'Ext.data.Model',
    
    fields: [{
    },{
        name: 'type',
        type: 'string'
    },{
        name: 'number',
        type: 'string'
    },{
        name: 'date',
        type: 'date'
    },{
        name: 'amount',
        type: 'int'
    },{
        name: 'description',
        type: 'string'
    }]
    
});
