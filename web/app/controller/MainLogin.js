Ext.define('PiClim.controller.MainLogin', {
    extend: 'Ext.app.Controller',
    
    requires: [
         'Ext.Ajax'
    ],
    
    config: {
        refs: {
            loginFieldServer: 'main [name=url]',
            loginFieldLogin: 'main [name=login]',
            loginFieldPassword: 'main [name=password]',
            loginButton: 'main button'
        },
        control: {
        	'loginButton': 
        	{
        		'tap': 'onLogin'
        	},
        	
        	'loginFieldServer':
        	{
        		'change': 'onLoginFieldServerChange'
        	}
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    },
    
    /** url change */
    onLoginFieldServerChange: function(field, newValue, oldValue, eOpts)
    {
    	this.getLoginButton().setDisabled(!/^http(s)?:\/\/[^:]+/i.test(newValue));
    },
    
    /** When user click on login */
    onLogin: function(button, e, eOpts)
    {
    	var url = this.getLoginFieldServer().getValue();
    	var login = this.getLoginFieldLogin().getValue();
    	var password = this.getLoginFieldPassword().getValue();

    	Ext.Ajax.request({
    	    url: url + "/service/login.php",
    	    params: {
    	        login: login,
    	        password: password
    	    },
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
