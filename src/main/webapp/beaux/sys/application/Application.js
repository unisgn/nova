Ext.define('Beaux.sys.application.Application', {

    alternateClassName: ['Beaux.sys.Application'],

    config: {
        pid: 0
    },
    
    requires: [
        'Beaux.sys.application.ProcessManager'
    ],

    /**
     * every single application should implements an static method
     * main() to provide an entry to start.
     * statics: {
     *     main: function(cfg) {
     *         // implements statement;
     *         return new this(cfg)
     *     }
     * }
     *
     * application should also implements singleton mechenics if needed.
     *
     */
    
    constructor: function(cfg) {
        var me = this;
        this.initConfig(cfg);
        Beaux.sys.application.ProcessManager.registerProcess(this);

    },
    
    /**
     * @public
     
    terminate: function() {
        Beaux.sys.application.ProcessManager.deregisterProcess(this);
    }
    */
    terminate: function() {
        Beaux.sys.application.ProcessManager.deregisterProcess(this);
    }
});
