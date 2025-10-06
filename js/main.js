/*
Theme Name: Luna
Description: Responsive One Page Portfolio Template
Author: Bluminethemes
Theme URI: http://bluminethemes.com/preview/html/luna/
Author URI: https://creativemarket.com/Bluminethemes
Version: 1.3
*/

/* ------------------------------------------------------------------------ */
/*	BOOTSTRAP FIX FOR WINPHONE 8 AND IE10
/* ------------------------------------------------------------------------ */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  	var msViewportStyle = document.createElement("style")
  	msViewportStyle.appendChild(
    	document.createTextNode(
      		"@-ms-viewport{width:auto!important}"
    	)
  	)
  	document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
}

function detectIE() {
	if ($.browser.msie && $.browser.version == 9) {
		return true;
	}
	if ($.browser.msie && $.browser.version == 8) {
		return true;
	}
	return false;
}

function getWindowWidth() {
    return Math.max( $(window).width(), window.innerWidth);
}

function getWindowHeight() {
    return Math.max( $(window).height(), window.innerHeight);
}


// BEGIN WINDOW.LOAD FUNCTION
$(window).load(function() {

	/* ------------------------------------------------------------------------ */
	/*	PRELOADER
	/* ------------------------------------------------------------------------ */
	var preloaderDelay = 350,
        preloaderFadeOutTime = 800;

    function hidePreloader() {
        var loadingAnimation = $('#loading-animation'),
            preloader = $('#preloader');

        loadingAnimation.fadeOut();
        preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
    }

    hidePreloader();

});

