var Wallpaper = require('./wallpaper-model.js');
var Q = require('q')
var mongoose = require('mongoose');

module.exports = (function(app){

  // wallpaper data api
  app.get('/api/wallpaper', function(req, res){
    Wallpaper.find(function(err, wallpaper){
      if(err){
        res.send(err);
      } else {
        res.json(wallpaper);
      }
    });
  });

  app.post('/api/wallpaper', function(req, res){
    var newWallpaper = new Wallpaper({ 
      serialized: req.body.serialized,
      name: req.body.name,
      love: 0
    });
    newWallpaper.save(function(err, wallpaper){
      if(err){
        res.send(err);
      } else {
        res.json(wallpaper);
      }
    });      
  });

  // serving index
  app.get('*', function(req, res){
    res.sendfile('./public/views/index.html');
  })

});