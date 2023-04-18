
export class AuthorizeHttpClientDecorator {
  constructor(storage, httpClient) {
    this.storage = storage
    this.httpClient = httpClient
  }

  async request(data) {
    const user = this.getStorage.get('user')
    if (user?.token) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': user.token
        })
      })
    }
    const httpResponse = await this.httpClient.request(data)
    return httpResponse
  }
}
