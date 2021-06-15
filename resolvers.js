var _lodash = require('lodash');

let res = [];

function getCombinations(array) {
    var result = [];   
    var f = function(prefix=[], array) {
        for (var i = 0; i < array.length; i++) {
            result.push([...prefix,array[i]]);
            f([...prefix,array[i]], array.slice(i + 1));     
        }  
    }   
    f('', array);   
    return result; 
}


const resolvers = 
{
    Query: {
        topics: async (_,{contains,limit},{dataSources}) => {
            const topicsData = await dataSources.topicAPI.searchTopics(contains,limit);
            return topicsData
        },
        diagramInfo: async (_,{topicIds},{dataSources}) => {
            // const diagramInfoData = await dataSources.topicAPI.diagramInfo(topicIds);
            const topicCom = getCombinations(topicIds);
            const alphaCom = getCombinations(["A","B","C","D","E","F"].slice(0,(topicIds.length )));
            const resTopicsData = await dataSources.topicAPI.getTopics(topicIds)
            const data = topicCom.map((combi,idx) => {
                const count = 42
                const topicLabels = []
                combi.map((topicId) => {
                    resTopicsData.map((topic) => {
                        if (topic.id == topicId) {
                            topicLabels.push(topic.label)
                        }
                    })
                })
                const hint = `${topicLabels.join(' + ')} (${count})`
                const label = alphaCom[idx].join(' + ')
                const sets = alphaCom[idx]
                const set = 
                    {
                        sets: sets,
                        size: 10,
                        label: label,
                        hint: hint 
                    }
                return set
            })
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