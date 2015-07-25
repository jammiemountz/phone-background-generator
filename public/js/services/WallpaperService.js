angular.module('WallpaperService', [])
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
      }
    }   
  }])