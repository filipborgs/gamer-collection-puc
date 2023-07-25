import { ConflictError, NotFoundError, UnexpectedError } from "../../models/errors"

export class ApiRemoveCollectionItemById {
  constructor(url, httpClient) {
    this.url = url
    this.httpClient = httpClient
  }

  async removeById(id) {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'delete'
    })
    switch (httpResponse.statusCode) {
      case 204:
        return 'Item deletado com sucesso'
      case 404:
        throw new NotFoundError()
      case 409:
        throw new ConflictError()
      default:
        throw new UnexpectedError()
    }
  }
}
