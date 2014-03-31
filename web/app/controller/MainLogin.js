Ext.define('PiClim.controller.MainLogin', {
    extend: 'Ext.app.Controller',
    
    requires: [
         'Ext.Ajax'
    ],
    
    config: {
        refs: {
            serverFieldServer: 'main [name=server] [name=url]',
            serverButton: 'main [name=server] button',
            
            userTab: 'main [name=user]',
            userFieldLogin: 'main [name=user] [name=login]',
            userFieldPassword: 'main [name=user] [name=password]',
            userButtonLogin: 'main [name=user] button'
        },
        control: {
        	'serverButton': 
        	{
        		'tap': 'onServerLogin'
        	},
        	
        	'serverFieldServer':
        	{
        		'change': 'onServerFieldServerChange'
        	}
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    },
    
    /** url change */
    onServerFieldServerChange: function(field, newValue, oldValue, eOpts)
    {
    	this.getUserTab().disable();
    	this.getServerButton().setDisabled(!/^http(s)?:\/\/[^:]+/i.test(newValue));
    },
    
    /** When user click on login */
    onServerLogin: function(button, e, eOpts)
    {
    	this.getUserTab().disable();

    	var url = this.getServerFieldServer().getValue();

    	Ext.Ajax.request({
    	    url: url + "/service/version.php",
    	    success: this._loginCb,
    	    failure: this._loginFail
    	});
    },
    
    _loginCb: function(response)
    {
        var object = Ext.decode(response.responseText);
        if (object.version != PiClim.app.version)
        {
        	Ext.Msg.alert(I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TITLE, I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TEXT + PiClim.app.version + I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TEXT2 + object.version + I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TEXT3);
        }
        else if (!object.initialized)
        {
        	// TODO
        	alert("first connection")
        }
        else
        {
        	this.getUserTab().enable();
        }
    },
    
    _loginFail: function()
    {
    	Ext.Msg.alert(I18n.MAIN_SERVER_CONNECT_FAILURE_TITLE, I18n.MAIN_SERVER_CONNECT_FAILURE_TEXT);
    }
    
});
