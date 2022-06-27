const cheerio = require('cheerio');
const axios = require('axios');

class Post {
    link;
    post =[];
    constructor(link,) {
        this.link = link;
    }

    async getPost(){
    try{
        let link = encodeURI(this.link);
    const option = {
        method: 'get',
        url: link,
        withCredentials: false,
    }
    const urlResponse = await axios(option);
    const data = urlResponse.data;
    let $ = cheerio.load(data);

    let imgSrc = $($('figure img').get(0)).attr('src');
    let list = [];
    let allSections = $('.pw-post-body-paragraph');
    
    $(allSections).each((i, element) => {
        let obj ={
            tag: $(element).get(0).tagName,
            content : $(element).text(),
        }
        list.push(obj);
       
    });
    this.post = {
        imgSrc : imgSrc,
        data: list,
    }
    
        return this.post;
    }catch(err){
        console.log(err.message);
    }
    
    }

}

module.exports = Post;

