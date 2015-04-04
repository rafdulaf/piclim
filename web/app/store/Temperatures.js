Ext.define('PiClim.store.Temperatures', {
    extend: "Ext.data.Store",
    
    config: {
        proxy: {
            type: "ajax",
            url : "service/rrd.php",
            reader: {
                type: "json",
                rootProperty: "data"
            }
        }
    }
});

