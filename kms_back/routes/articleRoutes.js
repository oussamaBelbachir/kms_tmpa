const router = require("express").Router();
const articleController = require("../controllers/articleController");
const authController = require("../controllers/authController");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router
    .route("/slug/:slug")
    .get( articleController.getArticleBySlug);

router
    .route("/:direction?/:department?")
    .get(authController.protect, articleController.getAllArticles)
    .post( upload.single('image') ,articleController.createArticle);


module.exports = router;