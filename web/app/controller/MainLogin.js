Ext.define('PiClim.controller.MainLogin', {
    extend: 'Ext.app.Controller',
    
    requires: [
         'Ext.Ajax',
         'Ext.data.Store'
    ],
    
    config: {
        refs: {
        	main: 'main',
        	
        	mainHome: 'main [name=home]',
        	
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
            userFieldRemember: 'main [name=user] [name=remember]',
            userButtonLogin: 'main [name=user] button',
            
            home2Tab: 'main [name=home2]',
            home2Title: 'main [name=home2] [name=title]',
            home2Disconnect: 'main [name=home2] [name=title] [name=delete]',
            
            settingsTab: 'main [name=settings]',
            settingsUpdateButton: 'main [name=settings] [name=update]'
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
        	'userButtonLogin': { 'tap': 'onUserConnect' },
        	
        	'home2Disconnect': { 'tap': 'onDisconnect' },
        	
        	'settingsUpdateButton' : { 'tap': 'onUpdate' }
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
    	PiClim.app.isWeb = true;
    	
    	this.localStore = Ext.create('Ext.data.Store', {
    	      model: "PiClim.model.Main"
    	});
    	this.localStore.load();
    	if (this.localStore.getAllCount() > 0)
    	{
    		PiClim.app.url = this.localStore.getAt(0).get('url'); 
    		
        	var login = this.localStore.getAt(0).get('login');
        	var remember_token = this.localStore.getAt(0).get('remember_token');
        	
        	this.getMain().setMasked({xtype: 'loadmask', message: I18n.MAIN_SERVER_LOGINPANEL_CONNECTING});
        	Ext.Ajax.request({
        	    url: PiClim.app.url + "/service/login.php",
        	    params: {
        	    	login: login,
        	    	remember_token: remember_token
        	    },
        	    success: Ext.bind(this._userLoginCb, this),
        	    failure: Ext.bind(this._userLoginFail, this)
        	});
    	}
    	else if (PiClim.app.isWeb)
    	{
    		var serverUrl = window.location.href;
    		var i = serverUrl.indexOf('?');
    		if (i != -1)
    		{
    			serverUrl = serverUrl.substring(0, i);
    		}
    		PiClim.app.url = serverUrl;
    		
        	this.getMain().setMasked({xtype: 'loadmask', message: I18n.MAIN_SERVER_CONNECT_CONNECTING});
        	Ext.Ajax.request({
        	    url: PiClim.app.url + "/service/version.php",
        	    success: Ext.bind(this._loginCb, this, [true], 1),
        	    failure: Ext.bind(this._loginFail, this)
        	});
    	}
    	else
    	{
    		this.getMain().getTabBar().getItems().get(1).show();
    	}
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

    	PiClim.app.url = this.getServerFieldServer().getValue();

    	this.getMain().setMasked({xtype: 'loadmask', message: I18n.MAIN_SERVER_CONNECT_CONNECTING});
    	Ext.Ajax.request({
    	    url: PiClim.app.url + "/service/version.php",
    	    success: Ext.bind(this._loginCb, this, [false], 1),
    	    failure: Ext.bind(this._loginFail, this)
    	});
    },
    _loginCb: function(response, donotactivate)
    {
    	this.getMain().unmask();

    	var object = Ext.decode(response.responseText);
        if (object.version != PiClim.app.version)
        {
        	Ext.Msg.alert(I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TITLE, I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TEXT + PiClim.app.version + I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TEXT2 + object.version + I18n.MAIN_SERVER_CONNECT_VERSIONFAILURE_TEXT3);
        }
        else if (!object.initialized)
        {
        	this.getMain().getTabBar().getItems().get(2).show();
        	if (!donotactivate) this.getMain().setActiveItem(2);
        }
        else if (!object.authenticated)
        {
        	this.getMain().getTabBar().getItems().get(3).show();
        	if (!donotactivate) this.getMain().setActiveItem(3);
        }
        else
        {
    		this._userLoginSuccess(object.authenticated);
        }
    },
    _loginFail: function()
    {
    	this.getMain().unmask();
    	
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
    	var login = this.getFirstUserFieldLogin().getValue();
    	var password = this.getFirstUserFieldPassword().getValue();
    	var fullname = this.getFirstUserFieldFullname().getValue();
    	var email = this.getFirstUserFieldEmail().getValue();
    	
    	this.getMain().setMasked({xtype: 'loadmask', message: I18n.MAIN_USERADD_CREATIONPANEL_CREATING});
    	Ext.Ajax.request({
    	    url: PiClim.app.url + "/service/first-user.php",
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
    	this.getMain().unmask();

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
    	this.getMain().unmask();
    	
    	Ext.Msg.alert(I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE_TITLE, I18n.MAIN_USERADD_CREATIONPANEL_CREATEFAILURE_TEXT);
    },
    
    onUserFieldsChange: function()
    {
    	this.getUserButtonLogin().setDisabled(this.getUserFieldLogin().getValue() == ""
    		|| this.getUserFieldPassword().getValue() == "");
    },
    onUserConnect: function()
    {
    	var login = this.getUserFieldLogin().getValue();
    	var password = this.getUserFieldPassword().getValue();
    	var remember = this.getUserFieldRemember().isChecked();
    	
    	this.getMain().setMasked({xtype: 'loadmask', message: I18n.MAIN_SERVER_LOGINPANEL_CONNECTING});
    	Ext.Ajax.request({
    	    url: PiClim.app.url + "/service/login.php",
    	    params: {
    	    	login: login,
    	    	password: password,
    	    	remember: remember
    	    },
    	    success: Ext.bind(this._userLoginCb, this),
    	    failure: Ext.bind(this._userLoginFail, this)
    	});
    },
    _userLoginSuccess: function(fullname)
    {
    	PiClim.model.User._url = PiClim.app.url + PiClim.model.User.initial_url;

    	this.getMain().getTabBar().getItems().get(0).hide();
    	this.getMain().getTabBar().getItems().get(1).hide();
    	this.getMain().getTabBar().getItems().get(2).hide();
    	this.getMain().getTabBar().getItems().get(3).hide();
    	this.getMain().getTabBar().getItems().get(4).show();
    	this.getMain().getTabBar().getItems().get(5).show();
    	this.getMain().getTabBar().getItems().get(6).show();
    	this.getHome2Title().setTitle(I18n.MAIN_WELCOME2_TITLE_LONG_1 + " " + fullname + " " + I18n.MAIN_WELCOME2_TITLE_LONG_2);
    	this.getMain().setActiveItem(4);
    },
    _userLoginCb: function(response)
    {
    	this.getMain().unmask();

    	var object = Ext.decode(response.responseText);
    	if (object.authenticate == false)
    	{
        	Ext.Msg.alert(I18n.MAIN_USER_LOGINPANEL_CONNECT_FAILURE2_TITLE, I18n.MAIN_USER_LOGINPANEL_CONNECT_FAILURE2_TEXT);

    		this.localStore.removeAll();
    		this.localStore.sync();
    	}
    	else
    	{
    		PiClim.app.user = {};
    		PiClim.app.user.login = object.login;
    		PiClim.app.user.email = object.email;
    		PiClim.app.user.fullname = object.fullname;

    		this.localStore.removeAll();
    		if (object.remember_token)
    		{
    			this.localStore.add({url: PiClim.app.url, login: object.login, remember_token: object.remember_token});
    		}
    		this.localStore.sync();
    		
    		this._userLoginSuccess(object.fullname);
    	}
    },
    _userLoginFail: function()
    {
    	this.getMain().unmask();

		this.localStore.removeAll();
		this.localStore.sync();

    	Ext.Msg.alert(I18n.MAIN_USER_LOGINPANEL_CONNECT_FAILURE_TITLE, I18n.MAIN_USER_LOGINPANEL_CONNECT_FAILURE_TEXT);
    },
    
    onDisconnect: function()
    {
    	this.getMain().getTabBar().getItems().get(4).hide();
    	this.getMain().getTabBar().getItems().get(5).hide();
    	this.getMain().getTabBar().getItems().get(6).hide();
    	this.getMain().getTabBar().getItems().get(0).show();
   		this.getMain().getTabBar().getItems().get(PiClim.app.isWeb ? 3 : 1).show();
    	this.getMain().setActiveItem(0);

    	this.localStore.removeAll();
		this.localStore.sync();

    	this.getMain().setMasked({xtype: 'loadmask', message: I18n.MAIN_SERVER_CONNECT2_DISCONNECTING});

    	Ext.Ajax.request({
    	    url: PiClim.app.url + "/service/disconnect.php",
    	    success: Ext.bind(this._userDisconnectCb, this),
    	    failure: Ext.bind(this._userDisconnectFail, this)
    	});
    },
    _userDisconnectCb: function(response)
    {
    	this.getMain().unmask();
    },
    _userDisconnectFail: function()
    {
    	this.getMain().unmask();
    	
    	Ext.Msg.alert(I18n.MAIN_SERVER_CONNECT2_FAILURE_TITLE, I18n.MAIN_SERVER_CONNECT2_FAILURE_TEXT);
    },
    
    onUpdate: function()
    {
    	this.getMain().setMasked({xtype: 'loadmask', message: I18n.MAIN_SETTINGS_OPTIONS_UPDATING});

    	Ext.Ajax.request({
    	    url: PiClim.app.url + "/service/update.php",
    	    success: Ext.bind(this._updateCb, this),
    	    failure: Ext.bind(this._updateFail, this)
    	});
    },
    _updateCb: function(response)
    {
    	this.getMain().unmask();
    	
    	this._authenticationFailureTest(response);
    	var object = Ext.decode(response.responseText);
    	if (object.result)
    	{
    		Ext.Msg.alert(I18n.MAIN_SETTINGS_OPTIONS_UPDATE_SUCCESS_TITLE, I18n.MAIN_SETTINGS_OPTIONS_UPDATE_SUCCESS_TEXT, this._reload, this);
    	}
    	else
    	{
        	Ext.Msg.alert(I18n.MAIN_SETTINGS_OPTIONS_UPDATE_FAILURE2_TITLE, I18n.MAIN_SETTINGS_OPTIONS_UPDATE_FAILURE2_TEXT);
    	}
    },
    _reload: function()
    {
		// Compute new url
		var href = window.location.href;

		var i1 = href.indexOf('?');
		if (i1 >= 0)
		{
			href = href.substring(0, i1);
		}

		var i2 = href.indexOf('#');
		if (i2 >= 0)
		{
			href = href.substring(0, i2);
		}

		var i3 = href.indexOf(';');
		if (i3 >= 0)
		{
			href = href.substring(0, i3);
		}
		
		// open new url
		window.location.href = href + "?" + "&foo=" + Math.random();		
    },
    _updateFail: function()
    {
    	this.getMain().unmask();
    	
    	Ext.Msg.alert(I18n.MAIN_SETTINGS_OPTIONS_UPDATE_FAILURE_TITLE, I18n.MAIN_SETTINGS_OPTIONS_UPDATE_FAILURE_TEXT);
    },
    _authenticationFailureTest: function(response)
    {
    	var object = Ext.decode(response.responseText);
    	if (object.failure)
    	{
        	Ext.Msg.alert(I18n.MAIN_AUTHENTICATION_FAILURE_TITLE, I18n.MAIN_AUTHENTICATION_FAILURE_TEXT, this._reload, this);
        	throw "Authentication failure"; 
    	}
    }
});
