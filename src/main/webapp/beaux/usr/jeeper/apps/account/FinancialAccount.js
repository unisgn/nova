Ext.define('Jeeper.apps.account.FinancialAccount', {
    extend: 'Beaux.sys.application.Application',
    statics: {
        main: function(cfg) {
            if(this.iid) {
                this.instance.xwindow.toFront();
                return null;
            } else {
                this.iid++;
                this.instance = new this(cfg);
                return this.instance;
            }
        },
        iid: 0,
        instance: null

    },

    xwindow: null,
    
    constructor: function() {
        var me = this;
        me.callParent();
        me.initXWindow();
    },
    
    initXWindow: function() {
        var me = this;
        var win = Ext.create('Jeeper.apps.account.XWindow', {});
        win.on({
            destroy: me.terminate,
            scope: me
        });
        me.xwindow = win;
        me.xwindow.show();
    },
    terminate: function() {
        this.self.iid--;
        this.self.instance = null;
        this.callParent();
    }
});
