Ext.define('Jeeper.apps.partner.PartnerCard', {
    extend: 'Beaux.sys.XWindow',

    requires: [
        'Jeeper.model.Partner'
    ],

    layout: 'fit',
    
    newTitle: 'new Partner',
    
    
    partner: null,
    card: null,
    
    constructor: function(cfg) {
        var me = this;
        me.partner = (cfg.partner != null ? cfg.partner : new Jeeper.model.Partner());
        me.callParent();
    },
    
    initComponent: function() {
        var me = this;
        me.card = me.buildCard();
        
        me.items = [
            me.card
        ];
        
        me.loadRecord(me.partner);
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

                labelWidth: 60,
                labelAlign: 'right',
                anchor: '100%'
                //xtype: 'textfield'
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Number',
                name: 'number'
            }, {
                fieldLabel: 'Code',
                name: 'code'
            }, {
                fieldLabel: 'Name',
                name: 'name'
            }, {
                fieldLabel: 'SearchKey',
                name: 'searchKey'
            }, {
                fieldLabel: 'Memo',
                xtype: 'textarea',
                name: 'description'
            }, {
                xtype: 'checkboxgroup',
                fieldLabel: 'Role',
                items:[{
                    boxLabel: 'Customer',
                    name: 'roleCustomer'
                }, {
                    boxLabel: 'Vendor',
                    name: 'roleVendor'
                }, {
                    boxLabel: 'Employee',
                    name: 'roleEmployee'
                }]
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

    handle_btn_reset: function() {
        this.reset();
    },
    handle_btn_save: function() {
        this.card.updateRecord(this.partner);
        this.partner.save();
        this.loadRecord(this.partner);
    },
    handle_btn_save_and_new: function() {
        this.card.updateRecord(this.partner);
        this.partner.save();
        this.partner = new Jeeper.model.Partner();
        this.loadRecord(this.partner);
    },

    loadRecord: function(partner_record) {
        var name = partner_record.get('name').trim();
        this.setTitle(name == '' ? this.newTitle : name);
        return this.card.loadRecord(partner_record);
    },

    reset: function() {
        this.card.getForm().reset();
        this.loadRecord(this.partner);
    }
    
});
