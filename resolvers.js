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
            const topicsData = await dataSources.searchEngineAPI.searchTopics(contains,limit);
            return topicsData
        },
        suggest: async (_,{topicIds},{dataSources}) => {
            const suggestData = await dataSources.searchEngineAPI.suggestTopic(topicIds);
            let res = null
            if (suggestData) { res = await dataSources.searchEngineAPI.getTopics(suggestData) }
            return Array.isArray(res)?res[0]:res
        },
        
        topic: async (_,{id},{dataSources}) => {
            const topicsData = await dataSources.searchEngineAPI.getTopics(id);
            return (topicsData.length > 0)? topicsData[0] : null
        },
        document: async (_,{id},{dataSources}) => {
            const data = await dataSources.searchEngineAPI.getDoc(id);
            return data
        },
        diagramInfo: async (_,{topicIds},{dataSources}) => {
            const topicCom = getCombinations(topicIds);
            const alphaCom = getCombinations(["A","B","C","D","E","F"].slice(0,(topicIds.length )));
            const resTopicsData = await dataSources.searchEngineAPI.getTopics(topicIds)
            const resTopicsCounts = await dataSources.searchEngineAPI.summary(topicIds)

            const data = topicCom.map((combi,idx) => {
                let count = 0
                resTopicsCounts.map((cntData) => {
                    if (_lodash.isEqual(cntData.ids.sort(),combi.sort())) {
                        count = cntData.count
                    }
                })
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
                        size: count,
                        label: label,
                        hint: hint 
                    }
                return set
            })
            const sortedRes= data.sort(function(a, b) {
                return a.sets.length - b.sets.length;
            });
            return sortedRes
        },
        search: async (_,{topicIds,limit},{dataSources}) => {
            const data = await dataSources.searchEngineAPI.searchDocs(topicIds,limit);
            return data
        },
    },
    Document: {
        topics: async ({topics},__,{dataSources}) => {
            const topicsData = await dataSources.searchEngineAPI.getTopics(topics);
            return topicsData
        }
    }
}

module.exports = resolvers;