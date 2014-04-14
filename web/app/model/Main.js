Ext.define('PiClim.model.Main', {
    extend: 'Ext.data.Model',
    config: {
      fields: [ 'url', 'login', 'password' ],
      identifier:'uuid',
      proxy: {
        type: 'localstorage',
        id  : 'piclim.parameters'
      }
    }
});
