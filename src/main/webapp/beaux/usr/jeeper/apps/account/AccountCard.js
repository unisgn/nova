Ext.define('Jeeper.apps.account.AccountCard', {
    extend: 'Jeeper.apps.TreeModelCard',

    requires: ['Jeeper.model.FinancialAccount'],

    newTitle: '新建会计科目',
    model: 'Jeeper.model.FinancialAccount',
    titleProperty: 'nodeName',
    
    buildModelCard: function() {
        var accountTypeNames = Jeeper.lib.FinancialAccountType.getTypeNames();
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
                fieldLabel: '账户类型',
                name: 'type',
                editable: false,
                xtype: 'combobox',
                displayField: 'name',
                valueField: 'value',
                store: Ext.create('Ext.data.Store', {
                    fields: ['name', 'value'],
                    data: accountTypeNames
                }),
                listeners: {
                    change: this.onAccountTypeChange,
                    //change: Ext.emptyFn,
                    scope: this
                }
            }, {
                fieldLabel: '上级科目',
                name: 'parentId',
                xtype: 'combobox',
                displayField: 'fullPathName',
                valueField: 'id',
                store: Ext.create('Ext.data.Store',{
                    model: 'Jeeper.model.FinancialAccount'
                }),
                queryMode:'local',
                anyMatch: true
                //matchFieldWidth: false,
                /*
                listConfig:{
                    minWidth: 450
                },
                 
                tpl:Ext.create('Ext.XTemplate',
                               '<p> NEW </p>',
                               '<tpl for=".">',
                               '<div class="x-boundlist-item">{number}-{fullPathName}</div>',
                               '</tpl>')
                 */
            }, {
                fieldLabel: '编号',
                name: 'number'
            }, {
                fieldLabel: '名称',
                name:'nodeName'
            }, {
                fieldLabel: '备注',
                name: 'description',
                xtype: 'textarea'
            }]

        });
    },

    newRecord: function() {
        return Ext.create(this.model);
    },
    loadRecord: function() {
        var me = this;
        me.callParent();
        me.getTypeCombo().setReadOnly((me.editMode === true));
    },

    onAccountTypeChange:  function(field, newValue){
        var type = newValue,
            url = '../res/financial_accounts/by_type/' + type,
            parentStore = this.getParentCombo().store;
        parentStore.setProxy({
            type: 'ajax',
            url: url,
            reader: {
                type: 'json',
                root: 'data'
            }
        });
        parentStore.load(function() {
            parentStore.add(Ext.create('Jeeper.model.FinancialAccount'));
            console.log(parentStore);
        }, this);
    },
    
    getTypeCombo:function() {
        return this.card.items.getAt(0);
    },
    getParentCombo: function() {
        return this.card.items.getAt(1);
    }
});
