/**
 * ActivityPanel 主要由两个控制部件 activitySwitch， datePeriodPicker 和一个 GridPanel 显示部件组成。
 *
 * 为减轻服务器负载，面板初始化时将一次性下载该 user 下所有 Customer 所有销售相关事件，保存在 activityStore.
 * 随后将根据 datePeriodPicker 范围来决定是否从服务器下载更大时间跨度的 Activity。也就是 remoteFilter 只
 * 根据的属性只有 datePeriod 一个，其他属性，诸如 Customer, ActivityType 等等都由 localFilter 获得。
 *
 * 根据 2 个 allCustomerMode 状态，和 6 个 activityType 组合，将产生 12 个不同的 GridPanel;
 * 切换面板的时候也将会根据这两个参数决定切换到哪个面板。
 *
 */


Ext.define('Alcedo.apps.saleHub.ActivityPanel', {
    extend: 'Ext.panel.Panel',
    
    user: null,
    allCustomerMode: true,
    selectedCustomer: null,
    serverDate: null,
    activityStore: null,
    
    initComponent: function() {
        var me = this;
        me.activitySwitch = me._buildActivityCombo();
        me.datePeriodPicker = me._buildDateCombo();
        
        me.activityStore = Ext.create('Ext.data.Store', {
            model: 'Alcedo.model.Activity',
            proxy: {
                type: 'ajax',
                url: '/activity/saleHub/',
                reader: {
                    type: 'json',
                    root: 'activities'
                }
            }
        });

    },
    
    // UI building
    
    _buildActivityCombo: function() {
        var _typeStore = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "ALL", "name": "All"},
                {"abbr": "SALEQUOTATION", "name": "SaleQuotation"},
                {"abbr": "SALEORDER", "name": "SaleOrder"},
                {"abbr": "SALEINVOICE", "name": "SaleInvoice"},
                {"abbr": "DELIVERYW2C", "name": "DeliveryW2C"},
                {"abbr": "SALERECEIPT", "name": "SaleReceipt"}
            ]
        });
        return Ext.create('Ext.form.ComboBox', {
            store: _typeStore,
            fieldLabel: 'ActivityType',
            displayField: 'name',
            valueField: 'abbr',
            editable: false,
            queryMode: 'local'
        });
    },
    _buildDateCombo: function() {
        var _dateStore = Ext.create('Ext.data.Store', {
            fields: ['period', 'name'],
            data: [
                {"period":"ALL", "name":"All"},
                {"period":"TODAY", "name":"Today"},
                {"period":"THIS_WEEK", "name":"This Week"},
                {"period":"THIS_MONTH", "name":"This Month"},
                {"period":"THIS_FISCAL_QUARTER", "name":"This Fiscal Quarter"},
                {"period":"THIS_FISCAL_YEAR", "name":"This Fiscal Year"},
                {"period":"LAST_Week", "name":"Last Week"},
                {"period":"LAST_MONTH", "name":"Last Month"},
                {"period":"LAST_FISCAL_QUARTER", "name":"Last Fiscal Quarter"},
                {"period":"LAST_FISCAL_YEAR", "name":"Last Fiscal Year"}
            ]
        });
        return Ext.create('Ext.form.ComboBox', {
            store: _dateStore,
            fieldLabel: 'DatePeriod',
            displayField: 'name',
            valueField: 'period',
            editable: false,
            queryMode: 'local'
        });
    },
    
    _buildAllActivityPanel: function(_allCustomerMode, _store) {
        
    },
    _buildSaleQuotationPanel: function(_allCustomerMode, _store) {
        
    },
    _buildSaleOrderPanel: function(_allCustomerMode, _customer, _store) {
    
    },
    _buildSaleInvoicePanel: function(_allCustomerMode, _customer, _store) {
    
    },
    _buildDeliveryW2CPanel: function(_allCustomerMode, _customer, _store) {
    
    },
    _buildSaleReceiptPanel: function(_allCustomerMode, _customer, _store) {
    
    },
    
    // event handler
    _onActivitySwitchChange: function() {
    
    },
    _onDatePeriodPickerChange: function() {
    
    },
    
    // private method
    _switchActivityPanel: function(_type) {
        var me = this;
        switch(_type) {
            case 'ALL': me.switchToAll();
                break;
            case 'SALEQUOTATION': me.switchToSaleQuotation();
                break;
            case 'SALEORDER': me.switchToSaleOrder();
                break;
            case 'SALEINVOICE': me.switchToSaleInvoice();
                break;
            case 'DELIVERYW2C': me.switchToDeliveryW2C();
                break;
            case 'SALERECEIPT': me.switchToSaleReceipt();
                break;
        }
    },
    
    
    _switchToAll: function() {
        var me = this;
        if(me.customer) {
            if(me.singleCustomerAllActivityPanel) {
                me.singleCustomerAllActivityPanel.store.sync();
                me.replaceActivityPanel(me.singleCustomerAllActivityPanel);
            } else {
                var store = Ext.create('Ext.data.Store', {
                    model: 'Beaux.usr.alcedo.model.Activity'
                });
                
                me.singleCustomerAllActivityPanel = Ext.create('Ext.grid.Panel', {
                
                });
            }
        } else {
            if(me.allCustomerModeAllActivityPanel) {
                me.allCustomerModeAllActivityPanel.store.sync();
                me.replaceActivityPanel(me.allCustomerModeAllActivityPanel);
            } else {
                var store = Ext.create('Ext.data.Store', {
                    model: 'Beaux.usr.alcedo.model.Activity'
                });
                me.allCustomerModeAllActivityPanel = Ext.create('Ext.grid.Panel', {
                
                });
            }
        }
    },
    _switchToSaleQuotation: function() {
        var me = this;
        if(me.customer) {
            if(me.singleCustomerSaleQuotationPanel) {
                me.singleCustomerSaleQuotationPanel.store.sync();
                me.replaceActivityPanel(me.singleCustomerSaleQuotationPanel);
            } else {
            
            }
        } else {
        
        }
    },
    _setActivityPanel: function(_panel) {
    
    },
    

    
    //public interface
    
    /**
     * @public
     * 当某个 Customer 被选中时，可以调用此接口切换到相应面板。
     * 这里有 3 种情况：1，同一个 Customer 再次被选中；2，从其他 Customer 跳过来的；3，从 all 跳转过来的
     * 要对这三种情况作出判断
     *
     */
    switchToSingleCustomerView: function(_customer) {
        var me = this;
        if(me.allCustomerMode) {
            // 从 all 跳转过来，根据 {@link #_switchActivityPanel } 切换；
            me.allCustomerMode = false;
            me.selectedCustomer = _customer;
            me._switchActivityPanel();
        } else if(!me.selectedCustomer === _customer) {
            // 从另外的 Customer 跳转过来，只需改变当前面板的 activityStore；
            me.selectedCustomer = _customer;
        }
        
    },
    
    /**
     * @public
     * 当 all 被选中时，可以调用此接口切换到相应面板。
     * 这里有种情况就是 all 再次被选中，所以要先对这种情况作出判断。
     */
    switchToAllCustomerView: function() {
        var me = this;
        if(!me.allCustomerMode) {
            me.selectedCustomer = null;
            me.allCustomerMode = true;
            
        }
    }

});
