import { EmptyListError, UnexpectedError } from "../../models/errors"

export class ApiLoadCollectionsByUserId {
  constructor(url, httpClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async loadById(id) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get'
    })
    switch (httpResponse.statusCode) {
      case 200:
        return httpResponse.body
      case 404:
        throw new EmptyListError('jogo')
      default:
        throw new UnexpectedError()
    }
  }
}
