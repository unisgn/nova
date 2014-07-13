Ext.define('Beaux.sys.desktop.RootXWindow', {
    extend: 'Beaux.sys.xserver.RootXWindow',

    /**
     ***************************************************************************
     *                             configuration
     * @override
     * @cfg
     ***************************************************************************
     */
    layout: 'border',


    /**
     * @private 
     * @property
     */
    banner: null,

    /**
     * @private
     * @property
     */
    desk: null,

    /**
     * @override
     */
    initComponent: function() {
        var me = this;
        me.banner = me.createBanner();
        me.items = [{
            region: 'north',
            items: [me.banner]
        },{
            region: 'center',
            id: 'desk'
            
        }];
        
        var global_shortcuts = Ext.create('Ext.util.KeyMap', {
            target: Ext.getBody(),
            binding: {
                key: 27,
                fn: me.toggleArrangeWindows,
                scope: me
            },
            ignoreInputFields: true
        });
        
        me.callParent();
    },


    /**
     **********************************************************************
     *                             UI Building;
     * @private
     **********************************************************************
     */ 
    createBanner: function() {
        var me = this;
        var _appMenu = Ext.create('Beaux.sys.desktop.panelWidget.AppsMenu');
        
        var _panel = Ext.create('Beaux.sys.desktop.lib.EdgePanel', {
            items: [
                _appMenu
            ]
        });
        return _panel;
    },
    
    /**
     **********************************************************************
     *                          public interface;
     **********************************************************************
     */
    getDesk: function() {
        return this.items.getAt(1);
    },

    /**
     * @private
     */
    toggleArrangeWindows: function() {
        var _wa = Beaux.sys.desktop.lib.WindowArranger;
        _wa.toggleArrangeWindows();
    }
    
});
