Ext.define('Beaux.core.Beaux', {
    singleton: true,
    requires: [
        'Beaux.sys.login.LoginManager',
        'Beaux.sys.desktop.Cassie',
        'Beaux.sys.xserver.XServer',
        'Beaux.sys.application.ProcessManager'
    ],
    xserver: null,
    loginManager : null,
    
    setLoginManager : function(loginManager) {
        this.loginManager = loginManager;
    },
    getLoginManager : function() {
        return this.loginManager;
    },
    
    main: function() {
        console.log('start beaux;');
        Beaux.sys.xserver.XServer.main(); // prepare Xserver

        
        //Beaux.sys.login.LoginManager.main(); // launch login mgr

        Beaux.sys.desktop.Cassie.main(); 
        console.log('beaux is ready;');
    }
});
