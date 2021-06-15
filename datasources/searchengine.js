const { RESTDataSource } = require('apollo-datasource-rest');

class SearchEngineAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://searchengine.rickandmorty-team.com:8080/';
  }

  async searchDocs(topics,limit) {
    const data = await this.get(`/docs?topics=${topics.join(',')}`);
    return data.slice(0,limit)
  }
  async getDoc(docId) {
    const data = await this.get(`/docs/${docId}`);
    return Array.isArray(data)? data[0] :null
  }
  
  async summary(topics) {
    const data = await this.get(`/docs/summary?topics=${topics.join(',')}`);
    return data
  }
  async searchTopics(q,limit) {
    const data = await this.get(`/topics?topic=${q}&limit=${limit}`);
    return data
  }

  async suggestTopic(ids) {
    const data = await this.get(`/docs/suggest?topics=${ids.join(',')}`);
    return (data !== -1) ? data : null
  }


  async getTopics(ids) {
    const searchStr = Array.isArray(ids) ?ids.join(','):ids
    const data = await this.get(`topics?topics=${searchStr}`);
    return data
  }

  
}


module.exports = SearchEngineAPI;