//BEGIN DOCUMENT.READY FUNCTION
jQuery(document).ready(function($) {

	$.browser.chrome = $.browser.webkit && !!window.chrome;
	$.browser.safari = $.browser.webkit && !window.chrome;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile');
	}
	
	if ($.browser.chrome) {
		$('body').addClass('chrome');
	}
	
	if ($.browser.safari) {
		$('body').addClass('safari');
	}

	/* ------------------------------------------------------------------------ */
	/*	ANIMATED ELEMENTS
	/* ------------------------------------------------------------------------ */
	if( !$('body').hasClass('mobile') ) {

		$('.animated').appear();

		if( detectIE() ) {
			$('.animated').css({
				'display':'block',
				'visibility': 'visible'
			});
		} else {
			$('.animated').on('appear', function() {
				var elem = $(this);
				var animation = elem.data('animation');
				if ( !elem.hasClass('visible') ) {
					var animationDelay = elem.data('animation-delay');
					if ( animationDelay ) {
						setTimeout(function(){
							elem.addClass( animation + " visible" );
						}, animationDelay);
					} else {
						elem.addClass( animation + " visible" );
					}
				}
			});
		}

	}
	

	/* ------------------------------------------------------------------------ */
	/*	SMOOTH SCROLL
	/* ------------------------------------------------------------------------ */
//    var scrollAnimationTime = 1000,
//        scrollAnimation = 'easeInOutExpo';
//
//    $('a.scrollto').bind('click.smoothscroll',function (event) {
//        event.preventDefault();
//
//        var target = this.hash;
//
//        $('html, body').stop().animate({
//            'scrollTop': $(target).offset().top
//        }, scrollAnimationTime, scrollAnimation, function () {
//            window.location.hash = target;
//        });
//
//    });
	
	
	/* ------------------------------------------------------------------------ */
	/*	Sidebar
	/* ------------------------------------------------------------------------ */
	$(".ps-container").perfectScrollbar({
		wheelSpeed: 20,
		wheelPropagation: true,
		minScrollbarLength: 20
	});
	
	$('.nav-trigger').on('click', function(e) {

        e.preventDefault();

        $('#sidebar').toggleClass('active');
        $('.nav-trigger').toggleClass('active');
        $('body').toggleClass('active-slide');

    });
    
    function nativiaNav() {
 
        var config = {
            $sections : $( 'section.on-menu' ),
            $navlinks : $( '#main-nav ul li' ),
            currentLink : 0,
            $body : $( 'html, body' ),
            animspeed : 1000,
            animeasing : 'easeInOutExpo'
        };

        function init() {

            if( $('#main-nav ul').hasClass('nav-disabled') ) {
                return false;
            }
     
            config.$navlinks.each(function(index){
                $(this).find('a').on( 'click', function() {
                    scrollAnim( config.$sections.eq(index).offset().top, this.hash );
                    $('#sidebar').toggleClass('active');
                    $('.nav-trigger').toggleClass('active');
                    $('body').toggleClass('active-slide');
                    return false;
                });
            });

            config.$sections.waypoint( function( direction ) {
                if( direction === 'down' ) { changeNav( $( this ) ); }
            }, { offset: '30%' } ).waypoint( function( direction ) {
                if( direction === 'up' ) { changeNav( $( this ) ); }
            }, { offset: '-30%' } );
     
            $( window ).on( 'debouncedresize', function() {
                scrollAnim( config.$sections.eq( config.currentLink ).offset().top );
            } );
             
        }
     
        function changeNav( $section ) {
            config.$navlinks.eq( config.currentLink ).removeClass( 'current' );
            config.currentLink = $section.index( 'section.on-menu' );
            config.$navlinks.eq( config.currentLink ).addClass( 'current' );
        }
     
        function scrollAnim( top, hash) {
            config.$body.stop().animate( { scrollTop : top }, config.animspeed, config.animeasing, function() {
                window.location.hash = hash;
            });
        }

        init();

    }

    nativiaNav();
	
	var nav = $("#navigation");
	
	$(window).scroll(function(){
		var scroll = $(this).scrollTop();
		
		if (scroll > 50) {
			nav.addClass("animated_nav");
		} else {
			nav.removeClass("animated_nav");
		}
	});
	

	/* ------------------------------------------------------------------------ */
	/*	BACK TO TOP 
	/* ------------------------------------------------------------------------ */
	$(window).scroll(function(){
		if($(window).scrollTop() > 200){
			$("#back-to-top").fadeIn(200);
		} else{
			$("#back-to-top").fadeOut(200);
		}
	});
	
	$('#back-to-top, .back-to-top').click(function() {
		  $('html, body').animate({ scrollTop:0 }, '800');
		  return false;
	});
	
	
	/* ------------------------------------------------------------------------ */
	/*	HOME
	/* ------------------------------------------------------------------------ */	
	function setHomeHeight() {
		var home = $('#home');
			
		if( $('html').hasClass('mobile') ) {
			// If mobile
		} else {
			if( home.hasClass('fullscreen') ) {
				home.height( getWindowHeight() );
			}
		}
	}
	
	setHomeHeight();

	$(window).on('resize', function () { 
		setHomeHeight();       
	});

	function initHomeSection() {
	
		if( $('body').hasClass('slide-background') ) {
		
			$("body").backstretch([
				"images/bg_big.jpg",
				"images/bg_big.jpg",
				"images/bg_big.jpg",
			], {duration: 2600, fade: 1000});
		
		} else if($('body').hasClass('image-background')) {
		
			$("body").backstretch([
				"images/bg_big.jpg"
			]);
			
		}
		
    }
	
	initHomeSection();
	
	
	/* ------------------------------------------------------------------------ */
	/*	HOME - PARALLAX
	/* ------------------------------------------------------------------------ */	
	function initHomeParallax() {
		$(document).ready(function(){
		$(window).bind('load', function () {
				parallaxInit();						  
			});
			function parallaxInit() {
				testMobile = isMobile.any();
				if (testMobile == null)
				{
					//Parallax Classes
					$('body.parallax .image1').parallax("50%", 0.3);
				}
			}	
			parallaxInit();	 
		});	
		//Mobile Detect
		var testMobile;
		var isMobile = {
		    Android: function() {
		        return navigator.userAgent.match(/Android/i);
		    },
		    BlackBerry: function() {
		        return navigator.userAgent.match(/BlackBerry/i);
		    },
		    iOS: function() {
		        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		    },
		    Opera: function() {
		        return navigator.userAgent.match(/Opera Mini/i);
		    },
		    Windows: function() {
		        return navigator.userAgent.match(/IEMobile/i);
		    },
		    any: function() {
		        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		    }
		};
	}
	
	initHomeParallax();
	
	
	/* ------------------------------------------------------------------------ */
	/*	404
	/* ------------------------------------------------------------------------ */	
	function setErrorHeight() {
		var error = $('#error_404');
		
		error.height( getWindowHeight() );
	}
	
	setErrorHeight();

	$(window).on('resize', function () { 
		setErrorHeight();       
	});
		
	function initErrorSection() {
	
		if( $('#error_404').hasClass('slide-background') ) {
		
			$("#error_404").backstretch([
				"http://placehold.it/1980x1080",
				"http://placehold.it/1980x1080",
			], {duration: 2600, fade: 1000});
		
		} else if($('#error_404').hasClass('image-background')) {
		
			$("#error_404").backstretch([
				"http://placehold.it/1980x1080"
			]);
			
		}
		
    }
	
	initErrorSection();
	
	
	/* ------------------------------------------------------------------------ */
	/*	PRETTYPHOTO
	/* ------------------------------------------------------------------------ */
    function initPrettyPhoto(){
		$("a[data-rel^='prettyPhoto']").prettyPhoto({
            theme: 'dark_rounded',
            allow_resize: true,
            default_width: 600,
            opacity: 0.85, 
            default_height: 400,
            social_tools: ''
        });
	}
	initPrettyPhoto();


	/* ------------------------------------------------------------------------ */
	/*	FLEXSLIDER
	/* ------------------------------------------------------------------------ */
    function initFlexSlider(){
        $('.flexslider').flexslider({
            animation: "slide",
            directionNav: false,
            slideshowSpeed: 3500,
            animationSpeed: 1000
        });
    }
    initFlexSlider();
	
	
	/* ------------------------------------------------------------------------ */
	/*	FITVIDS
	/* ------------------------------------------------------------------------ */
    function initFitVids(){
        $(".video-container").fitVids();
    }
    initFitVids();	
	
	
	/* ------------------------------------------------------------------------ */
	/*	CHARTS
	/* ------------------------------------------------------------------------ */
	function initPieCharts() {
		$('.chart').easyPieChart({
			size : 160,
			animate : 2000,
			lineWidth : 2,
			lineCap : 'square',
			barColor : '#470f0e',
			trackColor : '#eeeeee',
			scaleColor : false
		});
	}
	initPieCharts();
	
	
	/* ------------------------------------------------------------------------ */
	/*	TESTIMONIALS
	/* ------------------------------------------------------------------------ */
    $('.testimonials-slider').flexslider({
		animation: "slide",
		directionNav: true,
		controlNav: true,
		slideshowSpeed: 3600,
		animationSpeed: 1000,
		initDelay: 0,
		smoothHeight: true
	});
	
	
});
//END DOCUMENT.READY FUNCTION


