Ext.define('Jeeper.apps.journal.GeneralJournal', {
    extend: 'Beaux.sys.Application',

    statics: {
        main: function(cfg) {
            if (this.iid) {
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


    i18n: {
        win_title: 'GeneralJournal'
    },

    xwindow: null,

    constructor: function(cfg) {
        var me = this;
        me.initXWindow();
        //this.self.instance = me;
    },

    initXWindow: function() {
        var me = this;
        //var grid =;
        var win = Ext.create('Beaux.sys.XWindow', {
            title: me.i18n.win_title,
            layout: 'fit',
            items: [
                Ext.create('Jeeper.apps.journal.GeneralJournalGrid')
            ]
        });
        //win.items = [grid];
        win.on('destroy', me.terminate, this);
        me.xwindow = win;
        me.xwindow.show();
    },

    terminate: function() {
        this.statics().iid--;
        this.statics().instance = null;
        this.callParent();
    }

});