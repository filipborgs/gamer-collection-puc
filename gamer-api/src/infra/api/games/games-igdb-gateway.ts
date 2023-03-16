import { type LoadGamesGateway } from '@/data/protocols/api/games'
import { type GamePreview, type LoadResult } from '@/domain/entities'
import { type HttpClient } from '@/infra/gateway'

export class GamesIgdbGateway implements LoadGamesGateway {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly clientId: string,
    private readonly secret: string,
    private readonly twitchAuthUrl: string,
    private readonly igdbUrl: string
  ) {}

  public async load (search: string, offset: number): Promise<LoadResult<GamePreview>> {
    const token = this.auth()

    const searchClean: string = search.replace(/\s/g, '-').replace(/:/g, '')
    const limit = 10
    const where = `(slug = "${searchClean}" | slug ~ *"${searchClean}"* | alternative_names.name ~ *"${search}"*) & platforms != null & version_parent = null;`
    const data = `query games/count "count" {w ${where}}; query games "games" {f alternative_names.name, checksum, platforms.name, name, version_parent, slug; sort rating desc; w ${where} limit ${limit}; offset ${offset};};`

    const config = {
      url: `${this.igdbUrl}/v4/multiquery`,
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${await token}`,
        Accept: 'application/json',
        'Content-Type': 'text/plain'
      },
      data
    }
    const result = await this.httpClient.post(config)
    const count = result[0].count
    const items = result[1].result

    return {
      count,
      limit,
      items,
      offset
    }
  }

  private async auth (): Promise<string> {
    const config = {
      url: `${this.twitchAuthUrl}?client_id=${this.clientId}&client_secret=${this.secret}&grant_type=client_credentials`
    }
    const result = await this.httpClient.post(config)
    return result.access_token
  }
}
