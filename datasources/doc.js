const { RESTDataSource } = require('apollo-datasource-rest');

class DocAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://wkbe-cg-jsonserver.herokuapp.com/';
  }

  async searchDocs(q,limit) {
    const data = await this.get(`search?label_like=${q}&_limit=${limit}&_sort=path&_order=asc`);
    return data
  }

}


module.exports = DocAPI;