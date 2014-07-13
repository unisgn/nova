Ext.define('Jeeper.model.ExpressFormMessage', {
    extend:'Ext.data.model',
    kudi100url: 'url',
    fields:[],

    proxy:{
        type:'jsonp',
        url:this.kuaidi100url,
        reader:{
            type:'json',
            root:'data'
    
        }
    }
});
