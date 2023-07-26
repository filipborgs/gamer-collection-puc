import { NotFoundError, UnexpectedError } from "../../models/errors"

export class ApiUpdateCollectionItem {
  constructor(url, httpClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async updateItem(item) {
    console.log(item)
    const { id, ...body } = item
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'put',
      body
    })
    switch (httpResponse.statusCode) {
      case 204:
        return 'Item atulizado com sucesso'
      case 404:
        throw new NotFoundError()
      default:
        throw new UnexpectedError()
    }
  }
}
