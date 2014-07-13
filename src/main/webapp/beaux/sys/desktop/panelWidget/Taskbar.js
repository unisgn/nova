Ext.define('Beaux.sys.desktop.panelWidget.Taskbar', {
    extend: 'Beaux.sys.desktop.lib.PanelWidget',
    requires: [
        'Beaux.sys.xserver.WindowManager'
    ],
    
    taskbar: null,
    
    initComponent: function() {
        var me = this;
        me.taskbar = Ext.create('Ext.toolbar.Toolbar', {
            enableOverflow: true,
            items: [
                '&#160;'
            ]
        });
        me.items = [
            me.taskbar
        ];
        me.initListeners();

        me.callParent();
    },
    
    addTaskBtn: function(_win) {
        var me = this;
        var cfg = {
            enableToggle: true,
            toggleGroup: 'all',
            width: 140,
            margins: '0 2 0 3',
            text: Ext.util.Format.ellipsis(_win.title, 20),
            handler: me.onTaskBtnClick,
            /**
            listeners: {
                click: me.onTaskBtnClick,
                scope: me
            },
            */
            win: _win
        };
        
        var btn = me.taskbar.add(cfg);
        btn.toggle(true);
        return btn;

    },
    
    removeTaskBtn: function(_win) {
        var me = this, btn;
        btn = me.getTaskBtnByWindow(_win);
        me.taskbar.remove(btn);
    },
    activateTaskBtn: function(_win) {
        var me = this, btn = me.getTaskBtnByWindow(_win);
        btn.toggle(true);
        
    },
    deactivateTaskBtn: function(_win) {
        var me = this, btn = me.getTaskBtnByWindow(_win);
        btn.toggle(false);
    },

    onTaskBtnClick: function(_taskBtn) {
        var me = this; win = _taskBtn.win;

        if (win.hidden) {
            win.show();
        } else if (win === Ext.WindowManager.getActive()) {
            win.hide();
        } else {
            win.toFront();
        }
    },

    // -------------------------------------------------
    // listen to windowManager

    initListeners: function() {
        var me = this, wm;
        wm = me.getWindowManager();
        wm.on({
            windowRegistered: function(win) {me.addTaskBtn(win);},
            windowDeregistered: function(win) {me.removeTaskBtn(win);},
            windowActivated: function(win) {me.activateTaskBtn(win);},
            windowDeactivated: function(win) {me.deactivateTaskBtn(win);},
            scope: me
        });


    },

    // --------------------------------------------------

    getTaskBtnByWindow: function(_win) {
        var found, taskbar = this.taskbar;
        taskbar.items.each(function (item) {
            if (item.win === _win) {
                found = item;
            }
            return !found;
        });
        return found;
    },
    
    //---------------
    getWindowManager: function() {
        return Beaux.sys.xserver.WindowManager;
    }
});
