const Article = require("../models/articleModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/APIFeatures");

exports.getAllArticles = catchAsync(async (req,res,next) => {

    const {direction,department} = req.params;

    let query = Article.find();
    if(direction) query = query.find({direction});
    if(department) query = query.find({department});

    const {search} = req.query;
    if(search) query = query.find({ description: {$regex : `${search}`} });


    // =====================================================================
    const filters = [];
    const {direction_departments} = req.user;

    Object.keys(direction_departments).forEach(dir => 
        direction_departments[dir].forEach(dep => 
            filters.push({"direction" : dir,"department" : dep})
        )
    )
    query = query.find({$or : filters});

    // =====================================================================


    const totalCount = await Article.countDocuments(query);
    const nbrOfPages = Math.ceil(totalCount/6);

    const features = new APIFeatures(query,req.query)
                                                        .filter()
                                                        .sort()
                                                        .fields()
                                                        .paginate();
    
    const articles = await features.query;


    return res.status(200).json({
        status : "success",
        results : articles.length,
        nbrOfPages,
        data : {
            articles,
        },
    });

});

exports.getArticleBySlug = catchAsync(async (req,res,next) => {
        const {slug} = req.params;
        const article = await Article.findOne({slug});

    return res.status(200).json({
        status : "success",
        data : {
            article
        }
    });
});


exports.createArticle = catchAsync(async (req,res,next) => {

    const article = await Article.create({
        ...req.body,
        image : req.file.path,
    });

    return res.status(200).json({
        status : "success",
        message : "Article ajouté avec succès",
        data : {
            article
        }
    });
});


