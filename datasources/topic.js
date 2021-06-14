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

}


module.exports = TopicAPI;