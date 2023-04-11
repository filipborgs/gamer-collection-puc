import { HttpClient } from '@/infra/gateway'

export abstract class IgdbHelper {
  constructor (
    protected readonly httpClient: HttpClient,
    protected readonly clientId: string,
    protected readonly secret: string,
    protected readonly twitchAuthUrl: string,
    protected readonly igdbUrl: string
  ) {}

  protected async auth (): Promise<string> {
    const config = {
      url: `${this.twitchAuthUrl}?client_id=${this.clientId}&client_secret=${this.secret}&grant_type=client_credentials`
    }
    const result = await this.httpClient.post(config)
    return result.access_token
  }
}
