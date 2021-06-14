
const resolvers = 
{
    Query: {
        topics: async (_,{contains,limit},{dataSources}) => {
            const topicsData = await dataSources.topicAPI.searchTopics(contains,limit);
            return topicsData
        },
        diagramInfo:  (_,{topicIds},{dataSources}) => {
            // const diagramInfoData = await dataSources.topicAPI.diagramInfo(topicIds);
            const data = [{
                "sets": ["1"],
                "size": 10,
                "label":"Minimumbezoldiging"
            },
            {
                "sets": ["2"],
                "size": 10,
                "label":"Nettoloon"
            },
            {
                "sets": ["1","2"],
                "size": 5,
                "label":"Minimumbezoldiging & Nettoloon"
            }]
            return data
        },
        search:  (_,{topicIds,limit},{dataSources}) => {
           // const searchData = await dataSources.docAPI.searchDocs(topicIds,limit);
            const data = [
                {
                  "id": "60c74659ed1b399303c87f86",
                  "title": "ad amet non Lorem do occaecat",
                  "topics": ["991","1177","170"]
                },
                {
                    "id": "60c74659ed1b399303c8xxx",
                    "title": "ad amet non Lorem do occaecat",
                    "topics": ["1944","55","1584"]
                  }

                ]
            return data
        },
    },
    SearchResult: {
        topics: async ({topics},__,{dataSources}) => {
            const topicsData = await dataSources.topicAPI.getTopics(topics);
            return topicsData
        }
    }
}

module.exports = resolvers;