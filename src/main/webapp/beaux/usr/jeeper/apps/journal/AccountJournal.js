Ext.define('Jeeper.apps.journal.AccountJournal', {
    extend: 'Beaux.sys.Application',

    statics: {
        main: function(cfg) {
            return new this(cfg);
        }
    },

    xwindow: null,
    account: null,
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.initXWindow(cfg);
        me.callParent();
    },

    initXWindow: function(cfg) {
        var me = this;
        //console.log(me.account);
        var win = Ext.create('Beaux.sys.XWindow', {
            layout: 'fit',
            title: me.account.get('fullPathName'),
            items: [
                Ext.create('Jeeper.apps.journal.AccountJournalQuickReportGrid', {
                    account: me.account
                })
            ]
        });
        win.on({
            destroy: me.terminate,
            scope: me
        });
        me.xwindow = win;
        me.xwindow.show();
    }
});