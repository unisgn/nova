Ext.define('Jeeper.apps.partner.Partner', {
    extend: 'Beaux.sys.Application',

    statics: {
        main: function(cfg) {
            if(!this.iid) {
                this.instance = new this(cfg);
                this.iid++;
                return this.instance;
            } else {
                this.instance.xwindow.toFront();
                return null;
            }
        },
        iid: 0,
        instance: null
    },

    xwindow: null,
    
    constructor: function(cfg) {
        var me = this;
        me.initXWindow();
        me.callParent();
    },
    
    initXWindow: function() {
        var me = this;
        //var win = Ext.create('Jeeper.apps.partner.PartnerCard');
        var win = Ext.create('Jeeper.apps.partner.XWindow');
        win.on('close', me.terminate, me);
        me.xwindow = win;
        me.xwindow.show();
    },

    terminate: function() {
        this.self.iid--;
        this.self.instance = null;
        this.callParent();
    }
});
