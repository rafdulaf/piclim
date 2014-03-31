Ext.define('PiClim.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: I18n.MAIN_WELCOME_TITLE_SHORT,
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: false,

        		layout: {
        			type: 'vbox',
        		},
        		
                items: [
                    {
                    	docked: 'top',
                    	xtype: 'titlebar',
                    	title: I18n.MAIN_WELCOME_TITLE_LONG
                	},
                	{
                		xtype: 'component',
                		html: I18n.MAIN_WELCOME_TEXT
                	}
                ],

            },
            
            {
                title: I18n.MAIN_SERVER_TITLE_SHORT,
                iconCls: 'server',
                name: 'server',

                styleHtmlContent: true,
                scrollable: false,

        		layout: {
        			type: 'vbox',
        		},
        		
                items: [
                    {
                    	docked: 'top',
                    	xtype: 'titlebar',
                    	title: I18n.MAIN_SERVER_TITLE_LONG
                	},
                	{
                		xtype: 'component',
                		html: I18n.MAIN_SERVER_TEXT
                	},
                	{
                		flex: 1,
                		xtype: 'container',
                		layout: {
                			type: 'vbox',
                			align: 'center',
                			pack: 'center'
                		},
                		
                		defaults: {
                			maxWidth: '720px',
                			width: '100%'
                		},

                		items: [
                		        {
                		        	xtype: 'titlebar',
                		        	title: I18n.MAIN_SERVER_LOGINPANEL_TITLE
                		        },
                		        {
                		        	xtype: 'textfield',
                		        	label: I18n.MAIN_SERVER_LOGINPANEL_SERVERNAME_LABEL,
                		        	placeHolder: I18n.MAIN_SERVER_LOGINPANEL_SERVERNAME_HOLDER,
                		        	autoComplete: true,
                		        	name: 'url'
                		        },
                		        {
                		        	xtype: 'component',
                		        	height: 10
                		        },
                		        {
                		        	xtype: 'button',
                		        	text: I18n.MAIN_SERVER_LOGINPANEL_CONNECT_LABEL,
                		        	disabled: true
                		        }
                		]
                	}
                ],

            },

            {
                title: I18n.MAIN_USER_TITLE_SHORT,
                iconCls: 'user',
                name: 'user',
                disabled: true,

                styleHtmlContent: true,
                scrollable: false,

        		layout: {
        			type: 'vbox',
        		},
        		
                items: [
                    {
                    	docked: 'top',
                    	xtype: 'titlebar',
                    	title: I18n.MAIN_USER_TITLE_LONG
                	},
                	{
                		xtype: 'component',
                		html: I18n.MAIN_USER_TEXT
                	},
                	{
                		flex: 1,
                		xtype: 'container',
                		layout: {
                			type: 'vbox',
                			align: 'center',
                			pack: 'center'
                		},
                		
                		defaults: {
                			maxWidth: '720px',
                			width: '100%'
                		},

                		items: [
                		        {
                		        	xtype: 'titlebar',
                		        	title: I18n.MAIN_USER_LOGINPANEL_TITLE
                		        },
                		        {
                		        	xtype: 'textfield',
                		        	label: I18n.MAIN_USER_LOGINPANEL_LOGIN_LABEL,
                		        	placeHolder: I18n.MAIN_USER_LOGINPANEL_LOGIN_HOLDER,
                		        	autoComplete: true,
                		        	name: 'login'
                		        },
                		        {
                		        	xtype: 'passwordfield',
                		        	label: I18n.MAIN_USER_LOGINPANEL_PASSWORD_LABEL,
                		        	placeHolder: I18n.MAIN_USER_LOGINPANEL_PASSWORD_HOLDER,
                		        	autoComplete: true,
                		        	name: 'password'
                		        },
                		        {
                		        	xtype: 'component',
                		        	height: 10
                		        },
                		        {
                		        	xtype: 'button',
                		        	text: I18n.MAIN_USER_LOGINPANEL_CONNECT_LABEL,
                		        	disabled: true
                		        }
                		]
                	}
                ],

            },
            
            {
                title: 'Settings',
                iconCls: 'settings',
                hidden: true,

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }
        ]
    }
});
