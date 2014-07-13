Ext.define('Beaux.sys.desktop.lib.WindowManager', {
    singleton: true,
    mixins: {
        observable: 'Ext.util.Observable'
    },
    requires: [
        'Ext.util.MixedCollection',
        'Beaux.sys.desktop.lib.WindowArranger'
    ], 

    
    /**
     * @private
     * @property
     */
    windows: null,

    /**
     * @private
     * @property
     */
    windowArranger: null,
    
    constructor: function(config) {
        var me = this;
        me.windows = Ext.create('Ext.util.MixedCollection');
        
        me.windowArranger = Beaux.sys.desktop.lib.WindowArranger;
        me.mixins.observable.constructor.call(this);
        
    },
    


    /**
     ***************************************************************************
     *                        public interface
     ***************************************************************************
     * @public
     * @returns {Beaux.sys.desktop.lib.XWindow}
     *
     */
    registerWindow: function(_win) {
        var me = this;   
        
        me.windows.add(_win);
        
        return _win;
        
    },

    /** 
     * @public
     * @Returns {Ext.util.MixedCollection[Beaux.sys.desktop.lib.XWindow]}
     */    
    getWindows: function() {
        return this.windows;
    },       

    
    /** 
     * @public
     *
     */
    deregisterWindow: function(_win) {
        var me = this;
        me.windows.remove(_win);
    }
    
});
