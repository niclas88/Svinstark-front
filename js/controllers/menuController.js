myApp.controller("menuController", ["$scope", "$rootScope", "$anchorScroll", "$location", function($scope, $rootScope, $anchorScroll, $location){


		// The toggleNav function itself
		$scope.toggleNavigation = function () {
		    if ($('#container').hasClass('display-nav')) {
		        // Close Nav
		        $('#container').removeClass('display-nav');
		    } else {
		        // Open Nav
		        $('#container').addClass('display-nav');
		    }
		};

	$scope.UlIsShowing = false;

	//Display the ul in nav when clicking on li that contains ul
	$scope.displayUl = function(){

		$scope.UlIsShowing = !$scope.UlIsShowing;

		if($('#calculate-btn').hasClass('fa-plus') && $scope.UlIsShowing == true){
			$('#calculate-btn').removeClass('fa-plus').addClass('fa-minus');
		}

		else{
			$('#calculate-btn').removeClass('fa-minus').addClass('fa-plus');
		}
	};

	$scope.HideNav = function(){
		$('#container').removeClass('display-nav');
	};


	//Hide nav on window click
	$rootScope.toggleMenu = function(){
		if ($('#container').hasClass('display-nav')) {
			// Close Nav
			$('#container').removeClass('display-nav');
		}
	};

	//Add active class on click
	$("#toggle > li > div").click(function () {

                    $("#toggle > li > div").removeClass("active");
                    $(this).addClass('active');

                 });

	$("#toggle > li > ul > li > div").click(function () {

		$("#toggle > li > ul > li > div").removeClass("active");
		$(this).addClass('active');

	});

	//this is where we apply opacity to the arrow
	$(window).scroll( function(){

		//get scroll position
		var topWindow = $(window).scrollTop();
		//multiply by 1.5 so the arrow will become transparent half-way up the page
		topWindow = topWindow * 1.5;

		//get height of window
		var windowHeight = $(window).height();

		//set position as percentage of how far the user has scrolled
		var position = topWindow / windowHeight;
		//invert the percentage
		position = 1 - position;

		//define arrow opacity as based on how far up the page the user has scrolled
		//no scrolling = 1, half-way up the page = 0
		$('.arrow-wrap').css('opacity', position);

	});






	//Add smooth scrolling:
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});


	$rootScope.scrollTo = function(id) {
		$location.hash(id);
		$anchorScroll();
	}
	
}]);