const axios= require('axios');
const { search_option } = require('../secrets/secrets');

async function getSuggestion (query) {    
    
    var data = JSON.stringify(
        [
            {
                "operationName": "SearchSidebarQuery",
                "variables": {
                    "query": query,
                    "peopleSearchOptions": {
                        "filters": "highQualityUser:true OR writtenByHighQulityUser:true",
                        "numericFilters": "peopleType!=2",
                        "clickAnalytics": true,
                        "analyticsTags": [
                            "web",
                            "recommendations"
                        ]
                    },
                    "postsSearchOptions": {
                        "filters": "writtenByHighQualityUser:true",
                        "clickAnalytics": true,
                        "analyticsTags": [
                            "web",
                            "recommendations"
                        ]
                    },
                    "publicationsSearchOptions": {
                        "clickAnalytics": true,
                        "analyticsTags": [
                            "web",
                            "recommendations"
                        ]
                    },
                    "tagsSearchOptions": {
                        "numericFilters": "postCount>=1",
                        "clickAnalytics": true,
                        "analyticsTags": [
                            "web",
                            "recommendations"
                        ]
                    },
                    "searchInCollection": false,
                    "collectionDomainOrSlug": "medium.com"
                },
                "query":search_option
            }
        ]
       );
      
      var options = {
        method: 'post',
        url: 'https://medium.com/_/graphql',
        headers: {  
          'content-type': 'application/json', 
        },
        data : data
      };
        
        const response = await axios(options);
        
        const suggestion = response.data[0].data.search.tags.items.map((data)=>{return data.displayTitle});
        console.log(suggestion);
        return suggestion;

    }

module.exports = getSuggestion;





