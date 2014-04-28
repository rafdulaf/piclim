Ext.define('PiClim.model.User', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'login', type: 'string' },
            { name: 'fullname', type: 'string' },
            { name: 'email', type: 'string' }
        ],
        
        proxy: {
            type: 'ajax',
            initial_url: 'service/users_list.php',
            reader: 'json'
          }
    }
});
