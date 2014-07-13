Ext.define('Beaux.sys.application.ProcessManager', {
    singleton: true,
    requires: [
        'Ext.util.MixedCollection'
    ],
    processes: null,
    nextId: 1,
    constructor: function() {
        var me = this;
        me.processes = Ext.create('Ext.util.MixedCollection');
    },
    
    /**
     *******************************************************
     *                public interface
     *******************************************************
     */
    registerProcess: function(_proc) {
        var me = this, currentId = me.nextId;
        if(_proc) {
            _proc.setPid(me.nextId);
            me.processes.add(me.nextId++, _proc);
            return currentId;
        } else
            return null;
    },
    
    deregisterProcess: function(_proc) {
        if(this.processes.remove(_proc)) {
            this.nextId--;
            return _proc;
        } else
            return false;
    },
    
    getProcesses: function() {
        return this.processes;
    },

    getProcess: function(pid) {
        if(pid > 0 && pid < this.nextId)
            return this.processes.get(pid);
        else
            return null;
    }
});
