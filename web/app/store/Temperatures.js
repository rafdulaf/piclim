Ext.define('PiClim.store.Temperatures', {
    extend: "Ext.data.Store",
    
    proxy: {
        type: "ajax",
        url : "service/rrd.php",
        reader: {
            type: "json",
            rootProperty: "data",
            getData: function(data) {
                debugger
                return data;
            }
        }
    }
});

