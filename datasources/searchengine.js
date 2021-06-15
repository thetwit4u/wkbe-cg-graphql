const { RESTDataSource } = require('apollo-datasource-rest');

class SearchEngineAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://searchengine.rickandmorty-team.com:8080/';
  }

  async summary(topics) {
    const data = await this.get(`/docs/summary?topics=${topics.join(',')}`);
    return data
  }
  async searchTopics(q,limit) {
    const data = await this.get(`/topics?topic=${q}&limit=${limit}`);
    console.log(`/topics?topic=${q}&limit=${limit}`)
    return data
  }


}


module.exports = SearchEngineAPI;