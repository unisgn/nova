Ext.define('Jeeper.apps.account.AccountCard', {
    extend: 'Jeeper.apps.ModelCard',

    requires: ['Jeeper.model.FinancialAccount'],
    layout: 'fit',

    newTitle: 'new Account',
    account: null,
    
    constructor: function(cfg) {
        var me = this;
        me.account = (cfg.account != null ? cfg.account : Ext.create('Jeeper.model.FinancialAccount'));
        /**
         * @Event recordsaved
         */
        me.callParent();
    },
    
    initComponent: function() {
        var me = this;
        me.card = me.buildCard();
        me.items = [
            me.card
        ];

        me.loadRecord();
        me.callParent();
    },
    
    buildCard: function() {
        return Ext.create('Ext.form.Panel', {
            width: 400,
            bodyPadding: 5,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 60,
                anchor: '100%'
            },
            defaultType:'textfield',
            items:[{
                fieldLabel: 'TYPE',
                name: 'type',
                xtype: 'combobox',
                displayField: 'type',
                valueField: 'value',
                store: Ext.create('Ext.data.Store', {
                    fields: ['type', 'value'],
                    proxy: {
                        type: 'ajax',
                        url: 'usr/jeeper/apps/account/account_types.json'
                    }
                })
            }, {
                fieldLabel: 'PARENT',
                name: 'parent_id',
                xtype: 'combobox',
                editable: false,
                displayField: 'nodname',
                valueField: 'id',
                store: Ext.create('Ext.data.Store',{
                    model: 'Jeeper.model.FinancialAccount',
                    proxy: {
                        type: 'ajax',
                        url: 'usr/jeeper/data/accounts.json',
                        reader: {
                            type: 'json',
                            root: 'children'
                        }
                    }
                })
            }, {
                fieldLabel: 'NUMBER',
                name: 'number'
            }, {
                fieldLabel: 'NAME',
                name:'nodname'
            }, {
                fieldLabel: 'MEMO',
                name: 'memo',
                xtype: 'textarea'
            }],
            buttons: [{
                text: 'RESET',
                handler: this.handle_btn_reset,
                scope: this
            }, {
                text: 'SAVE',
                handler: this.handle_btn_save,
                scope: this
            }, {
                text: 'SAVE & NEW',
                handler: this.handle_btn_save_and_new,
                scope: this
            }]
        });
    },

    handle_btn_save: function() {
        var me = this;
        me.card.updateRecord(me.account);
        me.account.save();
        me.loadRecord();
        },
    handle_btn_reset: function() {
        this.reset();
        },

    handle_btn_save_and_new: function() {
        var me = this;
        me.card.updateRecord(me.account);
        me.account.save();
        me.account = Ext.create('Jeeper.model.FinancialAccount');
        me.loadRecord();
        },

    loadRecord: function() {
        var me = this;
        me.card.loadRecord(me.account);
        me.setTitle((me.account.get('nodname') != '' ? me.account.get('nodname') : me.newTitle));
    },

    reset: function() {
        this.card.getForm().reset();
        this.loadRecord();
        },
    
    localValidate: function(property, value) {

    },
    
    remoteValidate: function(property, value) {
        
    }
    
});
