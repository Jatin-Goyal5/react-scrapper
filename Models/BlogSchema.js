class BlogSchema{
    tag; 
    creator;
    title;
    readingTime;
    postDate;
    link;;
    post;
    constructor({ 
        tag,
        creator,
        title,
        readingTime,
        postDate,
        link,
        preview,
        post,
        relatedTags
    }) {
        
    this.tag =tag; 
    this.creator = creator;
    this.title =title;
    this.readingTime = readingTime;
    this.postDate =postDate;
    this.link = link;
    this.preview = preview;
    this.post = post;
    this.relatedTags = relatedTags;
    }
}

module.exports = BlogSchema;