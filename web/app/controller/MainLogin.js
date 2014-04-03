Ext.define('PiClim.controller.MainLogin', {
    extend: 'Ext.app.Controller',
    
    requires: [
         'Ext.Ajax'
    ],
    
    config: {
        refs: {
        	main: 'main',
        	
            serverTab: 'main [name=server]',
            serverFieldServer: 'main [name=server] [name=url]',
            serverButton: 'main [name=server] button',

            firstUserTab: 'main [name=firstuser]',
            firstUserFieldLogin: 'main [name=firstuser] [name=login]',
            firstUserFieldPassword: 'main [name=firstuser] [name=password]',
            firstUserFieldConfirmPassword: 'main [name=firstuser] [name=confirmpassword]',
            firstUserFieldEmail: 'main [name=firstuser] [name=email]',
            firstUserButtonCreate: 'main [name=firstuser] button',
            
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
        	},
        	
        	'firstUserFieldLogin': { 'change': 'onFirstUserFieldsChange' },
        	'firstUserFieldPassword': { 'change': 'onFirstUserFieldsChange' },
        	'firstUserFieldConfirmPassword': { 'change': 'onFirstUserFieldsChange' },
        	'firstUserFieldEmail': { 'change': 'onFirstUserFieldsChange' },
        	'firstUserButtonCreate': 
        	{
        		'tap': 'onFirstUserCreation'
        	}
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    },
    
    /** url change */
    onServerFieldServerChange: function(field, newValue, oldValue, eOpts)
    {
    	this.getMain().getTabBar().getItems().get(2).hide();
    	this.getMain().getTabBar().getItems().get(3).hide();
    	this.getServerButton().setDisabled(!/^http(s)?:\/\/[^:]+/i.test(newValue));
    },
    
    /** When user click on login */
    onServerLogin: function(button, e, eOpts)
    {
    	this.getMain().getTabBar().getItems().get(2).hide();
    	this.getMain().getTabBar().getItems().get(3).hide();

    	var url = this.getServerFieldServer().getValue();

    	this.getServerTab().setMasked(true);
    	Ext.Ajax.request({
    	    url: url + "/service/version.php",
    	    success: Ext.bind(this._loginCb, this),
    	    failure: Ext.bind(this._loginFail, this)
    	});
    },
    _loginCb: function(response)
    {
    	this.getServerTab().setMasked(false);

    	var object = Ext.decode(response.responseText);
        if (object.version != PiClim.app.version)
        {
        	Ext.Msg.alert(I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TITLE, I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TEXT + PiClim.app.version + I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TEXT2 + object.version + I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TEXT3);
        }
        else if (!object.initialized)
        {
        	this.getMain().getTabBar().getItems().get(2).show();
        	this.getMain().setActiveItem(2);
        }
        else
        {
        	this.getMain().getTabBar().getItems().get(3).show();
        	this.getMain().setActiveItem(3);
        }
    },
    _loginFail: function()
    {
    	this.getServerTab().setMasked(false);
    	
    	Ext.Msg.alert(I18n.MAIN_SERVER_CONNECT_FAILURE_TITLE, I18n.MAIN_SERVER_CONNECT_FAILURE_TEXT);
    },
    
    /** fields change */
    onFirstUserFieldsChange: function()
    {
    	var enabled = this.getFirstUserFieldLogin().getValue() != '' 
    				&& this.getFirstUserFieldPassword().getValue() != ''
    				&& this.getFirstUserFieldConfirmPassword().getValue() == this.getFirstUserFieldPassword().getValue()
    				&& /^.+@.+\..+$/i.test(this.getFirstUserFieldEmail().getValue());
    	this.getFirstUserButtonCreate().setDisabled(!enabled);
    },
    
    /** user creation */
    onFirstUserCreation: function()
    {
    	var url = this.getServerFieldServer().getValue();

    	var login = this.getFirstUserFieldLogin().getValue();
    	var password = this.getFirstUserFieldPassword().getValue();
    	var email = this.getFirstUserFieldEmail().getValue();
    	
    	this.getFirstUserTab().setMasked(true);
    	Ext.Ajax.request({
    	    url: url + "/service/first-user.php",
    	    params: {
    	    	login: login,
    	    	password: password,
    	    	email: email
    	    },
    	    success: Ext.bind(this._firstUserCreationCb, this),
    	    failure: Ext.bind(this._firstUserCreationFail, this)
    	});
    },
    _firstUserCreationCb: function(response)
    {
    	this.getFirstUserTab().setMasked(false);

    	var object = Ext.decode(response.responseText);
    	// TODO
    },
    _firstUserCreationFail: function()
    {
    	this.getFirstUserTab().setMasked(false);
    	
    	Ext.Msg.alert(I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE_TITLE, I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE_TEXT);
    }
});
