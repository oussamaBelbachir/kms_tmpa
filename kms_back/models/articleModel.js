const mongoose = require("mongoose");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema({
    direction : {
        type : String,
        trim : true,
        required : [true,"An Article must have a direction !"],
    },
    department : {
        type : String,
        trim : true,
        required : [true,"An Article must have a department !"],
    },
    title : {
        type : String,
        trim : true,
        required : [true,"An Article must have a name !"],
        lowercase : true,
    },
    description : {
        type : String,
        trim : true,
        lowercase : true,

    },
    slug : String,
    image : {
        type : String,
        required : [true,"An Article must have a name !"],
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    content : {
        type : String,
        trim : true,
        
    }
});

articleSchema.pre("save",function(next){
    this.slug = slugify(this.title,{lower:true});
    // this.department = slugify(this.department,{lower:true})
    next();
});

const Article = mongoose.model("Article",articleSchema);

module.exports = Article;