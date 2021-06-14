
const resolvers = 
{
    Query: {
        topics: async (_,{contains,limit},{dataSources}) => {
            const topicsData = await dataSources.topicAPI.searchTopics(contains,limit);
            return topicsData
        },
        diagramInfo:  (_,{topicIds},{dataSources}) => {
            // const diagramInfoData = await dataSources.topicAPI.diagramInfo(contains,limit);
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
        }
    }
}

module.exports = resolvers;