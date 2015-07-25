// angular.module('GoatsApp', ['ngRoute', 'appRoutes', 'MainController', 'WallpaperService', 'DrawingService'])
angular.module('GoatsApp', [])
  .factory('Wallpaper', ['$http', function($http){

    return {
      
      get : function() {
        return $http.get('/api/wallpaper');
      },

      // these will work when more API routes are defined on the Node side of things
      // call to POST and create a new wallpaper
      create : function(wallpaperData) {
        return $http.post('/api/wallpaper', wallpaperData);
      },

      // call to DELETE a wallpaper
      delete : function(id) {
        return $http.delete('/api/wallpaperData/' + id);
      },

      d3theThings: function() {
        console.log('were d3-ing from de factoree and it werk')
        var screen = {
          height: 900,
          width: 900
        }

        var dragmove = function(d) {
          d3.select(this)
            .attr("y", function(d){
              var mouseLoc = d3.event.sourceEvent.pageY;
              return mouseLoc - 320;
            })
            .attr("x", function (d) {
              var mouseLoc = d3.event.sourceEvent.pageX;
              return mouseLoc - 460;
            })
        }

        var drag = d3.behavior.drag().on("drag", dragmove);

        d3.selectAll('image')
          .call(drag)
      },

      clear:function(){
        d3.select('svg').remove()
      },

      appendBackground: function(url){
        d3.select('svg')
          .append('image')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', '568')
          .attr('width', '320')
          .attr('xlink:href', url)
        },

      appendMe: function(url) {
        d3.select('svg')
          .append('image')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', '100')
          .attr('width', '100')
          .attr('xlink:href', url)
      },

      setSVG: function(){
        d3.select('.wallpaperDraw')
          .append('svg')
          .attr('height', '568')
          .attr('width', '320')
          .attr('id', 'mySVG')
      }

    }   
  }])

  .directive('dynamic', function($compile){
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, ele, attrs) {
        scope.$watch(attrs.dynamic, function(serialized) {
          console.log('rendering photos')
          ele.html(serialized);
          $compile(ele.contents())(scope);
        });
      }
    };
  })

  .controller('MainController', ['$scope', '$window', 'Wallpaper', function($scope, $window, Wallpaper){
    

  // send a wallpaper to the DB
  $scope.sendImage = function(){
    console.log('we here')
    var tmp = document.getElementById("mySVG");
    var svg_xml = (new XMLSerializer).serializeToString(tmp);
    console.log('sending image from '+ $scope.name)
    Wallpaper.create({serialized: svg_xml, name: $scope.name});
    $window.location.reload();
  }

  // add a new goat to the background
  $scope.addToCanvas = function(url){
    Wallpaper.appendMe(url);
    Wallpaper.d3theThings()
  }

  // fetch past wallpapers
  $scope.populateWallpapers = function() {
    console.log('populating past wallpapers...')
    Wallpaper.get()
      .then(function(wallpapers){
        $scope.wallpapers = wallpapers.data;
        console.log($scope.wallpapers)
      })
  }

  $scope.changeWallpaper = function(url) {
    console.log('tryin to change wallpaper')
    Wallpaper.clear()
    Wallpaper.setSVG()
    Wallpaper.appendBackground(url);
  }

  $scope.love = 0;

  $scope.loving = function(wallpaper) {
    $scope.love++;
  }

  // fetch for the first time.
  $scope.populateWallpapers();

  // append the SVG to the DOM
  Wallpaper.setSVG()

}])






