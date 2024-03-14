var express = require('express');
const ProductController = require('../../controllers/admin/ProductController');
var ProductRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

ProductRouter.post("/adminapi/product/add",upload.single("file"),ProductController.add)
ProductRouter.get("/adminapi/product/list",ProductController.getList)
ProductRouter.post("/adminapi/product/list",upload.single("file"),ProductController.updateList)
ProductRouter.get("/adminapi/product/list/:id",ProductController.getList)
ProductRouter.delete("/adminapi/product/list/:id",ProductController.delList)
// NewsRouter.put("/adminapi/news/publish",NewsController.publish)
module.exports = ProductRouter;