/* ------------------------------------------------------------------------ */
/*	Custom Isotope for Centered Portfolio
/* ------------------------------------------------------------------------ */
$.Isotope.prototype._getMasonryGutterColumns = function() {
    var gutter = this.options.masonry.gutterWidth || 0;
    containerWidth = this.element.parent().width();
    this.masonry.columnWidth = this.options && this.options.masonry.columnWidth ||
        this.$filteredAtoms.outerWidth(true) ||
        containerWidth;
    this.masonry.columnWidth += gutter;
    this.masonry.cols = Math.floor(containerWidth / this.masonry.columnWidth);
    this.masonry.cols = Math.max(this.masonry.cols, 1);
};
 
$.Isotope.prototype._masonryReset = function() {
    this.masonry = {};
    this._getMasonryGutterColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
        this.masonry.colYs.push( 0 );
    }
};
 
$.Isotope.prototype._masonryResizeChanged = function() {
    var prevColCount = this.masonry.cols;
    this._getMasonryGutterColumns();
    return ( this.masonry.cols !== prevColCount );
};
 
$.Isotope.prototype._masonryGetContainerSize = function() {
    var gutter = this.options.masonry.gutterWidth || 0;
    var unusedCols = 0,
        i = this.masonry.cols;
    while ( --i ) {
        if ( this.masonry.colYs[i] !== 0 ) {
            break;
        }
      unusedCols++;
    }
    return {
        height : Math.max.apply( Math, this.masonry.colYs ),
        width : ((this.masonry.cols - unusedCols) * this.masonry.columnWidth) - gutter
    };
};
	
	
/* ------------------------------------------------------------------------ */
/*	PORTFOLIO
/* ------------------------------------------------------------------------ */
function layoutPortfolio() {

	var $portfolioContainer = $('.portfolio-container');
	var $container = $('.portfolio'),
		$body = $('body'),
		columns = null;

	$('.portfolio-container .container').css('width','100%' );
	$('.portfolio-container .container').css('padding','0' );

	var portfolioWidth = $portfolioContainer.width(),
		columnNumber = getColumnNumber(),
		colWidth = Math.floor(0 +  (portfolioWidth / columnNumber));
		
	$container.isotope({
		filter: '*',
		animationEngine: 'best-available',
		resizable: false,
		itemSelector : '.portfolio-item',
		layoutMode: 'masonry',
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false
		},
		masonry : {
			columnWidth : colWidth
		},
	}, refreshWaypoints());
	
	function refreshWaypoints() {
		setTimeout(function() {
			$.waypoints('refresh');
		}, 1000);   
	}
	
	$('nav.portfolio-filter ul a').on('click', function() {
		var selector = $(this).attr('data-filter');
		$container.isotope({ filter: selector }, refreshWaypoints());
		$('nav.portfolio-filter ul a').removeClass('active');
		$(this).addClass('active');
		return false;
	});
	
	function getColumnNumber() { 
		var portfolioWidth = $portfolioContainer.width(), 
			columnNumber = 1;

		if (portfolioWidth > 1199) {
			columnNumber = 3;
		} else if (portfolioWidth > 980) {
			columnNumber = 3;
		} else if (portfolioWidth > 600) {
			columnNumber = 2;
		} else if (portfolioWidth > 240) {
			columnNumber = 1;
		}
		
		return columnNumber;
	}
	
	function setColumns() {
		var portfolioWidth = $portfolioContainer.width(), 
			columnNumber = getColumnNumber(), 
			itemWidth = Math.floor(portfolioWidth / columnNumber);
		
		$container.find('.portfolio-item').each(function() { 
			$(this).css( { 
				width : itemWidth + 'px' 
			});
		});
	}
	
	function setPortfolio() { 
		setColumns();	
		$container.isotope('reLayout');
	}
	
	$container.waitForImages(function () { 
		setPortfolio();
	});

	$(window).on('resize', function () { 
        setPortfolio();          
    });
	
}
	
