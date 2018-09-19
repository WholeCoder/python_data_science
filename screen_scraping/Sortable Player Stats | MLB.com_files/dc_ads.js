// Doubleclick's Google Publisher Tag (GPT)
window.gptadslots = window.gptadslots || {};
window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];

window.googletag.cmd.push(function() {
    window.googletag.pubads().enableAsyncRendering();
    window.googletag.pubads().collapseEmptyDivs();
});

if (!window.googletag.apiReady) {
    (function(){ var gads = document.createElement('script');
        gads.async = true; gads.type = 'text/javascript';
        var useSSL = 'https:' == document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);
    })();
}

var dc_tiles = {},
    dc_numads = 0,
    c_domain = {
        "mlb": "mlb",
        "ana": "angels",
        "ari": "dbacks",
        "atl": "braves",
        "bal": "orioles",
        "bos": "redsox",
        "chc": "cubs",
        "cin": "reds",
        "cle": "indians",
        "col": "rockies",
        "cws": "whitesox",
        "det": "tigers",
        "hou": "astros",
        "kc": "royals",
        "la": "dodgers",
        "mia": "marlins",
        "mil": "brewers",
        "min": "twins",
        "mon": "expos",
        "nym": "mets",
        "nyy": "yankees",
        "oak": "athletics",
        "phi": "phillies",
        "pit": "pirates",
        "sd": "padres",
        "sea": "mariners",
        "sf": "giants",
        "stl": "cardinals",
        "tb": "rays",
        "tex": "rangers",
        "tor": "bluejays",
        "was": "nationals"
    };

if (!window.page_id) {
    var page_id = "";
}

if (!window.dc_lang) {
    var dc_lang = "en";
}

function getQueryParam(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results) { return ""; }
    return results[1] || "";
}

/**
 * Criteo retargeting
 * loads an async script that populates a global var from a cookie.
 * this var is passed in the key/vals of ad calls
 */
