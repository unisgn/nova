Ext.define('Beaux.sys.application.ApplicationManager', {
    singleton: true,
    alternateClassName: ['Beaux.sys.AppMgr'],
    launchApp: function(_appCls, _cfg) {
        var cfg = _cfg || {};
        Ext.require(_appCls, function() {
            Ext.ClassManager.get(_appCls).main(cfg);
        });

    }
});
