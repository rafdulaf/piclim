<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text"/>

    <xsl:param name="definition">1</xsl:param>

    <xsl:template match="/rrd">
	        <xsl:variable name="step" select="step"/>
	        <xsl:variable name="lastupdate" select="lastupdate"/>
	        
<xsl:text>{ 
    "data": [
</xsl:text>
            
                <xsl:for-each select="rra[pdp_per_row = $definition and not(preceding-sibling::rra[pdp_per_row = $definition])]">
        	        <xsl:variable name="nbRow" select="count(database/row)"/>
                
                    <xsl:for-each select="database/row">
	                    <xsl:variable name="position" select="position()"/>
	                    
	                    <xsl:text>        {
	</xsl:text>                    
	                        <xsl:variable name="date" select="$lastupdate - ($nbRow - $position)*$step"/>
	<xsl:text/>           "date": <xsl:value-of select="floor($date div 10)*10"/>,
	<xsl:text/>
		                    <xsl:for-each select="/rrd/rra[pdp_per_row = $definition]">
		                        <xsl:variable name="cf" select="cf"/>
		                        <xsl:variable name="last1" select="position() = last()"/>
		                        
		                        <xsl:for-each select="database/row[position() = $position]/v">
		                            <xsl:variable name="num" select="position()"/>
	                                <xsl:variable name="last2" select="position() = last()"/>
	
	<xsl:text/>           "<xsl:value-of select="$cf"/>-<xsl:value-of select="normalize-space(/rrd/ds[position() = $num]/name)"/>": <xsl:value-of select="."/><xsl:if test="not($last1 and $last2)">,</xsl:if><xsl:text>
	</xsl:text>                   
		                        </xsl:for-each>    
		                    </xsl:for-each>
	<xsl:text/>        }<xsl:if test="position() != last()">,</xsl:if><xsl:text>
	</xsl:text>
	               </xsl:for-each>
                </xsl:for-each>
<xsl:text/>    ]
}
    </xsl:template>

</xsl:stylesheet>
