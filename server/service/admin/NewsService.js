const NewsModel = require("../../models/NewsModel")
const NewsService = {
    add:async ({title,content,category,cover,isPublished,editTime})=>{
        return NewsModel.create({
            title,content,category,cover,isPublished,editTime
        })
    },
    updateList:async({title,content,category,cover,isPublished,editTime,_id})=>{
        if(cover){
            return NewsModel.updateOne({_id},{
                title,content,category,cover,isPublished,editTime
            })
        }
        else{
            return NewsModel.updateOne({_id},{
                title,content,category,isPublished,editTime
            })
        }
    },

    getList:async ({_id})=>{
        return _id?NewsModel.find({_id}):NewsModel.find({})
    },

    publish:async({_id,isPublished,editTime})=>{
        return NewsModel.updateOne({_id},{isPublished,editTime})
    },
    
    delList:async({_id})=>{
        return NewsModel.deleteOne({_id})
    }
}

module.exports = NewsService