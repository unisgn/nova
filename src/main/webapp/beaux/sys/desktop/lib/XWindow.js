Ext.define('Beaux.sys.desktop.lib.XWindow', {
    extend: 'Ext.window.Window',

    alternateClassName: ['Beaux.sys.XWindow'],
    
    requires:[
        'Beaux.sys.desktop.lib.WindowManager',
        'Beaux.sys.desktop.Cassie'
    ],
    
    /**
     * @override
     * @cfg
     * function called on ESC key stroke
     */
    onEsc: Ext.emptyFn,

    /**
     * @override
     * @cfg
     * set false to make transform css functionly properly;
     */
    shadow: false,

    /**
     * @override
     * @cfg
     * set false to make drag function with full dynamic contents;
     */
    ghost: false,

    liveDrag: true,

    /**
     * @override
     * @cfg 
     * set dymanic to make resize function with full dynamic contents;
     */
    resizable: {
        dynamic: true
    },

    /**
     * @override
     * @cfg
     */
    maximizable: true,
    
    /**
     * @property
     * flag to detect this window has any transform css;
     * 
     */
    transformed: false,
    
    
    
    /**
     * @property
     * @private
     *
     */
    freezed: false,

    /**
     * @property
     * @private
     * windowManager
     */
    wm: null,
    

    /**
     * @property
     * the application by which this window been created
     */
    application: null,

    /**
     * @private
     * @property
     * @readonly
     * the desktop
     *
     */
    desktop: null,
    desk: null,
    
    /**
     * @override
     * @private
     */
    initComponent: function(cfg) {
        var me = this;
        
        me.wm = me.getWindowManager();
        me.desktop = me.getDesktop();
        me.desk = me.getDesktop().getRootXWindow().getDesk();
        me.callParent(cfg);
        me.wm.registerWindow(me);
    },

    /**
     * @private
     */
    getWindowManager: function() {
        return Beaux.sys.desktop.lib.WindowManager;
    },
    getDesktop: function() {
        return Beaux.sys.desktop.Cassie;
    },

    /**
     * @public
     * @returns {Beaux.sys.application.Application}
     */
    getApplication: function() {
        return this.application;
    },
    
    /**
     * @private
     * support for transform function;
     *
     */
    freeze: function() {
        var me = this;
        if(me.dd) {
            me.dd.disable();
        }
        if(me.resizer) {
            me.resizer.disable();
        }
        
        /**
         * when windows are arranged by WindowArranger,
         * this onClick event would
         * trigger an event to resetWindows and make sure 2 things:
         * 1, when the close button clicked, only to close window
         * without trigger resetWindows;
         * 2, when the body of the window clicked, should trigger resetWindows;
         * to achive this, an alternative way might be using the onActivate
         * event, but with 2 problems:
         * 1, when the close button clicked, it would trigger the activate event, 
         * so to trigger resetWindows, not wanted;
         * 2, when the body of the window clicked, the Ext wouldn't trigger
         * the activate event,
         * (probably a BUG) and so can not trigger the resetWindows event, not wanted;
         *
         */
        me.body.on('click', me.onFreezeBodyClick, me);        
        me.freezed = true;
    },
    
    /**
     * @private
     * 
     */
    defreeze: function() {
        var me = this;
        if(me.dd) {
            me.dd.enable();
        }
        if(me.resizer) {
            me.resizer.enable();
        }
        me.body.un('click', me.onFreezeBodyClick, me);        
        me.freezed = false;
    },

    /**
     * @public
     * @returns {Beaux.sys.desktop.lib.XWindow}
     */
    transform: function(_scale, _dx, _dy) {
        var me = this;
        if(!me.transformed) {
            var _cls = 'XWindow-transform-' + me.id;
            var _cssText = '.' + _cls + ' {-webkit-transform: matrix('+ _scale + ', 0, 0, ' + _scale + ', ' + _dx + ', ' + _dy + ');-moz-transform: matrix('+ _scale + ', 0, 0, ' + _scale + ', ' + _dx + 'px, ' + _dy + 'px)} ';
            var _css = Ext.util.CSS.createStyleSheet(_cssText);
            
            me.freeze();
            me.addCls(_cls);
            me.transformed = true;    
        }
        return me;
    },
    
    /**
     * @public
     * 
     */
    resetTransform: function() {
        var me = this;
        if(me.transformed) {
            var _cls = 'XWindow-transform-' + me.id;
            me.removeCls(_cls);
            me.transformed = false;
            me.defreeze();
        }
    },
    
    
    /**
     * @private
     * @override 
     * emptyFn to disable maximize and restore tool(button in header);
     */
    addTools: Ext.emptyFn,
    
    
    /**
     * @override
     * @private
     * 
     */
    afterRender: function() {
        var me = this;
        me.callParent();
        var _wa = Beaux.sys.desktop.lib.WindowArranger;
        if(_wa.arranged) {
            _wa.resetWindows();
        }
    },
    
    
    /**
     * @override
     * @private
     *
     */
    beforeDestroy: function() {
        var me = this;
        me.wm.deregisterWindow(me);
        //me.desktop.getRootXWindow().getDesk().remove(me);        
        me.callParent();
    },
    
    onFreezeBodyClick: function() {
        Beaux.sys.desktop.lib.WindowArranger.resetWindows();
    },

    /**
     * @override {@link Ext.window.Window.maximize()}
     *
     *
     */
    maximize: function(animate) {
        var me = this,
            header = me.header,
            tools = me.tools,
            changed;

        if (!me.maximized) {
            me.expand(false);
            if (!me.hasSavedRestore) {
                me.restoreSize = me.getSize();

                // override getPosition(true);
                me.restorePos = me.getPosition(false);
            }

            // Manipulate visibility of header tools if there is a header
            if (header) {
                header.suspendLayouts();
                if (tools.maximize) {
                    tools.maximize.hide();
                    changed = true;
                }
                if (tools.restore) {
                    tools.restore.show();
                    changed = true;
                }
                if (me.collapseTool) {
                    me.collapseTool.hide();
                    changed = true;
                }
                me.resumeHeaderLayout(changed);
            }

            me.maximized = true;
            me.el.disableShadow();

            if (me.dd) {
                me.dd.disable();
                if (header) {
                   header.removeCls(header.indicateDragCls);
                }
            }
            if (me.resizer) {
                me.resizer.disable();
            }
            
            me.el.addCls(Ext.baseCSSPrefix + 'window-maximized');
            me.container.addCls(Ext.baseCSSPrefix + 'window-maximized-ct');

            me.syncMonitorWindowResize();
            me.fitContainer(animate = (animate || !!me.animateTarget) ? {
                callback: function() {
                    me.fireEvent('maximize', me);
                }
            } : null);
            if (!animate) {
                me.fireEvent('maximize', me);
            }
        }
        return me;
    },

    /**
     * @override {@link Ext.util.Floating.fitContainer()}
     * @private
     */
    fitContainer: function(animate) {
        var me = this,
            _box = me.desk.getSize(),
            _deskRegion = me.desk.getRegion();
        _box.x = _deskRegion.x;
        _box.y = _deskRegion.y;
        me.setBox(_box, animate);

    },

    /**
     * @override {@link Ext.panel.Panel.initSimpleDraggable()}
     * @private
     *
     */
    initSimpleDraggable: function() {
        var me = this;
        me.callParent();
        if(me.dd) {
            // override {@link Ext.util.ComponentDragger.onDrag()};
            me.dd.onDrag = function(e) {
                var _offset = me.dd.getOffset(),
                    _deskRegion = me.desk.getRegion(),
                    endXY = [me.dd.startPosition[0] + _offset[0], me.dd.startPosition[1] + _offset[1]];
                // adjust offset;
                if(endXY[1] < _deskRegion.top) {
                    endXY[1] = _deskRegion.top;
                } else if(endXY[1] > _deskRegion.bottom - me.header.getHeight()) {
                    endXY[1] = _deskRegion.bottom - me.header.getHeight();
                }

                me.setPagePosition(endXY[0], endXY[1]);
            };
        }
    }

});
