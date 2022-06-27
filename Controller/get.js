const axios = require('axios');
const Blog  = require('../libs/crawler');
const {base_url} = require('../secrets/secrets');
const getSuggestion = require('../libs/suggestedSearch')
module.exports = {
    getBlogs: async (req, res, next )=>{
        try{
            const tag = req.query.tag.toLowerCase().split(' ').join('-'); 
            const blogsObject =  new Blog(tag);
            let blogList = await blogsObject.getBlog();
            return res.send({
                data: blogList
            })
        }catch(err){
            console.log(err);
        }

    },
    getSuggestedTags : async (req, res)=>{
        try{
            const tag = (req.query.tag).toString().toLowerCase();
            const suggestion = await getSuggestion(tag);
            return res.send({
                data: suggestion
            })
        }catch(err){
            console.log(err);
        }
    }
}