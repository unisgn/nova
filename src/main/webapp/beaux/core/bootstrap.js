console.log('start ext;');

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Beaux': '.',
        'Alcedo': './usr/alcedo',
        'Jeeper': './usr/jeeper'
    }
});

Ext.getDoc().on({
    contextmenu: function(e) { e.stopEvent(); }
});

Ext.require('Beaux.core.Beaux');

Ext.onReady(function () {

    Ext.Loader.loadScript('./core/override.js');
    
    console.log('start beaux boot;');
    Beaux.core.Beaux.main();
    console.log('beaux loaded;');
});
