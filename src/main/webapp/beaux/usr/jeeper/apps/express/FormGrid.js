Ext.define('Jeeper.apps.express.FormGrid', {
    extend: 'Ext.grid.Panel',

    requires:[
        'Jeeper.apps.express.ExpressCompany',
        'Jeeper.model.ExpressCompany',
        'Ext.ux.grid.FiltersFeature',
        //'Jeeper.model.ExpressFormMessage',
        'Jeeper.model.ExpressForm'
        //'Jeeper.apps.express.FormCard'
    ],

    //title:'Express Forms',
    width:1000,
    height:600,
    columnLines:true,

    ui_text: {
        header_date:'Date',
        header_memo:'Memo',
        header_company:'Company',
        header_number:'Number',
        menu_newForm:'New Form',
        menu_launchExpressCompany:'Launch Express Company',
        menu_formStatus:'Status',
        menu_deleteForm:'Delete',
        menu_refresh:'Refresh',
        status_company:'Company',
        status_number:'Number',
        status_message:'Message',
        status_status:'Status',
        status_detail:'Detail',
        status_checked:'Checked',
        status_uncheck:'Uncheck',
        alertMsg_serverError:'Server Error'
    },

    kuaidi100_url: 'http://www.kuaidi100.com',
    
    initComponent:function() {
        var me = this,
            filters = {
                ftype: 'filters',
                encode: false,
                local: true,

                filters:[{
                    type:'boolean',
                    dataIndex:'visiable'
                }]
            };
        me.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 0,
            listeners: {
                edit:function(editor, ctx) {
                    ctx.grid.store.sync();
                },
                canceledit: function(editor, ctx) {
                    if(ctx.record.phantom) {
                        ctx.grid.store.remove(ctx.record);
                    }
                },
                scope: me
            }
        });

        me.store = Ext.create('Ext.data.Store', {
            model:'Jeeper.model.ExpressForm',
            sorters:[{
                property:'formDate',
                direction:'DESC'
            }]
        });
        
        me.companyStore = Ext.create('Ext.data.Store', {
            model:'Jeeper.model.ExpressCompany'
        });
        
        Ext.apply(me, {
            columns:[{
                header:me.ui_text.header_date,
                dataIndex:'formDate',
                renderer:Ext.util.Format.dateRenderer('Y-m-d'),
                width: 120,
                editor:'datefield',
                filter:true
            },{
                header:me.ui_text.header_memo,
                dataIndex:'memo',
                flex:1,
                editor:'textfield',
                filter:{
                    type:'string'
                }
            },{
                header:me.ui_text.header_company,
                dataIndex:'company_fk',
                width:150,
                renderer: function(value) {
                    return value > 0 ? me.companyStore.findRecord('id', value).get('name') : '';
                },
                menuDisabled:true,
                editor:{
                    xtype:'combobox',
                    displayField:'name',
                    valueField:'id',
                    store:me.companyStore
                }

            },{
                header:me.ui_text.header_number,
                dataIndex:'formNumber',
                renderer: me.render_number,
                width:200,
                editor:{
                    xtype:'textfield'
                    //allowBlank:false
                },
                menuDisabled: true
            }],
            selType:'rowmodel',
            plugins:[
                me.rowEditor
            ],
            features:[filters]
        });
        
        me.on({
            containercontextmenu:me.onContainerContextMenu,
            itemcontextmenu: me.onItemContextMenu,
            //itemdblclick:me.onItemDblClick,
            scope:me
        });

        me.companyStore.load(function() {
            me.store.load();
        }, me);
        me.callParent();
    },




    
    onContainerContextMenu: function(dom, e) {
        var me = this;
        Ext.create('Ext.menu.Menu', {
                items:[{
                    text:me.ui_text.menu_newForm,
                    handler: function() {
                        me.store.insert(0, Ext.create('Jeeper.model.ExpressForm'));
                        me.rowEditor.startEdit(0, 1);
                    },
                    scope:me
                }, {
                    text:me.ui_text.menu_launchExpressCompany,
                    handler: me.launchExpressCompany,
                    scope: me
                },{
                    text:me.ui_text.menu_refresh,
                    handler:function() {
                        
                        me.companyStore.load(function() {
                            me.store.load();
                        }, me);
                    },
                    scope: me
                }]
            }).showAt(e.getXY());      
    },
    onItemContextMenu: function(dom, record, item, index, e) {
        var me = this;
        Ext.create('Ext.menu.Menu', {
                items:[{
                    text:me.ui_text.menu_formStatus,
                    handler:function() {
                        me.getFormStatus(record);
                    },
                    scope: me
                
                },{
                    text:me.ui_text.menu_deleteForm,
                    handler: function() {
                        record.destroy();
                    },
                    scope: me
                }, '-', {
                    text:me.ui_text.menu_newForm,
                    handler: function() {
                        me.store.insert(0, Ext.create('Jeeper.model.ExpressForm'));
                        me.rowEditor.startEdit(0, 1);
                    },
                    scope:me
                },{
                    text:me.ui_text.menu_refresh,
                    handler:function() {
                        
                        me.companyStore.load(function() {
                            me.store.load();
                        }, me);
                    },
                    scope: me
                }, {
                    text:me.ui_text.menu_launchExpressCompany,
                    handler:me.launchExpressCompany,
                    scope: me
                }]
            }).showAt(e.getXY());
    },

    render_number:function(value, meta, record) {
        if(value) {
            var me = this,
                url = me.kuaidi100_url + '/chaxun',
                com_code = record.raw ? record.raw.company.kuaidi100code : me.companyStore.findRecord('id', record.data.company_fk).get('kuaidi100code'),
                form_no = value;
            return '<a href=' + url + '?com=' + com_code + '&nu=' + form_no + ' target="_blank" style="text-decoration:none">' + value + '</a>';
        } else {
            return value;
        }
        
        
    },

    getFormStatus: function(record) {
        if(record.raw) {
            var com_code = record.raw.company.kuaidi100code,
                com_name = record.raw.company.name,
                me = this,
                form_no = record.data.formNumber,
                tpl = new Ext.XTemplate(
                    '<p>'+ me.ui_text.status_number +': {com_name}#{form_no}&nbsp&nbsp&nbsp&nbsp' + me.ui_text.status_status + ': {checkStatus}</p>',
                    '<p>'+ me.ui_text.status_message +': {message}',
                    '<hr/>',
                    '<tpl for="data">',
                    '<p>{ftime} ==> {context}</p>',
                    '</tpl>'
                ),
                win = Ext.create('Beaux.sys.XWindow', {
                    title:com_name + ' # ' + form_no,
                    width:600,
                    height:500,
                    bodyPadding: 10,
                    overflowY:'auto',
                    tpl: tpl
                });
            win.show();
            
            win.setLoading('正在联网查询', true);
            
            Ext.data.JsonP.request({
                url: me.kuaidi100_url + '/query',
                params:{
                    type: com_code,
                    postid: form_no
                },
                callback:function(success, data) {
                    if(success) {
                        data.com_name = com_name;
                        data.form_no = form_no;
                        if(data.ischeck) {
                            data.checkStatus = data.ischeck === '1' ? me.ui_text.status_checked : me.ui_text.status_uncheck;
                        } else {
                            data.checkStatus = '';
                        }
                        

                        win.setLoading(false);
                        win.setTitle(com_name + ' # ' + form_no + '&nbsp&nbsp' + data.checkStatus);
                        win.update(data);
                    } else {
                        Ext.Msg.alert(me.ui_text.alertMsg_serverError, '', function() {
                            win.close();
                        }, this);
                    }
                    
                },
                scope: this
            });
        }
        
    },
    launchExpressCompany:function() {
        Beaux.sys.application.ApplicationManager.launchApp('Jeeper.apps.express.ExpressCompany');
    }
});
