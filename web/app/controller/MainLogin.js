Ext.define('PiClim.controller.MainLogin', {
    extend: 'Ext.app.Controller',
    
    requires: [
         'Ext.Ajax'
    ],
    
    config: {
        refs: {
            serverFieldServer: 'main [name=server] [name=url]',
            serverButton: 'main [name=server] button',
            
            loginFieldLogin: 'main [name=login]',
            loginFieldPassword: 'main [name=password]',
            loginButton: 'main button'
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
    	this.getServerButton().setDisabled(!/^http(s)?:\/\/[^:]+/i.test(newValue));
    },
    
    /** When user click on login */
    onServerLogin: function(button, e, eOpts)
    {
    	var url = this.getServerFieldServer().getValue();

    	Ext.Ajax.request({
    	    url: url + "/service/version.php",
    	    success: this._loginCb,
    	    failure: this._loginFail
    	});
    },
    
    _loginCb: function(response)
    {
        var text = response.responseText;
    	alert(text);
    },
    
    _loginFail: function()
    {
    	Ext.Msg.alert(I18n.MAIN_WELCOME_LOGINPANEL_CONNECT_FAILURE_TITLE, I18n.MAIN_WELCOME_LOGINPANEL_CONNECT_FAILURE_TEXT);
    }
    
});
