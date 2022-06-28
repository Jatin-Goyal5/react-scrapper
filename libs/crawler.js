const axios = require("axios");
const cheerio = require('cheerio');
const db = require("../util/db");
const { base_url } = require("../secrets/secrets");
const Post = require("./post");
class Blog {
  blogList = [];
  tag = "";
  constructor(tag) {
    this.tag = tag;
  }

  async getBlog() {
    try {
      let checkTag = await this.isAvailable();
      if(checkTag == false){
        console.log(checkTag);
        await this.crawlBlogs();
        for (let i = 0; i < this.blogList.length; i++) {
          await db.query(
          "INSERT INTO blogs (tag ,creator, title, details, link ,preview, relatedTags, post) values ($1,$2,$3,$4,$5,$6,$7,$8)",
          [
              this.tag,
              this.blogList[i].creator,
              this.blogList[i].title,
              this.blogList[i].details,
              this.blogList[i].link,
              this.blogList[i].preview,
              JSON.stringify(this.blogList[i].relatedTags),
              JSON.stringify(this.blogList[i].post),
          ])
        }
        
      }else{
        const result = await db.query(
          `select * from blogs where tag = $1 limit 10 `,
          [this.tag]
        );
        this.blogList = result.rows;
      }


      return this.blogList;
     
    } catch (err) {
      console.log(err);
    }
}
  
  async isAvailable() {
    const result = await db.query("select * from blogs where tag = $1", [
      this.tag,
    ]);

    if (result.rows.length ) {
      return true;
    } else {
      return false;
    }
  }

  async crawlBlogs(){
    try{
      const option = {
        method: 'get',
        url: base_url+"tag/"+this.tag +"/latest",
        withCredentials: false,
      }
      const urlResponse = await axios(option);
      const data = urlResponse.data;
      let page= cheerio.load(data);
      let relatedTags =[];
      (page)('.o.dz').each((i, element) => {
            let creatorDetail = (page)(element).find('.ao.o').find('p').text().split('·')
            let descriptionDetail = (page)(element).find('.l.dq').find('p').text();
            let tagDetail = (page)(element).find('.hc.l').text();
            let linkDetail =(page)(element).find('.l.dq').find('a').attr('href') ?(page)(element).find('.l.dq').find('a').attr('href').split('?source')[0]:"" ;
           
            this.blogList.push({
                tags: this.tag,
                creator: creatorDetail[0],
                title: (page)((page)(element).find('h2')).text(),
                details: creatorDetail[1],
                link: "https://medium.com"+ linkDetail, 
                preview: descriptionDetail,
            });

            relatedTags.push(tagDetail);
       });
      this.blogList = this.blogList.filter((data)=>{
        if(data.details ===undefined ){
          return false;
        }else{
          return true;
        }
      })

      for(let i =0 ; i < this.blogList.length ; i++){
          let postObj = new Post(this.blogList[i].link);
          let post = await postObj.getPost();
          this.blogList[i]= {
            ...this.blogList[i],
            post: post,
            relatedTags : relatedTags
          }
      }
      return this.blogList;
    }catch(err){
      console.log(err.message);
    }

  }
}

module.exports = Blog;












     