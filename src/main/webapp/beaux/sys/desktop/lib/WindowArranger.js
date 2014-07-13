
Ext.define('Beaux.sys.desktop.lib.WindowArranger', {
    singleton: true,
    requires:[
        'Beaux.sys.desktop.Cassie'
    ],

    /**
     * @usedby {Beaux.sys.desktop.RootXWindow};
     * @usedby {Beaux.sys.desktop.lib.WindowManager};
     * @usedby {Beaux.sys.desktop.lib.XWindow};
     *
     */

    /**
     * @static
     * @final
     * @brief the rate of the transformed window to its arranged cell;
     */
    FIX_RATIO: 0.9,

    GOLDEN_RATIO: 1.6,
    
    
    /**
     * @private
     * @property
     * @brief flag status
     */
    arranged: false,
    
    /**
     ***************************************************************************
     *                          public interface
     * @public
     ***************************************************************************
     */    

    toggleArrangeWindows: function() {
        var me = this;
        var _winCount = me.getWindowManager().getWindows().length;
        if(_winCount > 0) {
            return me[me.arranged ? 'resetWindows':'arrangeWindows']();
        } else
            return null;
    },

    /**
     * @public
     * @brief main algorithm to transform window to cell;
     */
    arrangeWindows: function() {
        var me = this;
        var _wins = me.getWindowManager().getWindows();
        var _winCount = _wins.length;
        if(_winCount > 0 && !me.arranged) {
            var _desk = me.getDesk();
            var _deskRegion = me.getDeskRegion();
            var _regionRate = _desk.getWidth() / _desk.getHeight();
            var _regionTable = me.makeRegionTable(_regionRate, _winCount);

            var _cellWidth = _desk.getWidth() / _regionTable.columns;
            var _cellHeight = _desk.getHeight() / _regionTable.rows;

            var i = 0;
            _wins.each(function(_win) {
                var _cellX = i % _regionTable.columns;
                var _cellY = Math.floor(i / _regionTable.columns);

                // http://www.eleqtriq.com/wp-content/static/demos/2010/css3d/matrix2dExplorer.html
                // http://dev.opera.com/articles/view/understanding-the-css-transforms-matrix/
                var _dx = (_deskRegion.left + _cellWidth / 2) + _cellX * _cellWidth - (_win.getRegion().left + _win.getRegion().right) / 2;
                var _dy = (_deskRegion.top + _cellHeight / 2) + _cellY * _cellHeight - (_win.getRegion().top + _win.getRegion().bottom) / 2;
                
                var _r1 = _win.getWidth() / _cellWidth;
                var _r2 = _win.getHeight() / _cellHeight;
                
                var _ratio = (_r1 <= me.FIX_RATIO && _r2 <= me.FIX_RATIO) ? 1 : me.FIX_RATIO/Math.max(_r1, _r2);
                
                _win.transform(_ratio, _dx, _dy);
                i++;
            });
            me.arranged = true;
        
        }
    },

    /**
     * @public
     */
    resetWindows: function() {
        var me = this;
        var _wins = me.getWindowManager().getWindows();
        var _winCount = _wins.length;
        if(_winCount > 0 && me.arranged) {
            _wins.each( function(_win) {
                _win.resetTransform();
            });
            me.arranged = false;
        }
    },

    /**
     ***************************************************************************
     *                          private method
     * @private
     ***************************************************************************
     */    

    getDesk: function() {
        return Beaux.sys.desktop.Cassie.getRootXWindow().getDesk();
    },
    
    /**
     * @private
     */
    getWindowManager: function() {
        return Beaux.sys.desktop.lib.WindowManager;
    },

    /**
     * @private
     */
    getDeskRegion: function() {
        return this.getDesk().getRegion();
    },

    /**
     * @private
     * @brief main algorithm to caculate cell arrangement for windows
     */
    makeRegionTable: function(_ratio_, _count_) {
        var _gr = this.GOLDEN_RATIO;
        var _rt = {rows:1, columns:1};
        if(!_count_ || _count_ == 0 || _count_ == 1) {
            return _rt;
        } else {
            while(_count_ > _rt.rows * _rt.columns) {
                var _r1 = (_rt.rows + 1) * _ratio_ / _rt.columns;
                var _r2 = _rt.rows * _ratio_ / (_rt.columns + 1);
                if (Math.abs(_gr - _r1) < Math.abs(_gr - _r2)) {
                    _rt.rows++;
                } else {
                    _rt.columns++;
                }
            }
        }
        return _rt;
    }
});
