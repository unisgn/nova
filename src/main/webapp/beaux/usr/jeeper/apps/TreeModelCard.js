Ext.define('Jeeper.apps.TreeModelCard', {
    extend: 'Jeeper.apps.ModelCard',

    newRecord: function() {
        return  Ext.create(this.model);
    }
        
});
