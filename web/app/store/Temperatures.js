Ext.define('PiClim.store.TemperaturesReader', {
   extend: "Ext.data.reader.Json",
   
    getData: function(data) {
        debugger
        return data;
    }
});

Ext.define('PiClim.store.Temperatures', {
    extend: "Ext.data.Store",
    
    config: {
        proxy: {
            type: "ajax",
            url : "service/rrd.php",
            reader: Ext.create("PiClim.store.TemperaturesReader", {
                rootProperty: "data"
            })
        }
    }
});

