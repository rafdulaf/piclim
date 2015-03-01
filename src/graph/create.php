<?php


"rrdtool create temperatures.rrd 
		--step 300 
		
		DS:temp_out:GAUGE:600:-273:60 
		DS:temp_in_1:GAUGE:600:-273:60 
		
		RRA:MIN:0.5:1:2016 
		RRA:AVERAGE:0.5:1:2016 
		RRA:MAX:0.5:1:2016 
				
		RRA:MIN:0.5:12:720 
		RRA:AVERAGE:0.5:12:720 
		RRA:MAX:0.5:12:720 
		
		RRA:MIN:0.5:288:1825 
		RRA:AVERAGE:0.5:288:1825 
		RRA:MAX:0.5:288:1825 
		;"

?>