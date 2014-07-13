Ext.define('Beaux.widget.MathExpField', {
    extend: 'Ext.form.field.Text',
    alias:'widget.mathexpfield',
    xtype:'mathexpfield',

    initComponent: function() {
        var me = this;
        me.callParent();
        me.on({
            blur: me.parseExp,
            specialkey: me.parseExp,
            scope: me
        });
    },

    parseExp: function(field) {
        try {
            field.setValue(Parser.evaluate(String(field.getValue())));
        } catch (e) {
            // do nothing, left to Ext to handle
        }
        
    }
});
