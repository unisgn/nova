Ext.define('Beaux.sys.desktop.panelWidget.ShowDesktop', {
    extend: 'Beaux.sys.desktop.lib.PanelWidget',
    requires: [
        'Beaux.sys.xserver.WindowManager'
    ],
    
    initComponent: function() {
        var me = this;
        var wm = me.getWindowManager();
        me.items = [{
            xtype: 'button',
            enableToggle: true,
            text: 'desk',
            toggleHandler: function(btn,state) {
                if (state) {
                    wm.showDesktop();
                } else {
                    wm.restoreDesktop();
                }
            },
            scope: me
        }];

        me.callParent();
    },
    
    getWindowManager: function() {
        return Beaux.sys.xserver.WindowManager;
    }
});
