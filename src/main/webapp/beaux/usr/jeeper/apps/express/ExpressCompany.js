Ext.define('Jeeper.apps.express.ExpressCompany', {
    extend: 'Beaux.sys.Application',

    statics:{
        main:function(cfg) {
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

    ui_text:{
        win_title:'Express Companies'
    },

    constructor: function() {
        var me = this;
        
        me.callParent();
        me.initXWindow();
    },

    initXWindow: function() {
        var me = this,
            win = Ext.create('Beaux.sys.XWindow', {
                title:me.ui_text.win_title,
                layout:'fit',
                items:[
                    Ext.create('Jeeper.apps.express.CompanyGrid')
                ]
            });
        win.on({
            destroy: me.terminate,
            scope:me
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