function initializePortfolio() {

	var url,
		hash,
		wrapperHeight,
		pageRefresh = true,
		content = false,
		ajaxLoading = false,
		folderName = "projects",
		projectCloseClassName = "project-close",
		projectNavigationClassName = "project-navigation",
		projectContainerClassName = "project-content",
		scrollElement = $('html,body'),
		portfolioGrid = $('.portfolio'),
		portfolioItem = $('.portfolio-item'),
		projectLoader = $('.project-loader'),
		animationEasing = 'easeOutExpo',
		animationTime = 800,
		loadingError = '<p class="error">The Content cannot be loaded.</p>';

	$(window).bind('hashchange', function() {

		hash = $(window.location).attr('hash'); 
		var root = '#!'+ folderName +'/';
		var rootLength = root.length;

		if(hash.substr(0,rootLength) != root ){
		
			return;
			
		} else {

			hash = $(window.location).attr('hash'); 
			url = hash.replace(/[#!]/g, '');

			portfolioGrid.find('.portfolio-item.current').removeClass('current');

			var projectContainer = $('.' + projectContainerClassName),
				projectClose = $('.' + projectCloseClassName),
				projectNav = $('.' + projectNavigationClassName);

			if(pageRefresh == true && hash.substr(0,rootLength) == root) {  

				scrollElement.stop().animate({scrollTop: (projectContainer.offset().top) + 'px'}, animationTime, animationEasing, function() {                                          
					loadProject();                                                                                                    
				});

			} else if(pageRefresh == false && hash.substr(0,rootLength) == root) {          
				
				scrollElement.stop().animate({scrollTop: (projectContainer.offset().top - 62) + 'px'}, animationTime, animationEasing, function() {      
	
					if(content == false) {                       
						loadProject();                          
					} else {  
						projectContainer.animate({opacity:0,height:wrapperHeight},function() {
							loadProject();
						});
					}

					projectClose.fadeOut();
					projectNav.fadeOut();
						
				});
			}

			portfolioGrid.find('.portfolio-item a[href="#!' + url + '"]' ).parent().addClass('current');
		
		}

	});

	function loadProject() {
		projectLoader.fadeIn().removeClass('projectError').html('');

		if(!ajaxLoading) {

			ajaxLoading = true;
			var projectContainer = $('.' + projectContainerClassName);

			projectContainer.load( url +' section#project-page', function(xhr, statusText, request) {

				if(statusText == "success") {                
					ajaxLoading = false;
					$('#project-page').waitForImages(function() {
						hideLoader();  
					});
					$('.flexslider').flexslider({
						animation: "slide",
						directionNav: false,
						slideshowSpeed: 3500,
						animationSpeed: 1000
					});
					$(".video-container").fitVids();
				}

				if(statusText == "error") {
					
					projectLoader.addClass('projectError').append(loadingError);
					projectLoader.find('p').slideDown();

				}

			});

		}
			
	}

	function hideLoader() {
		projectLoader.delay(400).fadeOut( function() {                                                    
			showProject();                  
		}); 
	}

	function showProject() {

		var projectContainer = $('.' + projectContainerClassName),
			projectClose = $('.' + projectCloseClassName),
			projectNav = $('.' + projectNavigationClassName);
		wrapperHeight = projectContainer.children('#project-page').outerHeight()+'px';
		
		if(content == false) {
			wrapperHeight = projectContainer.children('#project-page').outerHeight() + 'px';
			projectContainer.animate({opacity:1,height:wrapperHeight}, function() {
				scrollPosition = scrollElement.scrollTop();
				projectClose.fadeIn();
				projectNav.fadeIn();
				content = true;               
			});
		} else {
			wrapperHeight = projectContainer.children('#project-page').outerHeight() + 'px';
			projectContainer.animate({opacity:1,height:wrapperHeight}, function() {                                                                  
				scrollPosition = scrollElement.scrollTop();
				projectClose.fadeIn();
				projectNav.fadeIn();
			});                 
		}

		projectActiveIndex = portfolioGrid.find('.portfolio-item.current').index();
		projectNumber = $('.portfolio-item a').length-1;

		if(projectActiveIndex == projectNumber) {

			$('.project-next a').addClass('disabled');
			$('.project-prev a').removeClass('disabled');

		} else if(projectActiveIndex == 0) {

			$('.project-prev a').addClass('disabled');
			$('.project-next a').removeClass('disabled');

		} else {

			$('.project-next a, .project-prev a').removeClass('disabled');

		}
	
	}

	function deleteProject(closeURL){

		var projectContainer = $('.' + projectContainerClassName),
			projectClose = $('.' + projectCloseClassName),
			projectNav = $('.' + projectNavigationClassName);

		projectClose.fadeOut();
		projectNav.fadeOut();

		if(typeof closeURL!='undefined' && closeURL!='') {
			/*window.location.hash = '#!';*/
			window.location.hash = '#_';
		}

		projectContainer.animate({opacity:0,height:'0px'},800,'easeOutExpo');
		projectContainer.empty();
		scrollElement.stop().animate({
			scrollTop: ($('#portfolio').offset().top)+'px'},600
		);

		portfolioGrid.find('.portfolio-item.current').removeClass('current');   

	}

	function bindCloseProject() {

		$('.project-close a').on('click',function () {
			var loader = $('.project-loader');                          
			deleteProject($(this).attr('href'));                                        
			loader.fadeOut();
			return false;
		});

	}

	function bindNextProject() {

		$('.project-next > a').on('click',function () {                                                                  
			current = portfolioGrid.find('.portfolio-item.current');
			next = current.next('.portfolio-item');
			target = $(next).children('a').attr('href');
			$(this).attr('href', target);

			if (next.length === 0) { 
				return false;             
			} 

			current.removeClass('current'); 
			next.addClass('current');
		   
		});
	}

	function bindPrevProject() {

		$('.project-prev > a').on('click',function () {       
			current = portfolioGrid.find('.portfolio-item.current');
			prev = current.prev('.portfolio-item');
			target = $(prev).children('a').attr('href');
			$(this).attr('href', target);

			if (prev.length === 0) {
				return false;         
			}

			current.removeClass('current');
			prev.addClass('current');

		});
	}

	function bindActions() {
		bindCloseProject();
		bindNextProject();
		bindPrevProject();
	}
	
	bindActions();

	function setProjectHeight() {
		var projectContainer = $('.' + projectContainerClassName),
			projectHeight = $('#project-page').outerHeight() + 'px';

		projectContainer.height(projectHeight);
	}

	$(window).resize(function () {
		setProjectHeight();
	});

	pageRefresh = false;

}
	


/* ------------------------------------------------------------------------ */
/*	CONTACT FORM
/* ------------------------------------------------------------------------ */
function initContactForm() {

	var scrollElement = $('html,body'),
		contactForm = $('.contact-form');

	contactForm.on('submit', function() {

		var requiredFields = $(this).find('.required'),
			formData = contactForm.serialize(),
			formAction = $(this).attr('action'),
			formSubmitMessage = $('.response-message');

		requiredFields.each(function() {

			if( $(this).val() == "" ) {

				$(this).addClass('input-error');

			} else {

				$(this).removeClass('input-error');
			}

		});

		function validateEmail(email) { 
			var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return exp.test(email);
		}

		var emailField = $('.contact-form-email');

		if( !validateEmail(emailField.val()) ) {

			emailField.addClass("input-error");

		}

		if ($(".contact-form :input").hasClass("input-error")) {
			return false;
		} else {

			$.post(formAction, formData, function(data) {
				formSubmitMessage.text(data);

				requiredFields.val("");

				setTimeout(function() {
					formSubmitMessage.slideUp();
				}, 5000);
			});

		}

		return false;

	});

}


$(window).load(function() {
    $(window).trigger( 'hashchange' );
});


$(document).ready(function() {
	layoutPortfolio();
	initializePortfolio();

	$(window).on('resize', function () { 
		layoutPortfolio();        
	});
	
    initContactForm();
});