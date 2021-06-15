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
            const resTopicsCounts = await dataSources.searchEngineAPI.summary(topicIds)
            let maxCount = 0
            const data = topicCom.map((combi,idx) => {
                let count = 0
                resTopicsCounts.map((cntData) => {
                    if (_lodash.isEqual(cntData.ids.sort(),combi.sort())) {
                        count = cntData.count
                    }
                })
                maxCount = (count > maxCount)?count:maxCount
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
                        size: Math.ceil((count / maxCount) * 100),
                        label: label,
                        hint: hint 
                    }
                return set
            })
            return data.sort(function(a, b) {
                return a.sets.length - b.sets.length;
            });
        },
        search: async (_,{topicIds,limit},{dataSources}) => {
            const data = await dataSources.docAPI.searchDocs(topicIds,limit);
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