Ext.define('Jeeper.apps.account.XWindow', {
    extend: 'Beaux.sys.desktop.lib.XWindow',
    requires: ['Jeeper.model.FinancialAccount'],
    title: '会计科目表',
    //width: 800,
    layout: 'fit',

    
    accountGrid: null,
    
    initComponent: function() {
        var me = this;
        me.accountGrid = me.buildAccountGrid();
        me.items = [me.accountGrid];
        me.callParent();
    },

    buildAccountGrid: function() {
        return Ext.create('Jeeper.apps.account.AccountGrid', {});
    }
});
