

app

    .controller("DetalleCatalogoCtrl", function($scope, $state, $stateParams, acuerdosService, $window, $mdDialog, $log, toastr, $filter) {

    $scope.myInterval = 3000;
	  $scope.slides = [
	    {
	      image: 'http://lorempixel.com/400/200/'
	    },
	    {
	      image: 'http://lorempixel.com/400/200/food'
	    },
	    {
	      image: 'http://lorempixel.com/400/200/sports'
	    },
	    {
	      image: 'http://lorempixel.com/400/200/people'
	    }
	  ];


})

	.directive('ngCarousel', function() {
      return function(scope, element, attrs) {
        var el = element[0];
        var containerEl = el.querySelector("ul");
        var slidesEl = containerEl.querySelectorAll("li");
        scope.numSlides = slidesEl.length;
        scope.curSilde = 1;   
        scope.$watch('curSlide', function(num) {
          containerEl.style.left = (-1*100*(num-1)) + '%';
        });
        
        el.style.position = 'relative';
        el.style.overflow = 'hidden';

        containerEl.style.position = 'absolute';
        containerEl.style.width = (scope.numSlides*100)+'%';
        containerEl.style.listStyleType = 'none';
        containerEl.style.margin =0;
        containerEl.style.padding=0;
        containerEl.style.transition = '1s';
        
        for(var i=0; i<slidesEl.length; i++) {
          var slideEl = slidesEl[i];
          slideEl.style.display = 'inline-block';
          slideEl.style.width = (100/scope.numSlides) + '%';
        }
      };
    });