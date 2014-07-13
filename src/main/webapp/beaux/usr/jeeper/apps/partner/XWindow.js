Ext.define('Jeeper.apps.partner.XWindow', {
    extend: 'Beaux.sys.XWindow',

    layout: 'fit',
    title: '合作伙伴',
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            items: [
                Ext.create('Jeeper.apps.partner.PartnerGrid')
            ]
        });
        me.callParent();
    }
});
