Ext.define('Jeeper.lang.zh_CN.apps.express.ExpressForm', {
    override: 'Jeeper.apps.express.ExpressForm',
	ui_text: {
        	win_title: '快递单'
    	}
});

Ext.define('Jeeper.lang.zh_CN.apps.express.FormGrid', {
	override:'Jeeper.apps.express.FormGrid',
	    ui_text: {
        header_date:'日期',
        header_memo:'备注',
        header_company:'快运公司',
        header_number:'单号',
        menu_newForm:'新建快递单',
	menu_deleteForm:'删除当前项目',
	menu_refresh:'刷新',
        menu_launchExpressCompany:'快递公司',
        menu_formStatus:'联网查看快递单状态',
        status_company:'快递公司',
        status_number:'单  号',
        status_message:'消  息',
        status_status:'状  态',
        status_detail:'详  情',
	status_checked:'已签收',
	status_unchekc:'暂未签收',
	alertMsg_serverError:'网络故障'
    }
});

Ext.define('Jeeper.lang.zh_CN.apps.express.ExpressCompany', {
	override:'Jeeper.apps.express.ExpressCompany',
	ui_text:{
		win_title: '快递公司'
	}
});

Ext.define('Jeeper.lang.zh_CN.apps.express.CompanyGrid', {
	override:'Jeeper.apps.express.CompanyGrid',
	ui_text:{
		header_name:'公司名称',
		header_kuaidi100code:'快递100代号',
		menu_newCompany:'新建快递公司'
	}
});
