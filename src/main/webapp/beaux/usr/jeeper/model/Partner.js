Ext.define('Jeeper.model.Partner', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id',           type: 'int'                         },
        { name: 'version',      type: 'int'                         },
        { name: 'active',       type: 'boolean', defaultValue: true },
        { name: 'number',       type: 'string'                      },
        { name: 'code',         type: 'string'                      },
        { name: 'name',         type: 'string'                      },
        { name: 'searchKey',    type: 'string'                      },
        { name: 'description',  type: 'string'                      },
        { name: 'roleCustomer', type: 'boolean'                     },
        { name: 'roleVendor',   type: 'boolean'                     },
        { name: 'roleEmployee', type: 'boolean'                     }
        /*
        { name: 'searchField',  type: 'string',
          convert:function(value, record) {
              return (record.get('number') + record.get('code') +
                      record.get('name') + record.get('searchKey'));
          }}
         */
    ],

    proxy: {
        type: 'rest',
        url: '../res/partners',
        reader: {
            type: 'json',
            root: 'data',
            messageProperty: 'message'
        }
    }
});
