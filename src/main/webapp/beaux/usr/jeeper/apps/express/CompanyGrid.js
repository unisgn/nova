Ext.define('Jeeper.apps.express.CompanyGrid', {
    extend: 'Ext.grid.Panel',

    width: 600,
    height:400,
    columnLines:true,

    requires:[
        'Jeeper.model.ExpressCompany'
    ],

    ui_text: {
        header_name:'Name',
        header_kuaidi100code:'Kuaidi100Code',
        menu_newCompany:'New Company'
    },
    
    initComponent: function() {
        var me = this;
        me.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            listeners:{
                edit: function(editor, ctx) {
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
        
        Ext.apply(me, {
            store: Ext.create('Ext.data.Store', {
                model: 'Jeeper.model.ExpressCompany',
                autoLoad:true
                //autoSync: true
            }),
            columns:[{
                header:me.ui_text.header_name,
                dataIndex:'name',
                editor:'textfield',
                flex:1
            },{
                header:me.ui_text.header_kuaidi100code,
                dataIndex:'kuaidi100code',
                editor:'textfield',
                flex:1
            }],
            plugins:[
                me.rowEditor
            ],
            selType:'rowmodel'
        });

        me.on({
            itemcontextmenu: me.onItemContextMenu,
            containercontextmenu: me.onContainerContextMenu,
            scope: me
        });
        me.callParent();
    },

    onItemContextMenu: function(grid, record, item, index, e) {
        var me = this,
            menu = Ext.create('Ext.menu.Menu', {
                items:[{
                    text:me.ui_text.menu_newCompany,
                    handler: function() {
                        me.store.insert(0, Ext.create('Jeeper.model.ExpressCompany')),
                        me.rowEditor.startEdit(0, 0);
                    }
                }]
            });
        menu.showAt(e.getXY());
    },
    onContainerContextMenu: function(grid, e) {
        var me = this,
            menu = Ext.create('Ext.menu.Menu', {
                items:[{
                    text:me.ui_text.menu_newCompany,
                    handler: function() {
                        me.store.insert(0, Ext.create('Jeeper.model.ExpressCompany')),
                        me.rowEditor.startEdit(0, 0);
                    }
                }]
            });
        menu.showAt(e.getXY());
    }
});
