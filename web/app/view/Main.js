Ext.define('PiClim.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.field.Password',
        'Ext.field.Checkbox',
        'Ext.Video',
        'Ext.dataview.List'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: I18n.MAIN_WELCOME_TITLE_SHORT,
                iconCls: 'home',
                name: 'home',

                styleHtmlContent: true,
                scrollable: null,

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
                iconCls: 'download',
                name: 'server',
                hidden: true,
                
                styleHtmlContent: true,
                scrollable: null,

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
                title: I18n.MAIN_USERADD_TITLE_SHORT,
                iconCls: 'user',
                name: 'firstuser',
                hidden: true,

                styleHtmlContent: true,
                scrollable: null,

        		layout: {
        			type: 'vbox',
        		},
        		
                items: [
                    {
                    	docked: 'top',
                    	xtype: 'titlebar',
                    	title: I18n.MAIN_USERADD_TITLE_LONG
                	},
                	{
                		xtype: 'component',
                		html: I18n.MAIN_USERADD_TEXT
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
                		        	title: I18n.MAIN_USERADD_CREATIONPANEL_TITLE
                		        },
                		        {
                		        	xtype: 'textfield',
                		        	label: I18n.MAIN_USERADD_CREATIONPANEL_LOGIN_LABEL,
                		        	placeHolder: I18n.MAIN_USERADD_CREATIONPANEL_LOGIN_HOLDER,
                		        	name: 'login'
                		        },
                		        {
                		        	xtype: 'passwordfield',
                		        	label: I18n.MAIN_USERADD_CREATIONPANEL_PASSWORD_LABEL,
                		        	placeHolder: I18n.MAIN_USERADD_CREATIONPANEL_PASSWORD_HOLDER,
                		        	name: 'password'
                		        },
                		        {
                		        	xtype: 'passwordfield',
                		        	label: I18n.MAIN_USERADD_CREATIONPANEL_CONFIRMPASSWORD_LABEL,
                		        	placeHolder: I18n.MAIN_USERADD_CREATIONPANEL_CONFIRMPASSWORD_HOLDER,
                		        	name: 'confirmpassword'
                		        },
                		        {
                		        	xtype: 'textfield',
                		        	label: I18n.MAIN_USERADD_CREATIONPANEL_FULLNAME_LABEL,
                		        	placeHolder: I18n.MAIN_USERADD_CREATIONPANEL_FULLNAME_HOLDER,
                		        	name: 'fullname'
                		        },
                		        {
                		        	xtype: 'textfield',
                		        	label: I18n.MAIN_USERADD_CREATIONPANEL_EMAIL_LABEL,
                		        	placeHolder: I18n.MAIN_USERADD_CREATIONPANEL_EMAIL_HOLDER,
                		        	name: 'email'
                		        },
                		        {
                		        	xtype: 'component',
                		        	height: 10
                		        },
                		        {
                		        	xtype: 'button',
                		        	text: I18n.MAIN_USERADD_CREATIONPANEL_CREATE_LABEL,
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
                hidden: true,

                styleHtmlContent: true,
                scrollable: null,

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
                		        	name: 'login'
                		        },
                		        {
                		        	xtype: 'passwordfield',
                		        	label: I18n.MAIN_USER_LOGINPANEL_PASSWORD_LABEL,
                		        	placeHolder: I18n.MAIN_USER_LOGINPANEL_PASSWORD_HOLDER,
                		        	name: 'password'
                		        },
                		        {
                		        	xtype: 'checkboxfield',
                		        	label: I18n.MAIN_USER_LOGINPANEL_REMEMBER_LABEL,
                		        	name: 'remember'
                		        },
                		        {
                		        	xtype: 'component',
                		        	height: 10
                		        },
                		        {
                		        	xtype: 'button',
                		        	text: I18n.MAIN_USER_LOGINPANEL_LOGIN_LABEL,
                		        	disabled: true
                		        }
                		]
                	}
                ]
            },

            {
                title: I18n.MAIN_WELCOME_TITLE_SHORT,
                iconCls: 'home',
                name: 'home2',
                hidden: true,

                styleHtmlContent: true,
                scrollable: null,

        		layout: {
        			type: 'vbox'
        		},
        		
                items: [
                    {
                    	docked: 'top',
                    	xtype: 'titlebar',
                    	title: "",
                    	name: "title",
                    	items: [ 
                        	    {
                        	    	iconCls: 'delete',
                        	    	align: 'right',
                        	    	name: 'delete'
                        	    }
                        ]
                	},
                	{
                		xtype: 'component',
                		html: I18n.MAIN_WELCOME_TEXT
                	}
                ]
            },

            {
                title: I18n.MAIN_TEMPERATURES_TITLE_SHORT,
                iconCls: 'home',
                name: 'temperatures',
                hidden: true,

                styleHtmlContent: true,
                scrollable: null,

                layout: {
                    type: 'vbox'
                },
                
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: I18n.MAIN_TEMPERATURES_TITLE_LONG
                    },
                    {
                        xtype: 'component',
                        html: I18n.MAIN_TEMPERATURES_TEXT
                    },
                    {
                        xtype: 'chart',
                        flex: 1,
                        store: {
                            fields: ['time', 'open', 'high', 'low', 'close'],
                            proxy: {
                                type: "ajax",
                                url : "service/rrd.php",
                                reader: {
                                    type: "json",
                                    rootProperty: "data"
                                }
                            },
                            autoLoad: true
                        },
                        axes: [
                            {
                                type: 'numeric',
                                position: 'left',
                                fields: ['open', 'high', 'low', 'close'],
                                title: {
                                    text: I18n.MAIN_TEMPERATURES_AXE_TEMP,
                                    fontSize: 15
                                },
                                grid: true,
                                minimum: -10,
                                maximum: 40
                            }, 
                            {
                                type: 'time',
                                position: 'bottom',
                                fields: ['time'],
                                fromDate: Ext.Date.add(new Date(), Ext.Date.DAY, -7),
                                toDate: new Date(),
                                title: {
                                    text: I18n.MAIN_TEMPERATURES_AXE_TIME,
                                    fontSize: 15
                                },
                                grid: true,
                                style: {
                                    axisLine: true
                                }
                            }
                        ],
                        series: [{
                            type: 'candlestick',
                            xField: 'time',
                            openField: 'open',
                            highField: 'high',
                            lowField: 'low',
                            closeField: 'close',
                            style: {
                                ohlcType: 'ohlc',
                                dropStyle: {
                                    fill: 'rgb(237, 123, 43)',
                                    stroke: 'rgb(237, 123, 43)'
                                },
                                raiseStyle: {
                                    fill: 'rgb(55, 153, 19)',
                                    stroke: 'rgb(55, 153, 19)'
                                }
                            },
                            aggregator: {
                                strategy: 'time'
                            }
                        }]
                    }
                ]
            },
            
            {
                title: I18n.MAIN_USERS_TITLE_SHORT,
                iconCls: 'user',
                name: 'users',
                hidden: true,

                styleHtmlContent: true,
                scrollable: null,

        		layout: {
        			type: 'vbox'
        		},

        		items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: I18n.MAIN_USERS_TITLE_LONG
                    },
                    {
                        xtype: 'component',
                        html: I18n.MAIN_USERS_TEXT
                    },
                	{
                		flex: 1,
                		xtype: 'container',
                		layout: {
                			type: 'vbox',
                			align: 'center',
                			pack: 'center'
                		},
                		height: '80%',
                		
                		defaults: {
                			maxWidth: '720px',
                			width: '100%'
                		},

                		items: [
                		        {
                		        	xtype: 'titlebar',
                		        	title: I18n.MAIN_USERS_LIST_HEADER
                		        },
                		        {
                		        	xtype: 'list',
                		        	store: {
                		        		autoLoad: true,
                		        		model: 'PiClim.model.User',
                		        		proxy: {
                		        			type: 'ajax',
                		                    url: 'service/users_list.php',
                		        			reader: {
                		        				type: "json",
                		        				rootProperty: "users"
                		        			}
                		        		}
                		        	},
                		        	flex: 1,
                		        	itemTpl: '{fullname} - {email} ({login})'
                		        }
                		]
                    }
                ]
            },
            
            {
                title: I18n.MAIN_SETTINGS_TITLE_SHORT,
                iconCls: 'settings',
                name: 'settings',
                hidden: true,

                styleHtmlContent: true,
                scrollable: null,

        		layout: {
        			type: 'vbox',
        		},

        		items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: I18n.MAIN_SETTINGS_TITLE_LONG
                    },
                    {
                        xtype: 'component',
                        html: I18n.MAIN_SETTINGS_TEXT
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
                		        	title: I18n.MAIN_SETTINGS_OPTIONS_TITLE
                		        },
                		        {
                		        	xtype: 'button',
                		        	name: 'update',
                		        	text: I18n.MAIN_SETTINGS_OPTIONS_UPDATE_TITLE,
                		        }
                		]
                	}
                ]
            }

        ]
    }
});
