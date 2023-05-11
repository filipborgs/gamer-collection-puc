import { NotFoundError, UnexpectedError } from "../../models/errors"

export class ApiLoadGamesCollectionItemsById {
  constructor(url, httpClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async loadById(id, platformId) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}/games?platformId=${platformId}`,
      method: 'get'
    })
    switch (httpResponse.statusCode) {
      case 200:
        return httpResponse.body
      case 404:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
