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
            firstUserFieldFullname: 'main [name=firstuser] [name=fullname]',
            firstUserFieldEmail: 'main [name=firstuser] [name=email]',
            firstUserButtonCreate: 'main [name=firstuser] button',
            
            userTab: 'main [name=user]',
            userFieldLogin: 'main [name=user] [name=login]',
            userFieldPassword: 'main [name=user] [name=password]',
            userButtonLogin: 'main [name=user] button'
        },
        control: {
        	'serverButton': { 'tap': 'onServerVersion' },
        	'serverFieldServer': { 'change': 'onServerFieldServerChange' },
        	
        	'firstUserFieldLogin': { 'change': 'onFirstUserFieldsChange' },
        	'firstUserFieldPassword': { 'change': 'onFirstUserFieldsChange' },
        	'firstUserFieldConfirmPassword': { 'change': 'onFirstUserFieldsChange' },
        	'firstUserFieldEmail': { 'change': 'onFirstUserFieldsChange' },
        	'firstUserButtonCreate': { 'tap': 'onFirstUserCreation' },
        	
        	'userFieldLogin': { 'change': 'onUserFieldsChange' },
        	'userFieldPassword': { 'change': 'onUserFieldsChange' },
        	'userButtonLogin': { 'tap': 'onUserConnect' }
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
    onServerVersion: function(button, e, eOpts)
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
    	var fullname = this.getFirstUserFieldFullname().getValue();
    	var email = this.getFirstUserFieldEmail().getValue();
    	
    	this.getFirstUserTab().setMasked(true);
    	Ext.Ajax.request({
    	    url: url + "/service/first-user.php",
    	    params: {
    	    	login: login,
    	    	password: password,
    	    	fullname: fullname,
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
    	if (object.error == true)
    	{
        	Ext.Msg.alert(I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE2_TITLE, I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE2_TEXT);
    	}
    	else if (object.success == true)
    	{
        	Ext.Msg.alert(I18n.MAIN_USERADD_CREATIONPANEL_CREATESUCCESS_TITLE, I18n.MAIN_USERADD_CREATIONPANEL_CREATESUCCESS_TEXT);
        	this.getMain().getTabBar().getItems().get(2).hide();
        	this.getMain().getTabBar().getItems().get(3).show();
        	this.getMain().setActiveItem(3);
    	}
    	else
    	{
        	Ext.Msg.alert(I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE3_TITLE, I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE3_TEXT);
    	}
    },
    _firstUserCreationFail: function()
    {
    	this.getFirstUserTab().setMasked(false);
    	
    	Ext.Msg.alert(I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE_TITLE, I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE_TEXT);
    },
    
    onUserFieldsChange: function()
    {
    	this.getUserButtonLogin().setDisabled(this.getUserFieldLogin().getValue() == ""
    		|| this.getUserFieldPassword().getValue() == "");
    },
    onUserConnect: function()
    {
    	var url = this.getServerFieldServer().getValue();
    	var login = this.getUserFieldLogin().getValue();
    	var password = this.getUserFieldPassword().getValue();
    	
    	this.getUserTab().setMasked(true);
    	Ext.Ajax.request({
    	    url: url + "/service/login.php",
    	    params: {
    	    	login: login,
    	    	password: password
    	    },
    	    success: Ext.bind(this._userLoginCb, this),
    	    failure: Ext.bind(this._userLoginFail, this)
    	});
    },
    _userLoginCb: function(response)
    {
    	if (response.authenticate == false)
    	{
        	Ext.Msg.alert(I18n.MAIN_USE_LOGINPANEL_CREATEFAILURE2_TITLE, I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE2_TEXT);
    	}
    	else
    	{
    		alert("identification réussie " + response.login + " " + response.email + " " + response.fullname)
    	}
    },
    _userLoginFail: function()
    {
    	this.getFirstUserTab().setMasked(false);
    	
    	Ext.Msg.alert(I18n.MAIN_USE_LOGINPANEL_CREATEFAILURE_TITLE, I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE_TEXT);
    }
});
