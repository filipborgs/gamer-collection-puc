import { NotFoundError, UnexpectedError } from "../../models/errors"

export class ApiAddCollectionItem {
  constructor(url, httpClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async addItem(item) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}`,
      method: 'post',
      body: item
    })
    switch (httpResponse.statusCode) {
      case 201:
        return httpResponse.body
      case 404:
        return new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
