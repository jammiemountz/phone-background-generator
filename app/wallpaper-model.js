var mongoose = require('mongoose');

var WallpaperSchema = new mongoose.Schema({
  serialized: String,
  name: String,
  date: { type: Date, default: Date.now },
  love: { type: Number }
});

module.exports = mongoose.model('Wallpaper', WallpaperSchema)