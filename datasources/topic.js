const { RESTDataSource } = require('apollo-datasource-rest');

class TopicAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://wkbe-cg-jsonserver.herokuapp.com/';
  }

  async searchTopics(q,limit) {
    const data = await this.get(`topics?label_like=${q}&_limit=${limit}&_sort=path&_order=asc`);
    return data
  }
  async getTopics(ids) {
    const searchStr = Array.isArray(ids) ? ids.join('&id=') :ids
    const data = await this.get(`topics?id=${searchStr}`);
    return data
  }


  // async diagramInfo(topicIds) {
  //   const data = await this.get(`topics?label_like=${q}&_limit=${limit}&_sort=path&_order=asc`);
  //   return data
  // }
}


module.exports = TopicAPI;

