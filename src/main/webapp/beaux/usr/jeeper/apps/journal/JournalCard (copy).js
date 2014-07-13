Ext.define('Jeeper.apps.journal.JournalCard', {
    extend: 'Beaux.sys.XWindow',

    journal: null,
    card: null,
    constructor: function(cfg) {
        var me = this;
        me.journal = (cfg.journal != null ? cfg.journal : Ext.create('Jeeper.model.AccountJournal'));
        
        me.callParent();
    },
    initComponent: function() {
        var me = this;
        me.card = me.buildJournalCard();
        me.items = [
            me.card
        ];


        me.loadRecord();
        me.callParent();
    },
    
    buildJournalCard: function() {

    },

    loadRecord: function() {},

    reset: function() {},
    
    handle_btn_save: function() {},

    handle_btn_reset: function() {},

    handle_btn_save_and_new: function() {}
});
