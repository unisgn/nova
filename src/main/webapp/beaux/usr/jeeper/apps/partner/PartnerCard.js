Ext.define('Jeeper.apps.partner.PartnerCard', {
    extend: 'Jeeper.apps.ModelCard',

    requires: [
        'Jeeper.model.Partner'
    ],

    layout: 'fit',

    model: 'Jeeper.model.Partner',
    newTitle: '新建合作伙伴',
    titleProperty: 'name',
    

    buildModelCard: function() {
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
                fieldLabel: '编号',
                name: 'number'
            }, {
                fieldLabel: '代码',
                name: 'code'
            }, {
                fieldLabel: '名称',
                name: 'name'
            }, {
                fieldLabel: '关键字',
                name: 'searchKey'
            }, {
                fieldLabel: '备注',
                xtype: 'textarea',
                name: 'description'
            }, {
                xtype: 'checkboxgroup',
                fieldLabel: '角色',
                items:[{
                    boxLabel: '客户',
                    name: 'roleCustomer'
                }, {
                    boxLabel: '供应商',
                    name: 'roleVendor'
                }, {
                    boxLabel: '员工',
                    name: 'roleEmployee'
                }]
            }]
        });

    }
    
});
