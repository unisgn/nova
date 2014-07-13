Ext.define('Jeeper.apps.journal.XWindow', {
    extend: 'Beaux.sys.desktop.lib.XWindow',

    initComponent: function() {
        var me = this;
        me.callParent();
        me.journalCard = me.buildJournalCard();
        me.items = [me.journalGrid, me.journalCard];

    },
    
    buildJournalCard: function() {}
});
