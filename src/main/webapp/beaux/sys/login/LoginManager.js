Ext.define('Beaux.sys.login.LoginManager', {
    singleton : true,
    requires : ['Beaux.sys.xserver.XServer' ],


    rootXWindow : null,
    currentLoginUser : null,

    // @public
    main : function () {
        var me = this;
        console.log('start loading loginManager;');
        me.rootXWindow = me.createRootXWindow();
        Beaux.sys.xserver.XServer.resetRootXWindow(me.rootXWindow);
        console.log('loginManager loaded;');
    },

    // @private
    createRootXWindow : function () {
        var me = this,
        win = Ext.create('Beaux.sys.login.RootXWindow');
        return win;
    },

    getAuthentication : function (_username_, _password_) {},

    // @public
    getCurrentLoginUser : function () {}
});
