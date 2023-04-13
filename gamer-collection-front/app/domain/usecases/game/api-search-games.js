import { UnexpectedError } from '../../models/errors'

export class ApiSearchGames {
  constructor(url, httpClient) {
    this.httpClient = httpClient
    this.url = url
  }

  async search({ search, limit, page }) {
    const offset = (page || 1 - 1) * limit || 12
    const query = new URLSearchParams({ search: search || '', offset })
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?${query.toString()}`,
      method: 'get'
    })
    switch (httpResponse.statusCode) {
      case 200:
        return httpResponse.body
      default:
        throw new UnexpectedError()
    }
  }
}