var crtg_nid        = '3665';
var crtg_cookiename = 'crtg_mlb';
var crtg_varname    = 'crtg_content';
var crtg_rnd        = Math.floor(Math.random()*99999999999);
function crtg_getCookie(c_name){
    var i,x,y,ARRCookies=document.cookie.split(";");
    for(i=0;i<ARRCookies.length;i++){
        x=ARRCookies[i].substr(0,ARRCookies[i].indexOf("="));
        y=ARRCookies[i].substr(ARRCookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if(x==c_name){
            return unescape(y);
        }
    }
    return '';
}

var crtg_content = crtg_getCookie(crtg_cookiename);
var enableCriteo = getQueryParam('criteo') || true;

if (enableCriteo) {
    (function(){
        var crtg_url =  location.protocol+'//rtax.criteo.com/delivery/rta/rta.js?netId='+escape(crtg_nid);
            crtg_url += '&cookieName='+escape(crtg_cookiename);
            crtg_url += '&rnd='+crtg_rnd;
            crtg_url += '&varName=' + escape(crtg_varname);
        var crtg_script       = document.createElement('script');
            crtg_script.type  = 'text/javascript';
            crtg_script.src   = crtg_url;
            crtg_script.async = true;
        if(document.getElementsByTagName("head").length>0) {
            document.getElementsByTagName("head")[0].appendChild(crtg_script);
        } else if(document.getElementsByTagName("body").length>0) {
            document.getElementsByTagName("body")[0].appendChild(crtg_script);
        }
    })();
}

if (crtg_content) {
    var crtg_targeting = crtg_content.split(";");

    window.googletag.cmd.push(function() {
        for (var x = 0; x < crtg_targeting.length; x++) {
            var crtg_key = crtg_targeting[x].substr(0, crtg_targeting[x].indexOf("="));
            var crtg_val = crtg_targeting[x].substr(crtg_targeting[x].indexOf("=") + 1);
            window.googletag.pubads().setTargeting(crtg_key, crtg_val);
        }
    });
}

if (getQueryParam('adtest')) {
    window.googletag.cmd.push(function() {
        window.googletag.pubads().setTargeting('adtest', getQueryParam('adtest'));
    });
}

if (window.content_id) {
    window.googletag.cmd.push(function() {
        window.googletag.pubads().setTargeting('contentid', window.content_id);
    });
}

if (typeof GD_SETTINGS !== "undefined" && GD_SETTINGS.gamestate === "preview") { var preview_pageid = true; }

var pageid_val;
if (window.page_id || window.pageid || preview_pageid) {
    if (preview_pageid) {
        pageid_val = "preview";
    } else {
        pageid_val = (window.page_id) ? window.page_id : window.pageid;
    }

    window.googletag.cmd.push(function() {
        window.googletag.pubads().setTargeting("page_id", pageid_val);
    });
}

if (window.dc_keyVal) {
    var dc_targeting = dc_keyVal.split(";");

    window.googletag.cmd.push(function() {
        for (var x = 0; x < dc_targeting.length; x++) {
            var dc_key = dc_targeting[i].substr(0, dc_targeting[i].indexOf("="));
            var dc_val = dc_targeting[i].substr(dc_targeting[i].indexOf("=") + 1);
            window.googletag.pubads().setTargeting(dc_key, dc_val);
        }
    });
}

window.googletag.cmd.push(function() {
    window.googletag.enableServices();
});

/**
 * Legacy writeAd function, forwards to writeAds
 * @param w Width of ad
 * @param h Height of ad
 * @param p Position - deprecated
 * @param adunit Ad Unit
 */
function writeAd(w, h, p, adunit) {
    var dc_size = w + "x" + h;
    var ad_config = { sizes: [dc_size] };
    if (adunit) {
        ad_config.adunit = adunit;
    }

    writeAds(ad_config);
}

function writeIstAd(w, h, writeAd) {
    var dc_size = w + "x" + h;
    var ad_config = { sizes: [dc_size] };
    if (!writeAd) {
        ad_config.customparams = { "dcopt" : "ist" };
    }

    writeAds(ad_config);
}

/*
 * Writes DC ad as either an embedded script or an iframe, depending on the internal, hard-wired switch.
 * @param options object
 * Multiple ad sizes can be passed in, like so:
 * writeAds({sizes: ["300x250","300x150"]})
 */
function writeAds(options, slot_id) {
    dc_numads++;

    if (window.Krux && window.Krux.user) {
        window.googletag.cmd.push(function() {
            window.googletag.pubads().setTargeting('kuid', window.Krux.user);
        });
    }

    if (window.Krux && window.Krux.segments) {
        window.googletag.cmd.push(function() {
            window.googletag.pubads().setTargeting('ksg', window.Krux.segments);
        });
    }

    var emailMatchRegEx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;
    var decodedQueryString = decodeURIComponent(window.location.search);
    if (emailMatchRegEx.test(decodedQueryString)) {
        return;
    }

    var pathArr = ["/2605"];

    var adUnitName = (options.domain || c_domain[window.club]) + ".mlb";
    if (dc_lang !== "en") { adUnitName = dc_lang + "." + adUnitName; }
    pathArr.push(adUnitName);

    var section = options.section || window.section || 'empty';
    pathArr.push(section);
    if (options.adunit) { pathArr.push(options.adunit); }

    if (window.deviceBootstrap) {
        var formFactor = window.deviceBootstrap().formFactor;
        var platform = window.deviceBootstrap().platform;
        var isMobile = ["tablet", "phone"].indexOf(formFactor) > -1;
        var isIosOrAndroid = ["ios", "android"].indexOf(platform) > -1;
        pathArr.push(formFactor);
        if (isMobile) { pathArr.push(isIosOrAndroid ? platform : "other"); }
    }

    var gpt_adUnitPath = pathArr.join("/");

    var gpt_randomId = "div-gpt-ad-" + Math.round(Math.random() * 100000000);
    var gpt_sizes = [];

    var default_size = options.sizes[0];

    for (var i = 0; i < options.sizes.length; i++) {
        var size = options.sizes[i];
        var size_w = parseInt(size.split("x")[0], 10);
        var size_h = parseInt(size.split("x")[1], 10);

        gpt_sizes.push([size_w, size_h]);

        dc_tiles[size] = dc_tiles[size] ? dc_tiles[size] + 1 : 1;
    }

    var slot_pos = dc_tiles[default_size];
    var slot_tile = dc_numads;

    if (slot_id) {
        gpt_randomId = slot_id;
    } else {
        document.write('<div id="' + gpt_randomId + '"></div>');
    }

    if (options.customparams && options.customparams.dcopt === 'ist') {

        window.googletag.cmd.push(function() {
            gptadslots[gpt_randomId] = window.googletag.defineOutOfPageSlot(gpt_adUnitPath, gpt_randomId);
        });

    } else {

        window.googletag.cmd.push(function() {
            gptadslots[gpt_randomId] = window.googletag.defineSlot(gpt_adUnitPath, gpt_sizes, gpt_randomId);
        });

    }

    window.googletag.cmd.push(function() {
        gptadslots[gpt_randomId].setTargeting('pos', [slot_pos]);
        gptadslots[gpt_randomId].setTargeting('tile', [slot_tile]);
        gptadslots[gpt_randomId].setTargeting('adunit', [section]);
    });

    if (window.bam && window.bam.vkey) {
        window.googletag.cmd.push(function() {
            gptadslots[gpt_randomId].setTargeting('vkey', [window.bam.vkey]);
        });
    }

    if (options.customparams) {
        window.googletag.cmd.push(function() {
            for (key in options.customparams) {
                gptadslots[gpt_randomId].setTargeting(key, options.customparams[key]);
            }
        });
    }

    window.googletag.cmd.push(function() {
        gptadslots[gpt_randomId].addService(window.googletag.pubads());
    });

    window.googletag.cmd.push(function() {
        window.googletag.display(gpt_randomId);
    });

}

// used to add 130x320 ad in on club sites in conjunction with interstitial 970x66
window.setSponsoredOverlay = function(options) {
    var sponsored_overlay = '<a href="/index.jsp">Click Me</a>';
    if ($('#background-overlay').length > 0) {
        $('#background-overlay').html(sponsored_overlay);
    } else {
        $('#masthead').before('<div id="background-overlay">' + sponsored_overlay + '</div>');
    }
    $img = $('<img border="0" alt="" class="png"/>').attr('src', options.creativeUrl);
    $a = $('<a target="_blank"></a>').attr('href', options.clickUrl).append($img);
    $('#background-overlay').html($a[0].outerHTML);
};

function setTakeover(skin) {
    var bgColor = skin.bgColor || '#000000';
    var bgImage = (skin.bgImage) ? 'url(' + skin.bgImage + ')' : 'none';
    var bgPosition = '';
    if (window.page_id === 'index' && window.section === 'homepage' && window.club !== 'mlb') {
        bgPosition = skin.bgPosition || 'center 27px';
    } else {
        bgPosition = skin.bgPosition || 'center top';
    }
    var bgRepeat = skin.bgRepeat || 'no-repeat';
    var bgAttachment = skin.bgAttachment || 'scroll';
    var $SKIN = (skin.skinElement) ? $(skin.skinElement) : $('body');
    var $HTML = $('html');

    $HTML.addClass('sponsored-takeover');

    $SKIN.css({
        'background-color': bgColor,
        'background-image': bgImage,
        'background-position': bgPosition,
        'background-repeat': bgRepeat,
        'background-attachment': bgAttachment
    });

    if (skin.clickHref) {
        var clickHref = skin.clickHref;
        var clickTarget = skin.clickTarget || '_blank';
        var clickHeight = skin.clickHeight || '900px';
        var clickTop = skin.clickTop || '0';
        if ($('#sponsored-takeover-link').length) {
            $('#sponsored-takeover-link').attr({
                'target': clickTarget,
                'href': clickHref
            }).css({
                'height': clickHeight,
                'top': clickTop
            });
        } else {
            $('<a></a>').attr({
                'id': 'sponsored-takeover-link',
                'target': clickTarget,
                'href': clickHref
            }).css({
                'display': 'block',
                'position': 'absolute',
                'width': '100%',
                'height': clickHeight,
                'top': clickTop
            }).prependTo($SKIN);
        }

    }

    setTimeout(function() {
        setRoadblock(window.roadblock);
    }, 1000);
}

function setRoadblock(takeover) {
    //3PI-110 - only add a roadblock if there isn't one on the page
    if ($('#club_tix').length) { return; }

    if (takeover && (window.club === takeover.club)) {
        var $tix_container = '<div id="club_tix"></div>';
        var $hp_container = $('#homepage_container');
        var $upcomingSeries = $('#upcoming-series');

        $hp_container.prepend($tix_container);

        var $club_tix  = $('#club_tix');
        var bgImage = takeover.bgImage;

        if ($( "html" ).hasClass( "sponsored-takeover" ) || $('#sponsored-takeover-link').length > 0){
            console.log('set roadblock firing');
            if (takeover.clickHref) {
                var clickHref   = takeover.clickHref;
                var clickTarget = takeover.clickTarget || '_blank';

                $('<a></a>').attr({
                    'id': 'sponsored-ticket-takeover-link',
                    'target': clickTarget,
                    'href': clickHref
                }).css({
                    'display': 'block',
                    'cursor': 'pointer',
                    'width': '100%',
                    'height': '115px',
                    'background-color': '#000000',
                    'background-image': 'url(' + bgImage + ')',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                    'margin': '0px auto',
                    'position': 'absolute',
                    'top': '0px',
                    'right': '0px',
                    'z-index':'99999'

                }).prependTo($club_tix).hide();

                $upcomingSeries.addClass('adDock');  // display ad dock button

                var timer;
                $upcomingSeries.children('.adDock') // establish ad dock button functionality
                    .css({
                    'cursor': 'pointer',
                    'z-index': '4'
                    })
                    .click(function(){
                        clearTimeout(timer);
                        $('#sponsored-ticket-takeover-link').animate({
                            right:"30px",
                            width: "toggle"
                            }, 500, function() {
                            if ($('#sponsored-ticket-takeover-link').css('display') == 'block') { // auto-hide ad after 12 seconds
                                timer = setTimeout(function () {
                                    $('.adDock').click();
                                }, 12000);
                            }
                        });
                    });

                $('.adDock > .adDock').prepend('<span class="spr"></span>'); // TODO: pull this out and add to upcoming series.jsp

                $('.adDock span.spr').css( { // TODO: pull this out and add to upcoming series css
                  'background': 'url("/images/homepage/y2013/matchup_takeover_sprite.png") no-repeat scroll 0 0 rgba(0, 0, 0, 0)',
                  'display': 'block',
                  'height': '26px',
                  'left': '5px',
                  'opacity': '0.7',
                  'position': 'relative',
                  'top': '47px',
                  'width': '18px'
                });

                $('.adDock > .adDock').hover( function(){ // TODO: pull this out and add to upcoming series css
                   $('.spr').css('opacity', '1');
                },
                function(){
                   $('.spr').css('opacity', '0.7');
                });

                $('.adDock').click(); // initial display ad

            }
        }
    }

}

function setRails(adObj) {

    var bgColor = adObj.bgColor || '#000000',
        leftImg = (adObj.leftImage) ? 'url(' + adObj.leftImage + ')' : 'none',
        rightImg = (adObj.rightImage) ? 'url(' + adObj.rightImage + ')' : 'none',
        bgPosition = '',
        bgRepeat = adObj.bgRepeat || 'no-repeat',
        bgAttachment = adObj.bgAttachment || 'scroll',
        $LEFTRAIL = (adObj.leftRail) ? $(adObj.leftRail) : $('#leftRailAdTag'),
        $RIGHTRAIL = (adObj.rightRail) ? $(adObj.rightRail) : $('#rightRailAdTag'),
        // $HTML = $('html'),
        clickHref = adObj.clickHref || null,
        clickTarget = adObj.clickTarget || '_blank',
        clickHeight = adObj.clickHeight || '900px',
        clickTop = adObj.clickTop || '0';

    if (window.page_id === 'index' && window.section === 'homepage' && window.club !== 'mlb') {
        bgPosition = adObj.bgPosition || 'center 27px';
    } else {
        bgPosition = adObj.bgPosition || 'center top';
    }

    // $HTML.addClass('sponsored-takeover');

	if (typeof $LEFTRAIL === "undefined" || typeof $RIGHTRAIL === "undefined") { return; }

    $LEFTRAIL.css({
        'background-color': bgColor,
        'background-image': leftImg,
        'background-position': "right top",
        'background-repeat': bgRepeat,
        'background-attachment': bgAttachment
    });

    $RIGHTRAIL.css({
        'background-color': bgColor,
        'background-image': rightImg,
        'background-position': "left top",
        'background-repeat': bgRepeat,
        'background-attachment': bgAttachment
    });

    if (clickHref !== null) {
        $LEFTRAIL.attr({
            'target': clickTarget,
            'href': clickHref
        }).css({
            'height': clickHeight,
            'top': clickTop
        });
        $RIGHTRAIL.attr({
            'target': clickTarget,
            'href': clickHref
        }).css({
            'height': clickHeight,
            'top': clickTop
        });
    }
}

// Refreshable <iframe> ad
(function (window, $) {

    var replaceOrd = /;ord=(\d+)/,
        iFrameCount = 0;

    function rnd() {
        return Math.round(Math.random() * 10000000000000000);
    }

    function refreshIframe() {

        var frame = window.frames[this.attr('name')],
            oldSrc = this.attr('src'),
            newSrc = oldSrc.replace(replaceOrd, ';ord=' + rnd());

        frame.location.replace(newSrc);
    }

    $.fn.dcRefreshableIFrame = function (cfg) {

        if (this.length === 0 || window.location.protocol === 'https:') {
            return this;
        }

        cfg = $.extend({
            club: window.club,
            lang: window.dc_lang,
            section: window.section,
            adunit: window.section,
            keyVal: window.dc_keyVal,
            ord: rnd(),
            domains: window.c_domain
        }, $.fn.dcRefreshableIFrame.defaults, cfg);

        crtg_content = crtg_getCookie(crtg_cookiename); /* Criteo, defined above */
        var club = cfg.club || 'mlb',
            lang = cfg.lang || 'en',
            size = cfg.width + 'x' + cfg.height,
            site = (lang !== 'en' ? lang + '.' : '') + cfg.domains[club] + '.mlb',
            url = 'http://ad.doubleclick.net/N2605/adi/' + site + '/' + [
                    cfg.section || 'empty', dc_adtest, crtg_content, cfg.keyVal || '', 'sz=' + size, 'ord=' + cfg.ord
            ].join(';');

        var iframes = this.map(function () {

                // Increment global DC counters for each ad
                var pos = window.dc_tiles[size] = ~~+window.dc_tiles[size] + 1,
                    tile = ++window.dc_numads,
                    name = 'dcRefreshableIFrame-' + iFrameCount++;

                return $(cfg.iframe)
                    .addClass(cfg.className).attr({
                        src: [url, 'pos=' + pos, 'tile=' + tile].join(';'),
                        width: cfg.width,
                        height: cfg.height,
                        name: name
                    })
                    .appendTo(this);

            });

        if (cfg.interval) {
            setInterval(function () {
                iframes.each(refreshIframe);
            }, cfg.interval * 1000);
        }

        return this;
    };

    $.fn.dcRefreshableIFrame.defaults = {
        interval: 30,
        width: 728,
        height: 90,
        className: 'refreshable',
        iframe: '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"/>'
    };

})(this, this.jQuery);
