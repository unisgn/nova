Ext.define('Jeeper.lib.FinancialAccountType', {
    singleton: true,

    cash                     : 'CASH',
    account_receivable       : 'ACCOUNT_RECEIVABLE',
    other_current_asset      : 'OTHER_CURRENT_ASSET',
    fixed_asset              : 'FIXED_ASSET',
    other_longterm_asset     : 'OTHER_LONGTERM_ASSET',
    other_asset              : 'OTHER_ASSET',

    account_payable          : 'ACCOUNT_PAYABLE',
    other_current_liability  : 'OTHER_CURRENT_LIABILITY',
    other_longterm_liability : 'OTHER_LONGTERM_LIABILITY',
    other_liability          : 'OTHER_LIABILITY',

    income                   : 'INCOME',
    cog                      : 'COG',
    expense                  : 'EXPENSE',

    retained_earnings        : 'RETAINED_EARNINGS',

    common_stock             : 'COMMON_STOCK',
    other_equity             : 'OTHER_EQUITY',
    
    asset:['CASH', 'ACCOUNT_RECEIVABLE', 'OTHER_CURRENT_ASSET', 'FIXED_ASSET', 'OTHER_LONGTERM_ASSET', 'OTHER_ASSET'],
    liability:['ACCOUNT_PAYABLE', 'OTHER_CURRENT_LIABILITY', 'OTHER_LONGTERM_LIABILITY', 'OTHER_LIABILITY'],
    equity:['RETAINED_EARNINGS', 'COMMON_STOCK', 'OTHER_EQUITY'],
    retainedEarnings:['INCOME', 'COG', 'EXPENSE'],

    types: [
        'CASH', 'ACCOUNT_RECEIVABLE', 'OTHER_CURRENT_ASSET', 'FIXED_ASSET', 'OTHER_LONGTERM_ASSET', 'OTHER_ASSET',
        'ACCOUNT_PAYABLE', 'OTHER_CURRENT_LIABILITY', 'OTHER_LONGTERM_LIABILITY', 'OTHER_LIABILITY',
        'INCOME', 'COG', 'EXPENSE',
        'RETAINED_EARNINGS', 'COMMON_STOCK', 'OTHER_EQUITY'
    ],

    names:[
        '现金','应收账款','其他流动资产','固定资产','其它长期资产','其他资产',
	'应付账款','其它流动负债','其它长期负债','其它负债',
	'收入','成本','费用',
	'留存收益','资本','其它所有者权益',''
    ],
    
    isAsset:function(type) {
        return this.asset.indexOf(type) < 0 ? false : true;
    },

    isLiability:function(type) {
        return this.liability.indexOf(type) < 0 ? false : true;
    },

    isEquity: function(type) {
        return this.equity.indexOf(type) < 0 ? false : true;
    },

    isAccountReceivable: function(type) {
        return type === this.account_receivable;
    },

    isAccountPayable: function(type) {
        return type === this.account_payable;
    },

    isRetainedEarnings: function(type) {
        return this.retainedEarnings.indexOf(type) < 0 ? false : true;
    },

    getRelativeBalance: function(type, balance) {
        return type === this.cog || type === this.expense ? -balance : balance;
    },

    getTypeNames: function() {
        var names = new Array();
        for(var i = 0; i <= this.types.length; i++) {
            names[i] = {
                name:this.names[i],
                value: this.types[i]
            };
        }
        return names;
    },

    getTypeName:function(type) {
        var index = this.types.indexOf(type);
        if(index >= 0) {
            return this.names[index];
        } else {
            return null;
        }
    }
    
});
