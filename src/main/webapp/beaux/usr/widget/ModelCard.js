Ext.define('Beaux.usr.widget.ModelCard', {
    extend: 'Ext.form.Panel',
    mixins: {
        observable: 'Ext.util.Observable'
    },

    constructor: function() {
        this.mixins.observable.addEvents('recordsaved');
        this.callParent();
    }
});
