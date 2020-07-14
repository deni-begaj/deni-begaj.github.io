function showSection(section) {
    const sectionElem = $('#' + section);
		
    if( sectionElem.size() != 0 ){
        
        $('body').addClass('section-show');
        // const newUrl = window.location.protocol + '//' + window.location.host + '/' + section;
        // window.location.href = newUrl;
        // alert(newUrl);
        sectionElem.addClass('active');
    
    }
}


$(function(){
	"use strict";

	/*=========================================================================
		Initializing stellar.js Plugin
	=========================================================================*/
	$('.section').stellar({
		horizontalScrolling: false
	});
	
	
	$(window).on('load', function(){
	
		$('body').addClass('loaded');
	
		
		/*=========================================================================
			Portfolio Grid
		=========================================================================*/
		const grid = $('#portfolio-grid');
		grid.shuffle({
			itemSelector: '.item'
		});
		
		$('#portfolio-filters > ul > li > a').on('click', function (e) {
			e.preventDefault();
			const groupName = $(this).attr('data-group');
			$('#portfolio-filters > ul > li > a').removeClass('active');
			$(this).addClass('active');
			grid.shuffle('shuffle', groupName );
		});
		
		$('a.image-link').magnificPopup({
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			gallery: {
				enabled: true
			}
		});
	
	});



    const hash = window.location.hash;
    if (hash !== '') {
        const section = hash.substring(1);
        showSection(section);
    }
	
	
	/*=========================================================================
		Links Navigation System
	=========================================================================*/
	$('.front-person-links > ul > li > a[data-section]').on('click', function(e){
        // e.preventDefault();
        const section = $(this).data('section');
		showSection(section);
		
    });

	$('.close-btn').on('click', function(){
		$('body').removeClass('section-show');
        $('section.active').removeClass('active');
        window.location.hash = '';
	});
	
	
	
	/*=========================================================================
		Testimonials Slider
	=========================================================================*/
	$('.testimonials-slider').owlCarousel({
		singleItem: true
	});
	
	
	
	/*=========================================================================
		Skill Bar's Percent Initialization from attribute data-percent
	=========================================================================*/
	$('.skill-bar').each(function(){
		const $this = $(this),
			percent = parseInt( $this.data('percent'), 10 );
		
		$this.find('.bar').css('width', percent + '%');
	});
	

	
});