Ext.define('Beaux.sys.login.RootXWindow', {
    extend: 'Beaux.sys.xserver.RootXWindow',
    requires: [
        'Beaux.sys.login.LoginForm'
        //'Alcedo.widget.Broadcast',
    ],

    initComponent: function() {
        var me = this;
        me.items = [{
            x:500,
            y:200,
            xtype: 'beaux.loginForm'
        }];
        
        me.callParent();
    }
});
