
Ext.define('Alcedo.apps.partnerHub.PartnerHub', {
    extend: 'Beaux.sys.application.Application',
    requires: [
        'Alcedo.apps.partnerHub.XWindow'
    ],

    constructor: function() {
        this.callParent();
    },
    
    main: function() {
        var me = this;
        me.createXWindow().show();
        me.callParent();
    },

    createXWindow: function() {
        var me = this;
        var cfg = {};
        var win = Ext.create('Alcedo.apps.partnerHub.XWindow', cfg);
        return win;
    },

    terminate: function() { this.callParent(); }
    
});
