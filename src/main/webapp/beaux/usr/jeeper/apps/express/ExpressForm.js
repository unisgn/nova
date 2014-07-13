Ext.define('Jeeper.apps.express.ExpressForm', {
    extend:'Beaux.sys.Application',

    requires:[
        'Jeeper.apps.express.FormGrid'
        //'Jeeper.apps.express.FormGrid-zh_CN'
    ],
    
    statics:{
        main:function(cfg) {
            console.log(cfg);
            if(this.iid) {
                this.instance.xwindow.toFront();
                return null;
            } else {
                this.iid++;
                this.instance=new this(cfg);
                return this.instance;
            }
        },
        iid: 0,
        instance: null
    },

    xwindow: null,

    ui_text: {
        win_title: 'Express Forms'
    },
    
    constructor: function(cfg) {
        var me = this;
        me.callParent();

        me.initXWindow(cfg);

    },
    
    initXWindow:function(cfg) {
        var me = this,
            win = Ext.create('Beaux.sys.desktop.lib.XWindow', {
                title:me.ui_text.win_title,
                layout:'fit',
                
                items:[
                    Ext.create('Jeeper.apps.express.FormGrid')
                ]
            });
        win.on({
            destroy: me.terminate,
            scope:me
        });
        me.xwindow = win;
        me.xwindow.show();
    },

    terminate:function() {
        this.self.iid--;
        this.self.instance = null;
        this.callParent();
    }
});
