Ext.define('Jeeper.apps.ModelCard', {
    extend: 'Beaux.sys.XWindow',


    layout: 'fit',

    /**
     * @Config
     * @Required
     */
    newTitle: '', //required configuration

    /**
     * @Config
     * @Required
     */
    titleProperty: 'id', //required configuration

    /**
     * @Config
     * @Required
     */
    model: null,
    
    // required in constructor cfg
    record: null,
    
    card: null,
    store: null,
    editMode: false,
    
    constructor: function(cfg) {
        Ext.apply(this, cfg || {});
        if(this.record)
            this.store = this.record.store;
        
        if(!this.record)
            this.record = this.newRecord();
        this.editMode = this.record.getId() ? true : false;
        this.callParent();
    },

    initComponent: function() {
        this.card = this.buildModelCard();
        this.addDockedToCard();
        this.items = [
            this.card
        ];

        
        this.afterInitComponent();
        this.callParent();
    },

    afterInitComponent: function() {
        this.loadRecord();
    },

    /**
     * abstract method, should be implemented by sub concreate class
     * @return {@link Ext.form.Panel}
     */
    buildModelCard: Ext.emptyFn, // to be implemented by sub class

    addDockedToCard: function() {
        var me = this;
        me.card.addDocked({
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults: {minWidth: 80},
            items: [{
                xtype: 'component',
                flex: 1
            }, {
                xtype: 'button',
                text: '重置',
                handler: me.handle_btn_reset,
                scope: me
            }, {
                xtype: 'button',
                text: '保存',
                handler: me.handle_btn_save,
                scope: me
            }, {
                xtype: 'button',
                text: '保存并新建',
                handler: me.handle_btn_save_and_new,
                scope: me
            }]
        });
    },
    
    loadRecord: function() {
        this.card.loadRecord(this.record);
        this.setTitleAfterLoadRecord();
    },

    // override when needed
    setTitleAfterLoadRecord: function() {
        this.setTitle(this.editMode ? this.record.get(this.titleProperty) : this.newTitle);
    },

    
    newRecord: function() {
        return (this.store ? this.store.add(Ext.create(this.model))[0] : Ext.create(this.model));
    },
    
    reset: function() {
        this.card.getForm().reset();
        this.loadRecord();
    },

    handle_btn_save: function() {
        var me = this;
        me.card.updateRecord(me.record);
        me.record.save({
            success: function() {
                me.editMode = true;
                me.loadRecord();
            },
            failure: function(record, op) {
                // op.getError() function propertly only
                // when model's proxy's reader messageProperty settled
                Ext.Msg.alert("SAVE FAILURE", op.getError());
            },
            scope: me
        });
        
    },

    handle_btn_save_and_new: function() {
        var me = this;
        me.card.updateRecord(me.record);
        me.record.save({
            success: function() {
                me.record = me.newRecord();
                me.editMode = false;
                me.loadRecord();
            },
            failure: function(record, op){
                Ext.Msg.alert("SAVE FAILURE", op.getError());
            },
            scope: me
        });
    },

    handle_btn_reset: function() {
        this.reset();
    }
    
});
