<?xml version="1.0" encoding="UTF-8"?>
<!--
   Copyright 2010 Anyware Services

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   -->
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:exslt="http://exslt.org/common" 
    xmlns:i18n="http://apache.org/cocoon/i18n/2.1">
    
    <xsl:param name="login-failed"/>
    
    <xsl:param name="contextPath"/>
    <xsl:param name="workspaceName"/>
    <xsl:param name="workspaceURI"/>
    
    <xsl:variable name="workspace-resources" select="concat($contextPath, $workspaceURI, '/resources')"/>
    
    <xsl:template match="/">
    	<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<meta http-equiv="X-UA-Compatible" content="IE=8" />
				<title><i18n:text i18n:catalogue="application" i18n:key="APPLICATION_PRODUCT_LABEL"/><i18n:text i18n:key="WORKSPACE_CMS_LOGIN_LABEL"/></title>
				
				<link rel="icon" type="image/gif" href="{$contextPath}/kernel/resources/img/runtime_favico.gif" />
        		<link rel="shortcut icon" type="image/x-icon" href="{$contextPath}/kernel/resources/img/runtime_favico.ico" />
        		
				<style type="text/css" media="screen">
					body {background: url("<xsl:value-of select="$contextPath"/>/kernel/resources/img/Ametys/common/bg.jpg") repeat-x left top #033059; font-family: "Verdana",Arial,Helvetica,sans-serif; font-size: 76%; color: #000; }
		      		
		      		.bdx-top {font-family: "Arial"; height: 142px; margin-left: auto; margin-right: auto; overflow: hidden; width: 660px;}
		      		.bdx-top h1 {color: #812281; font-size: 2.5em; padding-top: 40px; margin-left: 190px; }
		      		
		      		.form-connection {width: 500px; height: 360px; margin-right: auto; margin-left: auto; margin-top: 80px; padding: 15px 40px 15px 40px; } 
		      		.form-connection p {text-align: center; margin-bottom: 20px}
		      		.form-connection .input {clear: left; margin-bottom: 10px;}
		      		.form-connection .input label {float: left; width: 120px;}
		      		.form-connection .button {text-align: center}
		      		.form-connection .error {color: #9f0000; font-style:italic;}
		      		.form-connection .transp {z-index: -1; background-color: #FFF; filter:alpha(opacity=30); opacity: 0.3; position: absolute; width: 340px; margin-top: 1px; margin-left: 80px; height: 185px}
		      		.form-connection form {color: #333; font-size: 0.9em; width: 300px; height: 145px; padding: 20px; margin-right: auto; margin-left: auto; border: 1px solid #666; }
		      		.form-connection form input.text {color: #333; font-size: 1em; width: 150px}
		      		.form-connection form input.button {color: #333; font-size: 1em; }
		       	 </style> 
		       	 
		       	 <xsl:comment>[if IE 7]&gt;
		       	 	&lt;style media="screen"&gt;.transp {margin-left: 0px !important;}&lt;/style&gt;
		       	 &lt;![endif]</xsl:comment>
    		</head>
    		
    		<body onload="document.getElementById('Username').focus();">
    			<div class="bdx-top">
					<div class="logo">
						<img src="{$contextPath}/kernel/resources/img/Ametys/common/logo.png" width="150px" height="124px" style="float:left" alt=""/>
						<h1><i18n:text i18n:key="WORKSPACE_CMS_LOGIN_WELCOME"/><i18n:text i18n:catalogue="application" i18n:key="APPLICATION_PRODUCT_LABEL"/></h1>
					</div>
				</div>
				
    			<div id="form-connection" class="form-connection">
    				<p><i18n:text i18n:key="WORKSPACE_CMS_LOGIN_HINT"/></p>
        			<div class="transp"></div>
        			<form method="post" action="">
        				<div class="input">
	        				<label for="Username"><i18n:text i18n:key="WORKSPACE_CMS_LOGIN_USERNAME"/></label>
		    				<input class="text" type="text" name="Username" id="Username"/>
		    			</div>
	    				<div class="input">
		    				<label for="Password"><i18n:text i18n:key="WORKSPACE_CMS_LOGIN_PASSWORD"/></label>
		    				<input class="text" type="password" name="Password" id="Password"/>
		    			</div>
		    			<xsl:if test="$login-failed = 'true'"><span class="error"><i18n:text i18n:key="WORKSPACE_CMS_LOGIN_FAILED"/></span><br/><br/></xsl:if>
	    				<input type="checkbox" name="rememberMe" id="rememberMe" value="true"/><label for="rememberMe"><i18n:text i18n:key="WORKSPACE_CMS_LOGIN_REMEMBER_ME"/></label>
	    				<br style="clear: left"/><br/>
	    				
	    				<div class="button">
	    					<input type="submit" class="button" value="WORKSPACE_CMS_LOGIN_CONNECT" i18n:attr="value"/>
	    				</div>
	    			</form>
        		</div>
    		</body>
    	</html>
    </xsl:template>
</xsl:stylesheet>