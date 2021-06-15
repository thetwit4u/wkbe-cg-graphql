const { RESTDataSource } = require('apollo-datasource-rest');

class DocApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://searchengine.rickandmorty-team.com:8080/';
  }

  async searchDocs(topics,limit) {
    const data = await this.get(`/docs?topics=${topics.join(',')}`);
    return data.slice(0,limit)
  }
  async getDoc(docId) {
    const data = await this.get(`/docs?topics=${topics.join(',')}`);
    return data.slice(0,limit)
  }
}


module.exports = DocApi;