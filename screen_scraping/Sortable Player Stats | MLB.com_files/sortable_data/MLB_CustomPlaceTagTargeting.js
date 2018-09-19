//***************************************************************
// This class is part of the Sizmek Custom Placement Tag Script 
// ALL RIGHTS RESERVED TO © 2017 Sizmek.
//***************************************************************
//***************************************************************	

(function() {	

	// Establish Reference to Script Name
	var sn = 'MLB_CustomPlaceTagTargeting.js';
	// Determine whether site is using Secure Protocol
	var proto = ('https:' == document.location.protocol ? 'https://' : 'http://');

	var mode = "write";

	// Grab data from query string
	var queries = idParser(sn);

	var mapping = [];
	mapping.push({k : "angels", v: "ana"});
	mapping.push({k : "dbacks", v: "ari"});
	mapping.push({k : "braves", v: "atl"});
	mapping.push({k : "orioles", v: "bal"});
	mapping.push({k : "redsox", v: "bos"});
	mapping.push({k : "cubs", v: "chc"});
	mapping.push({k : "reds", v: "cin"});
	mapping.push({k : "indians", v: "cle"});
	mapping.push({k : "rockies", v: "col"});
	mapping.push({k : "whitesox", v: "cws"});
	mapping.push({k : "tigers", v: "det"});
	mapping.push({k : "astros", v: "hou"});
	mapping.push({k : "royals", v: "kc"});
	mapping.push({k : "dodgers", v: "la"});
	mapping.push({k : "marlins", v: "mia"});
	mapping.push({k : "twins", v: "min"});
	mapping.push({k : "mets", v: "nym"});
	mapping.push({k : "yankees", v: "nyy"});
	mapping.push({k : "athletics", v: "oak"});
	mapping.push({k : "phillies", v: "phi"});
	mapping.push({k : "pirates", v: "pit"});
	mapping.push({k : "padres", v: "sd"});
	mapping.push({k : "mariners", v: "sea"});
	mapping.push({k : "giants", v: "sf"});
	mapping.push({k : "cardinals", v: "stl"});
	mapping.push({k : "rays", v: "tb"});
	mapping.push({k : "rangers", v: "tex"});
	mapping.push({k : "nationals", v: "was"});

	var tag = queries[0];
	var ele = queries[1];

	var tagParams = tag.split('&');
	for(var i = 0; i < tagParams.length; i++){
		if(tagParams[i].indexOf("=") > -1){	
			var param = tagParams[i].split("=");
			if(param[0] == "kw"){
				var found = false;
				for(var m = 0; m < mapping.length; m++){
					if(param[1].indexOf(mapping[m].k) > -1){
						tag = tag.replace(param[1],mapping[m].v);
						found = true;
						break;
					}
				}
				if(found){break;}
			}
		}
	}

	fireTag();

	function fireTag(){
		if (mode === "append"){
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src", proto + tag);
			script.setAttribute("style", "border: 0px; padding: 0px; margin: 0px;");

			if(ele.nextSibling == null){
				ele.parentNode.appendChild(script);
			} else {
				ele.parentNode.insertBefore(script, ele.nextSibling);
			}
		} else {	// write
			document.write('<scr' + 'ipt src="'+proto+tag+'"></scr'+'ipt>');
		}
	}
			
	// Handle Query String Properties
	function idParser(_fileName) {
	    // Create Array to hold Matching Script Tags 
	    var path = [];
	    // Create Array to hold parent Node
	    var scriptEle, parentEle;
	    // Save Reference to any scripts on page
	    var scripts = document.getElementsByTagName("script");		    
	    	    
	    // Loop through scripts
	    for (var i = 0; i < scripts.length; i++) {
	        // Save Reference to current Script
	        var script = scripts[i];		        
	        // Check for filename match
	        if (script.src && script.src.toLowerCase().match(_fileName.toLowerCase())) {
	            // Save Reference to Script source
				path.push(unescape(script.src));  
				// Save Reference to parent node
				scriptEle = script;
				parentEle = script.parentNode;         
	        }
	    }
	    
	    var x = path.length-1;
	    
	    // Create New Array
	    var q = [];	    
	    
    	// Split off parameters
    	var params = path[x].split(sn + '?')[1];
    	
    	// Push placement tag value from Query String
    	q.push(params.split('pltag=')[1]);
    	// Push parent node id
    	q.push(scriptEle);
    	q.push(parentEle);
    	
	    // Return Array With Query String Parameters
	    return q;
	 }
     
}());


