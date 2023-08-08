
export class AuthorizeHttpClientDecorator {
  constructor(storage, httpClient, router) {
    this.storage = storage
    this.httpClient = httpClient
    this.router = router
  }

  async request(data) {
    const user = this.storage.get('user')
    if (user?.token) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': user.token
        })
      })
    }
    const httpResponse = await this.httpClient.request(data)
    if (user && httpResponse.statusCode === 403) {
      this.storage.clear()
      this.router.push('/')
    }
    return httpResponse
  }
}
