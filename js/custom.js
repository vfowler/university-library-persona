$(document)
.on('click', 'a[href*="#"]', function() {
	if ( this.hash && this.pathname === location.pathname ) {
		// update text to reflect selected persona
		document.title = 'Persona » ' + this.hash.slice(1); 
		// remove class is-initial from body
		$('body').removeClass('is-initial');
		// remove flex-active-slide class from all slides li
		$('#carousel li').removeClass('flex-active-slide');
		//add class flex-active-slide to the clicked slides li
		$('li:has([href="' + this.hash + '"])').addClass('flex-active-slide');
		// bbq.pushState triggers the smooth-scroll
		$.bbq.pushState( '#/' + this.hash.slice(1) ); 
		return false;
	} // end if
}) // end click #
.ready(function() {

	// check number of li in carousel for initial #nav-cue message
	var n = $('#carousel li').length;
	var p = $('.persona').length;
	// n and p should match. If they do, update the message
	if (n === p) {
		$('#nav-cue').html('<p>Choose from our ' + n + ' personae above <img src="img/icons/hand-o-up.png" alt=""></p>');
		/*
		// add their names
		$('.persona').each(function(index) {
			$('#nav-cue').append('<li><a href="#'+$(this).attr('id')+'">'+$(this).attr('id')+'</a></li>');
			/*
			if (index < p-2) {
				$('#nav-cue').append(', ');
			} else if (index < p-1) {
				$('#nav-cue').append(' and ');
			} // end if
			
		}); // end each
		$('#nav-cue').append('</ul>');
		*/
		
	} // end if
	
	$(window).bind('hashchange', function(event) {
		var tgt = location.hash.replace(/^#\/?/,'');		
		if ( document.getElementById(tgt) ) {
			$.smoothScroll({scrollTarget: '#' + tgt});
			// append the breadcrumb
			$('.breadcrumbs p').html('<a id="home" href="./"><img src="img/icons/home.png" alt="Home"></a> Persona <span aria-hidden="true">»</span> ');
			// append the selected persona name
			$('.breadcrumbs p').append(location.hash.slice(2));
			// use an Out or Up to ensure the #nav-cue is only shown once
			$('#nav-cue').fadeOut();
			// set starting position of keyboard tip
			$('#nav-keyboard:not(.is-hidden)').css({'left' : '-102%', 'top' : '2.35em', 'opacity' : '0' });
			// amazing fly in animation of keyboard tip
			$('#nav-keyboard:not(.is-hidden)').delay(1500).animate(
				{
					opacity: '1',
					left: '31%'
				},
				1500,
				'easeInOutElastic'
			); // end animate
			
		} // end if
	}); // end bind
	
	$(window).trigger('hashchange');

		// check for existing # in URL - as in arriving from a bookmark
		if ( window.location.hash) {
			$('body').removeClass('is-initial');
			// set the document title for nice bookmarking :)
			document.title = 'Persona » ' + location.hash.slice(2);
			//add class flex-active-slide to the clicked slides li
			$('li:has([href="#' + location.hash.slice(2) + '"])').addClass('flex-active-slide');
		} // end if
		
	// #about hide then fadeIn
	$('#about').fadeTo(0,0).delay(1500).fadeTo(1500, 1, function() { // callback function
		// bounce the nav-cue in
		$('#nav-cue').delay(500).animate(
			{
				opacity: '1',
				top: '2.35em'
			},
			1500,
			'easeOutBounce'
		); // end animate
	} // end callback function
	); // end fadeIn
	
	// fade toggles from each #about h2 for the following .answer
	$('#about div.answer').hide();
	$('#about h2').click(
		function() {
			$(this).next('.answer').slideToggle('slow', 'easeInOutQuad');
			$(this).toggleClass('is-expanded');
		}
	); // end click
	
	
	// add overlay to carousel thumb images to help usability
	$('#carousel img').each(function() {
		$(this).after('<div class="thumb-overlay">'+$(this).attr('alt')+'</div>');
	}); // end each
	
	// toggle class inside on hover the li element
	$('#carousel li').hover(function() {
		$(this).toggleClass('inside');
	}); // end hover
	
	// #carousel needs to sit up top all along... 
	$('#carousel').hover(
		function() {
			$(this).stop().animate(
				{
					top: '0'
				}
			); // end animate
		},
		function() {
			$(this).stop().animate(
				{
					top: '-80px'
				}
			); // end animate
		}
	); // end hover
	// kick start the #carousel out on ready
	$('#carousel').mouseout();
	
	// mouseover #nav-cue triggers the #carousel
	$('#nav-cue').hover(function() {
		$('#carousel').mouseover();
	},
	function() {
		$('#carousel').mouseout();
	}); // end #nav-cue hover
		
	// click #trigger-nav-cue to also trigger #carousel mouseover
	$('#trigger-nav-cue').click(function() {
        $('#carousel').mouseover();
    }); // end click
	
	// hide #nav-keyboard on click #kbd-msg-btn
	$('#kbd-msg-btn').click(function() {		
		// amazing fly out animation of keyboard tip
			$('#nav-keyboard').animate(
				{
					opacity: '0',
					left: '102%'
				},
				1500,
				'easeInOutElastic'
			); // end animate
			// addClass is-hidden to ensure #nav-keyboard is not shown again
			$('#nav-keyboard').fadeOut().delay(1000).addClass('is-hidden');
    }); // end click
	
	// add keyboard L-R arrow key navigation to #carousel
	// http://jqueryfordesigners.com/index.html%3Fp=231.html
	$(window).keyup(function(event) {
		var direction = null;
		if (event.keyCode == 37) { // go left
			direction = 'prev';
		} else if (event.keyCode == 39) { // go right
			direction = 'next';
		}		
		if (direction != null) { // click the next/prev
			$('.flex-active-slide')[direction]().find('a').click();
			// also hide the #nav-keyboard - the user worked it out!
			$('#kbd-msg-btn').click();
		}
	}); // end keyup
	
	// add scroll sync with #carousel
	// http://jqueryfordesigners.com/index.html%3Fp=309.html
	/* this resulted in a poor ux so dropped this idea */
	
	// swap foreground images to background to enable sizing as a bg-img
	$('.fg-img').each(function() {
		var src = $(this).attr('src');
		var bg = '<div class="bg-img" style="background-image: url(' + src + ');"></div>';
		$(this).replaceWith(bg);
	}); // end each
	
	// Add link to the h2 for people who scroll and want alternative way to select a persona.
	// Took this out as it presents an unresponsive usability error to have it linked.
	/*
	$('.persona h2').each(function(index, element) {
		$(this).replaceWith('<h2><a href="#' + $(this).text() + '">' + $(this).text() + '</a></h2>'); 
	}); // end each
	*/
		
	// highlight the .btn button
	$('.bg-img')
		.mouseover(function() {
			$('.btn').css('box-shadow', '0 0 5px -2px #000, 0 0 10px 10px rgba(255,255,255,.75)');
		}) //end mouseover
		.mouseout(function() {
			$('.btn').css('box-shadow', 'none');
		}); // end mouseout
	// also need to trigger on over the .btn itself
	$('.btn').mouseover(function() {
		$('.bg-img').mouseover();
	}); // end .btn mouseover
	// also need to trigger on over the .pq itself
	$('.pq').mouseover(function(e) {
        $('.bg-img').mouseover();
    }); // end .pq mouseover
	
	// hide all quotes first
	$('.pq:not(.pq-instructional)').hide();
	// toggle quote on click and swap open / close button
	$('.btn').click(function() {
		// set button status
		$(this).toggleClass('is-open');
		// .btn - .pq must be http://api.jquery.com/next/
		$(this).next('.pq').fadeToggle('slow');
	}); // end click

	// set each persona time.expiry to a shade of red and add title attribute for remainingDays
	$('time.expiry-date').each(function() {
        var expiry = new Date($(this).attr('datetime'));
		var today = new Date();
		var millisecondsInOneDay = 86400000;
		var remainingDays = parseInt((expiry - today)/millisecondsInOneDay, 10);
		if (remainingDays<0) {
			// max redness
			var redness = 'rgb(255,0,0)';
			// display expired msg
			$(this).attr('title', 'Research data for this persona expired ' + -remainingDays + ' days ago!');
			// set css properties - p.145 of textbook
			$(this).css('fontWeight','bolder');
		} else {
			// calculate redness
			var redness = 'rgb(' + (255 - remainingDays) + ',0,0)';
			// display remainingDays msg
			$(this).attr('title', 'Research data valid for ' + remainingDays + ' days.');
		} // end if
		// set css properties - p.145 of textbook
		$(this).css('color',redness);
    }); // end each

	// jQuery UI accordion with
	//						http://jqueryui.com/accordion/#custom-icons 
	//						http://jqueryui.com/accordion/#no-auto-height
	var icons = {
			header: "plus-icon",
			activeHeader: "minus-icon"
	};
	$( ".accordion" ).accordion({
		heightStyle: "content",
		icons: icons
	});
				
}); // end ready