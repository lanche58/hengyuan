jQuery(function(){
	function initBox() {
		w_width = jQuery(window).width();
        w_height = jQuery(window).height();
        if(!isMobile){
        	$('.banner').css('height',w_height);
			$('.banner .banner__item,.banner .banner__item figure').css('height',w_height);
			setImgMax($('.banner .banner__item figure img'), 1920, 996, w_width, w_height);
        }else{
        	$('.banner').css('height',"auto");
			$('.banner .banner__item,.banner .banner__item figure').css('height',"auto");
        }
    };
    initBox();
    jQuery(window).resize(function () {
        initBox();
    });
    
    $('.banner__swipter').on('init', function(event, slick, currentSlide, nextSlide) {
        $(".banner__item").first().removeClass("slick-current");
		setTimeout(function(){
			$(".banner__item").first().addClass("slick-current");
		},200);
		var lw = $('.banner__swipter').width()/20;
		TweenLite.to($(".banner__item").eq(0).find('figure img'),0,{scale:1.1,x:lw})
		TweenMax.to($(".banner__item").eq(0).find('figure img'),6,{x:-lw,ease:Power0.easeNone})
    });
    
    $(".banner__swipter").slick({
		centerPadding: '0',
		autoplaySpeed:4000,
		speed:1500,
		arrows: false,
		pauseOnHover:false,
		dots: true,
		fade: true,
		customPaging: function (slider, i) {
           return $('<span></span>').text("0"+(i + 1));
        },   
		infinite: true,
		autoplay: true,
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
	   var lw = $('.banner__swipter').width()/20;
	   TweenLite.to($(".banner__item").eq(nextSlide).find('figure img'),0,{scale:1.1,x:lw})
	   TweenMax.to($(".banner__item").eq(nextSlide).find('figure img'),6,{x:-lw,ease:Power0.easeNone})
	});
    
    $(".pricefix").slick({
        slidesToShow: 1,
        arrows: false,
        autoplay: false,
        infinite: false,
        speed: 600,
        autoplaySpeed: 4600
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		jQuery(".oillist span").eq(currentSlide).removeClass("active");
		jQuery(".oillist span").eq(nextSlide).addClass("active");
		var lewidth = $(".oillist span").width()*nextSlide;
		$(".oillist b.line").css('left',lewidth);
	});
    
    $(".oillist span").click(function(){
    	var lewidth = $(this).width()*$(this).index();
    	$(this).addClass('active').siblings().removeClass('active');
    	$(".oillist b.line").css('left',lewidth);
    	$('.pricefix').slick('slickGoTo', $(this).index());
    });
    
    $('.businees__swiper').on('init', function(event, slick, currentSlide, nextSlide) {
		var lw = $('.businees__swiper').height()/20;
	    TweenLite.to($(".business__item").eq(0).find('img'),0,{scale:1.1,y:lw})
	    TweenMax.to($(".business__item").eq(0).find('img'),6,{y:-lw,ease:Power0.easeNone})
    });
    
    $(".businees__swiper").slick({
		centerPadding: '0',
		autoplaySpeed:4000,
		speed:1500,
		arrows: true,
		pauseOnHover:false,
		dots: false,
		fade: true,   
		infinite: true,
		autoplay: true,
		prevArrow: $('.businessbtn span.prev'),
        nextArrow: $('.businessbtn span.next'),
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
	   var lw = $('.businees__swiper').height()/20;
	   TweenLite.to($(".business__item").eq(nextSlide).find('img'),0,{scale:1.1,y:lw})
	   TweenMax.to($(".business__item").eq(nextSlide).find('img'),6,{y:-lw,ease:Power0.easeNone});
	   jQuery(".businessin li").eq(currentSlide).removeClass("active");
	   jQuery(".businessin li").eq(nextSlide).addClass("active");
	});
	$(".businessin li").click(function(){
    	$('.businees__swiper').slick('slickGoTo', $(this).index());
    });
    $('.intro__item p b').countUp({ time: 3000});
    
    $(".quality__wisper").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        centerPadding: '0',
        arrows: true,
        speed: 800,
        dots: false,
        infinite: true,
        centerMode: false,
        autoplay: false,
        focusOnSelect:false,
        prevArrow: $('.quality__btn span.prev'),
        nextArrow: $('.quality__btn span.next'),
        responsive: [
		{
		  breakpoint: 1024,
		  settings: {
			dots: false,
			speed:800,
			autoplay:false,
			arrows:true,
			slidesToShow:4,
			slidesToScroll: 1,
			infinite: false,
		  }
		},
		{
		  breakpoint: 640,
		  settings: {
			dots: false,
			speed:800,
			autoplay:false,
			arrows:true,
			slidesToShow:3,
			slidesToScroll: 1,
			infinite: false,
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			dots: false,
			speed:800,
			autoplay:false,
			arrows:true,
			slidesToShow:2,
			slidesToScroll: 1,
			infinite: false,
		  }
		},
	  ]
	});

	var initPhotoSwipeFromDOM = function(gallerySelector) {

		// parse slide data (url, title, size ...) from DOM elements 
		// (children of gallerySelector)
		var parseThumbnailElements = function(el) {
		    var thumbElements = el.childNodes,
		        numNodes = thumbElements.length,
		        items = [],
		        figureEl,
		        childElements,
		        linkEl,
		        size,
		        item,
				divEl;
	
		    for(var i = 0; i < numNodes; i++) {
	
	
		        figureEl = thumbElements[i]; // <figure> element
	
		        // include only element nodes 
		        if(figureEl.nodeType !== 1) {
					continue;
		        }
	            divEl = figureEl.children[0];
	            linkEl = divEl.children[0]; // <a> element
		        size = linkEl.getAttribute('data-size').split('x');
	
		        // create slide object
		        item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
		        };
	
		        
	
		        if(divEl.children.length > 1) {
		        	// <figcaption> content
		          	item.title = divEl.children[1].innerHTML; 
		        }
	 
		        if(linkEl.children.length > 0) {
		        	// <img> thumbnail element, retrieving thumbnail url
					item.msrc = linkEl.children[0].getAttribute('src');
		        } 
		       
				item.el = figureEl; // save link to element for getThumbBoundsFn
		        items.push(item);
		    }
	
		    return items;
		};
	
		// find nearest parent element
		var closest = function closest(el, fn) {
		    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
		};
	
		// triggers when user clicks on thumbnail
		var onThumbnailsClick = function(e) {
		    e = e || window.event;
		    e.preventDefault ? e.preventDefault() : e.returnValue = false;
	
		    var eTarget = e.target || e.srcElement;
	
		    var clickedListItem = closest(eTarget, function(el) {
		        return el.tagName === 'LI';
		    });
	
		    if(!clickedListItem) {
		        return;
		    }
	
	
		    // find index of clicked item
		    var clickedGallery = clickedListItem.parentNode,
		    	childNodes = clickedListItem.parentNode.childNodes,
		        numChildNodes = childNodes.length,
		        nodeIndex = 0,
		        index;
	
		    for (var i = 0; i < numChildNodes; i++) {
		        if(childNodes[i].nodeType !== 1) { 
		            continue; 
		        }
	
		        if(childNodes[i] === clickedListItem) {
		            index = nodeIndex;
		            break;
		        }
		        nodeIndex++;
		    }
	
	
	
		    if(index >= 0) {
		        openPhotoSwipe( index, clickedGallery );
		    }
		    return false;
		};
	
		// parse picture index and gallery index from URL (#&pid=1&gid=2)
		var photoswipeParseHash = function() {
			var hash = window.location.hash.substring(1),
		    params = {};
	
		    if(hash.length < 5) {
		        return params;
		    }
	
		    var vars = hash.split('&');
		    for (var i = 0; i < vars.length; i++) {
		        if(!vars[i]) {
		            continue;
		        }
		        var pair = vars[i].split('=');  
		        if(pair.length < 2) {
		            continue;
		        }           
		        params[pair[0]] = pair[1];
		    }
	
		    if(params.gid) {
		    	params.gid = parseInt(params.gid, 10);
		    }
	
		    if(!params.hasOwnProperty('pid')) {
		        return params;
		    }
		    params.pid = parseInt(params.pid, 10);
		    return params;
		};
	
		var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
		    var pswpElement = document.querySelectorAll('.pswp')[0],
		        gallery,
		        options,
		        items;
	
			items = parseThumbnailElements(galleryElement);
	
		    // define options (if needed)
		    options = {
		        index: index,
	
				// define gallery index (for URL)
		        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
	
		        getThumbBoundsFn: function(index) {
		            // See Options -> getThumbBoundsFn section of docs for more info
		            var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
		                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
		                rect = thumbnail.getBoundingClientRect(); 
	
		            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
		        },
	
		        // history & focus options are disabled on CodePen
	           	// remove these lines in real life: 
			   historyEnabled: false,
			   focus: false	
	
		    };
	
		    if(disableAnimation) {
		        options.showAnimationDuration = 0;
		    }
	
		    // Pass data to PhotoSwipe and initialize it
		    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		    gallery.init();
		};
	
		// loop through all gallery elements and bind events
		var galleryElements = document.querySelectorAll( gallerySelector );
	
		for(var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i+1);
			galleryElements[i].onclick = onThumbnailsClick;
		}
	
		// Parse URL and open gallery if it contains #&pid=3&gid=1
		var hashData = photoswipeParseHash();
		if(hashData.pid > 0 && hashData.gid > 0) {
			openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
		}
	};
	
	// execute above function
   	initPhotoSwipeFromDOM('.quality__wisper');
});