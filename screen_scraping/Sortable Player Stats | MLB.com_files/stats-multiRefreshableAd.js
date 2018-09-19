$(function() {

  $("<div></div>").attr("id","banner_ad").insertBefore("#header_container");
  
  $("#banner_ad").dcRefreshableAd({ size: "728x90", interval: 30, refreshPage: true, pageTotal: 3 });
  $("#right_tower").dcRefreshableAd({ size: "160x600"});
  $("#ad_branding").dcRefreshableAd({ size: "300x50"});
});
