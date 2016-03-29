// 图片平移 imgTranslation 版本号：1.0

(function($){
$.fn.imgTranslation=function(options){
	$.fn.imgTranslation.defaults ={
		width:800,            //最外层DIV宽度
		height:147,            //最外层DIV高度
		widthImg:147,        //图片宽度
		heightImg:147,       //图片高度
		gap:10,               //图片间间隔
		erval:20,              //移动速度
		borders:true,         //是否有边框
		borderColor:'#d6d6d6'      //边框颜色
	};

options = $.extend($.fn.imgTranslation.defaults,options);
	var widths =options.width;
	var heights =options.height;
	var widthImgs =options.widthImg;
	var heightImgs =options.heightImg;
	var gaps =options.gap;
	var ervals =options.erval;
	var borders =options.borders;
	var borderColor =options.borderColor;
return this.each(function(){
	var thiss = $(this);
	$imgTranslationDiv         = thiss.find('.imgTranslationDiv');                     //最外DIV
	$imgTranslationDivFloat    = $imgTranslationDiv.find('.imgTranslationDivFloat');   //要移动的DIV
	$ul                        = $imgTranslationDivFloat.find('ul');                      //ul
	$li                        = $ul.find('li');                                        //li
	$img                       = $li.find('img');                                       //img
 	var wl;                                                                               //ul的宽度 
	var i = 0;
	var rvalTime;                                                                      //时间
	
	function loadset(){
		$imgTranslationDiv.css({width:widths,height:heights,position:'relative',overflow:'hidden'});
		$imgTranslationDivFloat.css({width:5000,position:'absolute',top:0,left:0});
		wl = widthImgs*$li.length+gaps*$li.length; 
		$ul.css({float:'left',width:wl});
		$li.css({float:'left',marginRight:gaps,background:"url(images/loading.gif) center center no-repeat #fff"});
		$img.css({width:widthImgs,height:heightImgs});
		if(borders){
			wl = (widthImgs+2)*$li.length+gaps*$li.length; 
			$ul.css({float:'left',width:wl});
			$li.css({width:widthImgs, height:(heightImgs-2), border:"1px solid "+borderColor});
			$img.css({width:(widthImgs-2),height:(heightImgs-4), margin:"1px 0 0 1px"});
		}
	}
	
	loadset();
	
	//if
	
	$imgTranslationDivFloat.append($ul.clone());   //copy
	function ifContent(){
		if(i>=wl){
			i=0;
		}
		$imgTranslationDiv.scrollLeft(i);
		i++;
	}
	rvalTime = setInterval(function(){ifContent()},ervals);
	$imgTranslationDiv.mouseenter(function(){
		if(rvalTime){clearInterval(rvalTime);}
	}).mouseleave(function(){
		rvalTime = setInterval(function(){ifContent()},ervals);
	});
	
});

}})(jQuery)