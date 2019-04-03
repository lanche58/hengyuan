var isTouch = Modernizr.touch,
	isMobile = false,//区分移动端与PC端
	mobile = false,//区分手机端与平板
	w_width = 0,
	w_height = 0,
	bannerImgh=638,
	navItem = 0,
	h_height=0,
	roll=0,
	sTop=150,
	produs=0,
	ST = 0;
	
var _mousemove;
var _click;
var _mousedown;
var _mouseup;

//移动端事件和PC事件的切换
if (Modernizr.touch) {
    _mousemove = "touchmove";
    _click = "touchend";
    _mousedown = "touchstart";
    _mouseup = "touchend";
} else {
    _mousemove = "mousemove";
    _click = "click";
    _mousedown = "mousedown";
    _mouseup = "mouseup";
};

function pageBox() {
    w_width = jQuery(window).width();
    w_height = jQuery(window).height();

	//设置移动端参数
    if (w_width <= 1024) {
        isMobile = true;
    } else if (w_width > 1024) {
        isMobile = false;
    };
	//区分手机端和平板
    if (w_width <= 640) {
        mobile = true;
    } else if (w_width > 640) {
        mobile = false;
    };
    if(isMobile){
    	$("body").find('.article-block').removeClass('article-block');
	}
    $('.pbannerbg').css('height',w_height);
	setImgMax($('.pbannerbg img'), 1920, 1080, w_width, w_height);
}
pageBox();
jQuery(window).resize(function () {
    pageBox();
});

//手机导航
var navigatie = {
	init: function() {
		this.setnav();
	},
	setnav: function() {
		$('.menubtn').on('click', function(e) {
			e.stopPropagation();
			$(this).toggleClass('active');
			$(".navigate").stop().toggleClass('show');
		});
		$(".navigatebg").click(function(){
			$(".menubtn").removeClass('active');
			$(".navigate").stop().removeClass('show');
		});
		$(".navigateli >li >a").bind("click", function (e) {
			var $navMobile=jQuery(".navigate"),
				$navA=$navMobile.find(".navigateli >li >a"),
				$mSubnav=$navMobile.find(".menuleval");
			var hjcur = $(this);
			var hjDD = $(this).parents("li");
			if (hjDD.find(".menuleval").size() > 0) {
				if (hjDD.hasClass("active")) {
					$(".menubtn").removeClass('active');
					$(".navigate").removeClass('show');
					hjDD.find(".menuleval").stop(false, false).addClass('active');
					hjDD.removeClass("active");
				} else {
					$navA.parents('li').removeClass("active");
					$mSubnav.stop(false, false).removeClass('active');
					hjDD.find(".menuleval").stop(false, false).addClass('active');
					hjDD.addClass("active");
					e.preventDefault();
				}
			}
		});
	}
};

//了解更多
var mores = {
	init: function() {
		this.setnav();
	},
	setmores: function() {
		var pbanner = $(".pbanner").outerHeight() + 100;
		$(".pbanner__more").click(function(){
			jQuery("html,body").animate({ scrollTop: pbanner},500);
		});
	}
};

//返回顶部
var scolltop = {
	init: function() {
		this.setnav();
	},
	setscoll: function() {
		$(".seenmore").click(function(){
			jQuery("html,body").animate({ scrollTop: 0},500);
		});
	}
};

//滚动header
var headerscoll = {
	init: function() {
		this.setnav();
	},
	setscoll: function() {
		function b(){
		var s = $(window).scrollTop();
			s > 10 ? $(".header").addClass("scoll"): $(".header").removeClass("scoll");
		}
		$(window).scroll(b),
		b();
	}
};

//内页banner
var scollinner = {
	init: function() {
		this.setscoll();
	},
	setscoll: function() {
		jQuery(window).scroll(function () {
			var headh=$(".header-box").outerHeight();
		    var windowTop = jQuery(window).scrollTop();
		    if (windowTop < w_height && !isMobile) {
		        jQuery('.pbannerinner figure img').css('transform', "translate(0px," + (windowTop) / 1.5 + "px)");
		    };
		});
	}
};

//定点跳转
var Hash = {
	init: function() {
		this.setback();
	},
	getHashs: function() {
		getHash();
		jQuery(".menuslist li a,.menuleval li a").click(function(e){
			var hash=jQuery(this).attr("href").split("#")[1];
			if(hash && jQuery("#"+hash).length==1){
				e.preventDefault();
				setScroll("#"+hash);
			}
			$(".menubtn").removeClass('active');
			$(".navigate").stop().removeClass('show');
		});
		
		function getHash(){
			var hash = location.href.split("#")[1];
			if(hash){
				setScroll("#"+hash);
			}
		};
		var scnum=0;
		function setScroll(anchorCur){
			scnum=$('.header').outerHeight();
			if(!isMobile){
				scnum = 88;
			}
			jQuery("html,body").animate({ scrollTop: jQuery(anchorCur).offset().top-scnum},600);
		};
	}
};

navigatie.setnav();
mores.setmores();
scolltop.setscoll();
headerscoll.setscoll();
scollinner.setscoll();
Hash.getHashs();

jQuery(window).load(function(){
    jQuery('.article-block').delay(300).scrollClass();
});

(function(jQuery){
    $.fn.scrollClass = function(config){
        var defaults = {};
        var config = jQuery.extend(defaults, config);
        var target = this;

        function addAction(){
            var length = target.length;
            for(var i=0; i<length; i++){
                if(target.eq(i).hasClass('articleShow')) continue;
                
                var in_position = target.eq(i).offset().top + 100;
                var window_bottom_position = jQuery(window).scrollTop() + jQuery(window).height();
                if(in_position < window_bottom_position){
                    target.eq(i).addClass('articleShow');
                }
            }
        }
        addAction();

        jQuery(window).on('scroll', function(){
            addAction();
        });
        return target;
    };
} )(jQuery);

function setImgMax(img, imgW, imgH, tW, tH) {
	var tWidth = tW || w_width;
	var tHeight = tH || w_height;
	var coe = imgH / imgW;
	var coe2 = tHeight / tWidth;
	if (coe < coe2) {
		var imgWidth = tHeight / coe;
		img.css({ height: tHeight, width: imgWidth, left: -(imgWidth - tWidth) / 2, top: 0 });
	} else {
		var imgHeight = tWidth * coe;
		img.css({ height: imgHeight, width: tWidth, left: 0, top: -(imgHeight - tHeight) / 2 });
	};
};

function setLayer(addr){
	$.ajax({
		url: addr,
		dataType: 'html',
		success: function(data){
			if (data == "" || data == null) {
				return;
			} else {
				$('body').append(data);
				$('html').addClass('open'); 
				setTimeout(function(){
					$('.ly-box').addClass('show');
				}, 100);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){ $('.ly-box').remove(); }
	});
	$(document).on(_click, '.ly-close', function(e){
		e.preventDefault();
		$('.ly-box').remove();
		$('html').removeClass('open');
	});
	$(document).on(_click, '.ly-box', function(e){
		if ($(e.target).hasClass('ly-box')) {
			$('.ly-box').remove();
			$('html').removeClass('open');
		}
	})
};
$(document).on(_click, '.ly-btn', function(e){
	e.preventDefault();
	setLayer($(this).attr('href'));
});