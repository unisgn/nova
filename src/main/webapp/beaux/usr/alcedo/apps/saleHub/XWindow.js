Ext.define('Alcedo.apps.saleHub.XWindow', {
    extend: 'Ext.beaux.sys.xserver.XWindow',

    requires: [
        'Beaux.widget.SearchField'
    ],
    layout: 'border',
    title: 'SaleHome',
    
    // data store reference;
    customerStore: null,
    customerLabelStore: null,
    activityStore: null,
    commonSaleActivityStore: null,
    saleQuotationStore: null,
    saleOrderStore: null,
    saleInvoiceStore: null,
    
    user: null,
    
    
    initComponent: function() {
        var me = this;
        me.user = Ext.beaux.sys.desktop.Cassie.getUser();
        
        me.masterPanel = me.buildCustomerPanel();
        me.slavePanel = me.buildActivityPanel();
        me.items = [
            me.masterPanel,
            me.slavePanel
        ];
        
        me.callParent();
    },
    
    // UI Building;
    buildCustomerPanel: function() {
        var me = this;
        var tagSphere = me.buildCustomerTagSphere();
        var customerList = me.buildCustomerList();
        
    
    },
    buildActivityPanel: function() {
    
    
    },
    
    
    // UI building, elementory;
    buildSwitchButton: function() {
        return {
            xtype: 'button',
            text: 'Transactions',
            clickCount: 0,
            handler: function() {
                this.clickCount++;
                if((clickCount%2) == 0){
                    this.setText('Transactions');
                }
                else {
                    this.setText('Customer');
                }
            },
            
        };
    },
    
    buildCustomerTagSphere: function() {
        var tag3d = Ext.create('Ext.container.Container', {
        
        });
        
        return tag3d;
    },
    
    buildCustomerList: function() {
        var me = this,
        search = Ext.create('Ext.beaux.widget.SearchField', {
            store: me.customerStore
        }),
        allBtn = Ext.create('Ext.Button', {
            text: 'All'
        }),
        gridPanel = Ext.create('Ext.grid.Panel', {
            
        });
        return Ext.create('Ext.panel.Panel', {
            
        
        });
    },
    
    
    buildActivityTypeList: function() {
    
    },
    
    buildActivityGrid: function() {},
    
    // Event handler;
    onSwitchButtonClick: function(e, el) {
        
    },
    onCustomerLabelItemClick: function(e, el) {
    
    },
    
    onAllCustomerClick: function() {
    
    }
    
    
    
});
