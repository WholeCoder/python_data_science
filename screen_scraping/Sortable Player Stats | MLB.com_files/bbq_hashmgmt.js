function updateBbqHash(paramsObj,spl) {
	var url_frag = $.deparam.fragment();
	var key;
	var potentially_invalid = url_frag;
	for (key in paramsObj) {
		potentially_invalid[key] = paramsObj[key];
	}
	var app;
	if (spl) {
		window.sortablePlayerList = spl;
	} 
	var d = new Date();
	var now = d.getTime();
	var timestamp = now;
		potentially_invalid.ts = timestamp;
	$.bbq.pushState(potentially_invalid);
}

function getBbqVal(key) {
	var value = "";
	var url_hash = $.deparam.fragment();
	if (typeof(url_hash[key]) !== "undefined") {
		value = url_hash[key];
	}
	return value;
}

function config_mgmt() {
	var passed_cfg = {};
	var default_cfg = {
		sectionType:      'sp',
    	playerType:       'QUALIFIER',
    	statType:         'hitting',
		page_type:        'SortablePlayer',
    	season:           window.current_season,
		season_type:      'ANY',
    	sportCode:        "'mlb'",
    	league_code:       "'MLB'",
		split:			  '',
		team_id:          window.team_id,
		active_sw:        "",
    	game_type:        "'"+window.current_game_type+"'",
    	position:         "",
    	sortOrder:        "'desc'",
    	sortColumn:       'avg',
		results:          '',
    	page:             1,
    	perPage:          50,
		timeframe:        '',
		extended:         0,
		last_x_days:      ''
	};
	var init_sort = {
			hitting : {
				sortOrder : "'desc'",
				sortColumn : "avg"
			},
			pitching : {
				sortOrder : "'asc'",
				sortColumn : "era"
			},
			fielding : {
				sortOrder : "'desc'",
				sortColumn : "fpct"
			}
		};
	var so,j,arg;
	var default_asc = ["whip","era","bb9","h9","pip"];
	var quoted_arguments = ["sportCode","league_code","game_type","sortOrder"];

		if (window.location.hash !== "") {
			passed_cfg = $.deparam.fragment();

			so = passed_cfg.statType;
			if (!so) {
				so = "hitting";
			}
			if (!passed_cfg.sortColumn) {
				passed_cfg.sortColumn = init_sort[so].sortColumn;
			}
			if ((window.team_id) && (!passed_cfg.playerType)) {
				passed_cfg.playerType = "ALL";
			}
			if (!passed_cfg.sortOrder) {
				if (($.inArray(passed_cfg.sortColumn,default_asc) > -1) || ((passed_cfg.sortColumn === "avg") && (passed_cfg.statType === "pitching"))) {
					passed_cfg.sortOrder = "'asc'";
				} else {
					passed_cfg.sortOrder = "'desc'";
				}
			} 
			for (j=0;j<quoted_arguments.length;j++) {
				arg = quoted_arguments[j];
				if ((typeof(passed_cfg[arg]) !== "undefined") && !(/^\'.*\'$/.test(passed_cfg[arg])) ) {
					passed_cfg[arg] = "'"+passed_cfg[arg]+"'";
				}
			}
			default_cfg = $.extend(default_cfg,passed_cfg);
		}
		if ((window.team_id) && (!passed_cfg.playerType)) {
			default_cfg.playerType = "ALL";
		}
		return default_cfg;

}

var sortablePlayerList;

$(window).bind( 'hashchange', function(e,silent) { 
   if (!silent) {
			var new_cfg = config_mgmt();
			window.sortablePlayerList = new bam.stats.app.SortablePlayerList(new_cfg);
			window.sortablePlayerList.setWidgetDependencies(new_cfg,true);
			window.sortablePlayerList.load();
		$("#reset_link a").unbind().bind("click",function() {
			window.sortablePlayerList = null;
			var default_cfg = config_mgmt();
			updateBbqHash(default_cfg);
		});
	}
	
  });
