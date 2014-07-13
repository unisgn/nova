Ext.define('Jeeper.apps.journal.GeneralJournalEntry', {
    extend: 'Beaux.sys.Application',

    statics: {
        main: function(cfg) {
            return new this(cfg);
        }
    },

    constructor: function() {
        this.initXWindow();
        this.callParent();
    },

    initXWindow: function() {
        var win = Ext.create('Jeeper.apps.journal.JournalCard', {});
        win.on('destroy', this.terminate, this);
        win.show();
    }
})