var mongoose = require('mongoose');
var ProjectSchema = new mongoose.Schema({
 	       original_url : String,
 	       short_url :    String
       });
module.exports = mongoose.model("Shortproject",ProjectSchema);
