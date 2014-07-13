Ext.define('Beaux.sys.desktop.panelWidget.AppsMenu', {
    extend: 'Beaux.sys.desktop.lib.PanelWidget',
    requires: [
        'Beaux.sys.application.Application',
        'Beaux.sys.application.ApplicationManager',
        'Beaux.sys.desktop.lib.XWindow'
    ],


    i18n: {
        menu_system: 'System',
        menu_express: 'Express',
        app_generalJournalEntry: 'GeneralJournalEntry',
        app_financialAccounts: 'Accounts',
        app_generalJournal: 'General Journal',
        app_businessPartners: 'Business Partners'
    },

    initComponent: function() {
        var me = this;
        var appMgr = me.getApplicationManager();
        me.items = [
            Ext.create('Ext.toolbar.Toolbar', {
                items: [{
                    xtype: 'button',
                    text: 'System',
                    menu: [{
                        text: me.i18n.app_financialAccounts,
                        handler: function() {
                            appMgr.launchApp('Jeeper.apps.account.FinancialAccount');
                        }
                    }, {
                        text: me.i18n.app_generalJournalEntry,
                        handler: function() {
                            appMgr.launchApp('Jeeper.apps.journal.GeneralJournalEntry');
                        }
                    }, {
                        text: me.i18n.app_generalJournal,
                        handler: function() {
                            appMgr.launchApp('Jeeper.apps.journal.GeneralJournal');
                        }
                    }, {
                        text: me.i18n.app_businessPartners,
                        handler: function() {
                            appMgr.launchApp('Jeeper.apps.partner.Partner');
                        }
                    }]
                }, {
                    xtype: 'button',
                    text: 'Express',
                    menu: [{
                        text: 'Express Company',
                        handler: function() {
                            appMgr.launchApp('Jeeper.apps.express.ExpressCompany');
                        }
                    }, {
                        text: 'Express Form',
                        handler: function() {
                            appMgr.launchApp('Jeeper.apps.express.ExpressForm');
                        }
                    }]
                }]
            })
        ];

        me.callParent();

    },

    getApplicationManager: function() {
        return Beaux.sys.application.ApplicationManager;
    }
});