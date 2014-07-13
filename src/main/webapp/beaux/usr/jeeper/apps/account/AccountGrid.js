Ext.define('Jeeper.apps.account.AccountGrid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Jeeper.model.FinancialAccount',
        'Jeeper.lib.FinancialAccountType'
    ],

    xtype: 'tree-grid',
    rootVisible: false,
    width: 800,
    height: 600,


    i18n: {
        menu_refresh: 'Refresh'
    },

    columnLines: true,
    rowlines: true,

    viewConfig: {
        toggleOnDblClick: false //disable double click to expande parent node
    },


    balanceNA: '-',

    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            store: Ext.create('Ext.data.TreeStore', {
                model: 'Jeeper.model.FinancialAccount',
                defaultRootProperty: 'childNodes',
                proxy: {
                    type: 'ajax',
                    url: '../res/financial_accounts/tree',
                    reader: {
                        type: 'json'
                    }
                },
                autoLoad: true,
                sorters: [{
                    property: 'number',
                    direction: 'ASC'
                }]
            }),
            columns: [{
                text: '编号',
                width: 100,
                dataIndex: 'number'
            }, {
                text: '科目名称',
                flex: 3,
                xtype: 'treecolumn',
                dataIndex: 'nodeName',
                treeRenderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                    var me = this,
                        cls = record.get('cls'),
                        renderer = me.origRenderer,
                        data = record.data,
                        parent = record.parentNode,
                        rootVisible = view.rootVisible,
                        lines = [],
                        parentData;

                    if (cls) {
                        metaData.tdCls += ' ' + cls;
                    }

                    while (parent && (rootVisible || parent.data.depth > 0)) {
                        parentData = parent.data;
                        lines[rootVisible ? parentData.depth : parentData.depth - 1] =
                            parentData.isLast ? 0 : 1;
                        parent = parent.parentNode;
                    }

                    return me.getTpl('cellTpl').apply({
                        record: record,
                        baseIconCls: me.iconCls,
                        iconCls: data.iconCls,
                        icon: data.icon,
                        checkboxCls: me.checkboxCls,
                        checked: data.checked,
                        elbowCls: me.elbowCls,
                        expanderCls: me.expanderCls,
                        textCls: me.textCls,
                        leaf: data.leaf,
                        expandable: false, //record.isExpandable(), // disable expander
                        isLast: data.isLast,
                        blankUrl: Ext.BLANK_IMAGE_URL,
                        href: data.href,
                        hrefTarget: data.hrefTarget,
                        lines: lines,
                        metaData: metaData,
                        childCls: me.getChildCls ? me.getChildCls() + ' ' : '',
                        value: renderer ? renderer.apply(me.origScope, arguments) : value
                    });
                }

            }, {
                text: '账户类型',
                flex: 1,
                dataIndex: 'type',
                renderer: function(value) {
                    return Jeeper.lib.FinancialAccountType.getTypeName(value);
                }
            }, {
                text: '余额',
                width: 150,
                align: 'right',
                dataIndex: 'balance',
                renderer: function(value, meta, record) {
                    var isR = Jeeper.lib.FinancialAccountType.isRetainedEarnings(record.getData().type);
                    return isR ? me.balanceNA : Ext.util.Format.number(value, '0,0.00');
                }
            }]
        });
        me.on({
            itemdblclick: me.onItemDblClick,
            itemcontextmenu: me.onItemContextMenu,
            containercontextMenu: me.onContainerContextMenu,
            destroy: me.onDestroy,
            scope: me
        });
        me.callParent();
    },

    onItemContextMenu: function(dom, record, item, index, e, eOpts) {
        var menu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: '编辑当前科目',
                handler: function() {
                    this.launchAccountCard(record);
                },
                scope: this
            }, {
                text: 'QuickReport',
                handler: function() {
                    Beaux.sys.application.ApplicationManager.launchApp('Jeeper.apps.journal.AccountJournalQuickReport', {
                        account: record
                    });
                },
                scope: this
            }, '-', {
                text: '新建科目',
                handler: function() {
                    this.launchAccountCard();
                },
                scope: this

            }, {
                text: '通用记账',
                handler: function() {
                    Beaux.sys.AppMgr.launchApp('Jeeper.apps.journal.GeneralJournal');
                },
                scope: this
            }, '-', {
                text: this.i18n.menu_refresh,
                handler: function() {
                    this.store.reload();
                },
                scope: this

            }]
        });
        menu.showAt(e.getXY());
    },

    onContainerContextMenu: function(dom, e, eOpts) {
        var menu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: '新建会计科目',
                handler: function() {
                    this.launchAccountCard();
                },
                scope: this

            }, {
                text: '通用记账',
                handler: function() {
                    Beaux.sys.AppMgr.launchApp('Jeeper.apps.journal.GeneralJournal');
                },
                scope: this
            }, {
                text: this.i18n.menu_refresh,
                handler: function() {
                    this.store.reload();
                }
            }]
        });
        menu.showAt(e.getXY());
    },

    onItemDblClick: function(dom, record, item, index, e, eOpts) {
        //e.stopEvent();
        //this.launchAccountCard(record);
        Beaux.sys.application.ApplicationManager.launchApp('Jeeper.apps.journal.AccountJournal', {
            account: record
        });
    },

    onDestroy: function() {
        if (this.card)
            this.card.close();
    },

    launchAccountCard: function(account) {
        var me = this;
        var card = Ext.create('Jeeper.apps.account.AccountCard', {
            record: account
        });
        card.show();
    },

    launchAccountJournal: function(account) {

    },

    launchGeneralJournal: function() {

    },

    launchJournalCard: function() {

    },

    onCardRecordSaved: function() {
        this.store.reload();
    }

});