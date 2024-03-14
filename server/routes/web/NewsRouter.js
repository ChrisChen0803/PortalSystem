var express = require('express');
const NewsController = require('../../controllers/web/NewsController');
var NewsRouter = express.Router();

// NewsRouter.post("/adminapi/news/add",upload.single("file"),NewsController.add)
NewsRouter.get("/webapi/news/list",NewsController.getList)
// NewsRouter.post("/adminapi/news/list",upload.single("file"),NewsController.updateList)
NewsRouter.get("/webapi/news/list/:id",NewsController.getList)
NewsRouter.get("/webapi/news/toplist",NewsController.getTopList)
// NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)
// NewsRouter.put("/adminapi/news/publish",NewsController.publish)
module.exports = NewsRouter;
