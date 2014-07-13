Ext.define('Jeeper.apps.partner.PartnerGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Jeeper.model.Partner'
    ],
    
    width: 800,
    height: 600,
    columnLines: true,

    viewConfig: {
        stripeRows: true
        //enableTextSelection: true
    },

    lastSearchCursorPositon: 0,
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            store: Ext.create('Ext.data.Store', {
                model: 'Jeeper.model.Partner',
                proxy: {
                    type: 'rest',
                    reader: {
                        type: 'json',
                        root: 'data'
                    },
                    //url: 'usr/jeeper/data/partners2.json'
                    url: '../res/partners'
                },
                autoLoad: true,
                listeners: {
                    load: me.onStoreLoad,
                    scope: me
                }
            }),
            columns:[{
                text: '编号',
                width: 100,
                dataIndex: 'number'
            }, {
                text: '代码',
                width: 100,
                dataIndex: 'code'
            }, {
                text: '名称',
                width: 250,
                dataIndex: 'name'
            }, {
                text: '备注',
                dataIndex: 'description',
                flex: 2 
            }],
            bbar:[{
                xtype: 'textfield',
                emptyText: '搜索',
                name: 'searchKey',
                enableKeyEvents: true,// enable keyup event
                listeners:{
                    keyup: this.onSearchFieldKeyup,// keyup listener works only with enableKeyEvents set true
                    scope: this
                }
            }, {
                xtype: 'tbtext'
            }, {
                xtype: 'button',
                text:'刷新',
                handler: function() { me.getStore().reload(); },
                scope: me
            }]
            
        });

        me.on({
            itemdblclick: me.onItemDblClick,
            itemcontextmenu: me.onItemContextMenu,
            containercontextmenu:me.onContainerContextMenu,
            scope: me
        });
        me.callParent();
    },

    onItemDblClick: function(dom, record) {
        this.launchPartnerCard(record);
    },

    onItemContextMenu: function(dom, record, item, index, e) {
        var menu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: '编辑',
                handler: function() {
                    this.launchPartnerCard(record);
                },
                scope: this
            }, '-', {
                text: '新建',
                handler: function() {
                    this.launchPartnerCard();
                },
                scope: this
            }]
        });
        menu.showAt(e.getXY());
    },
    onContainerContextMenu: function(dom, e) {
        var menu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: '新建合作伙伴',
                handler: function() {
                    this.launchPartnerCard();
                },
                scope: this
            }]
        });
        menu.showAt(e.getXY());
    },

    onStoreLoad: function(store) {
        this.setTotalCount(this.getStore().count());
    },

    onSearchFieldKeyup: function(field) {
        var me       = this,
            last     = me.lastSearchCursorPosition,
            current  = field.getCursorPosition(),
            keywords = Ext.String.splitWords(field.getValue()),
            store    = me.getStore();

        if(current != last) {
            me.lastSearchCursorPosition = current;
            if(current === 0 || keywords.length ===0) {
                store.clearFilter(false);
            } else {
                var regText = '';
                Ext.Array.each(keywords, function(value) {
                    regText += ('*' + value);
                });
                var reg = new RegExp('/' + regText, 'i');
                var filterFn = function(item) {
                    //return reg.test(item.get('searchField'));
                    
                    return (reg.test(item.get('name'))
                            || reg.test(item.get('number'))
                            || reg.test(item.get('code'))
                            || reg.test(item.get('searchKey'))   
                           );
                };
                store.clearFilter();
                store.filter([filterFn]);
            }
            me.setTotalCount(store.getCount());
        }
    },

    setTotalCount: function(count) {
        //var total = me.getDockedItems('toolbar[dock="bottom"]')[0].items.getAt(1);
        this.down('toolbar').items.getAt(1).setText('总计:&nbsp&nbsp&nbsp&nbsp' + count);
    },
    
    launchPartnerCard: function(partner) {
        var record = partner;
        if(!record)
            record = this.getStore().add(Ext.create('Jeeper.model.Partner'))[0];
        Ext.create('Jeeper.apps.partner.PartnerCard', {
            record: record
        }).show();
    }
});
