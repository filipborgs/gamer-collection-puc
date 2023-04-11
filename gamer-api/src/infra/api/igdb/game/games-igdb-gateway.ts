import { LoadGamesGateway, LoadGameByIdGateway } from '@/data/protocols/repo/games'
import { type Game, type GamePreview, type LoadResult } from '@/domain/entities'
import { IgdbHelper } from '@/infra/api/igdb/helper'

export class GamesIgdbGateway extends IgdbHelper implements LoadGamesGateway, LoadGameByIdGateway {
  public async load (search: string, offset: number): Promise<LoadResult<GamePreview>> {
    const token = this.auth()

    const searchClean: string = search.replace(/\s/g, '-').replace(/:/g, '')
    const limit = 10
    const where = `(slug = "${searchClean}" | slug ~ *"${searchClean}"* | alternative_names.name ~ *"${search}"*) & platforms != null & version_parent = null;`
    const data = `query games/count "count" {w ${where}}; query games "games" {f name,platforms.id,platforms.name,cover.image_id; sort rating desc; w ${where} limit ${limit}; offset ${offset};};`

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
    console.log(result[1].result)
    const count = result[0].count
    const items = result[1].result.map(({ cover, ...gameData }) => {
      return {
        ...gameData,
        cover: cover ? { code: cover.image_id } : undefined
      }
    })

    return {
      count,
      limit,
      items,
      offset
    }
  }

  public async loadById (id: number): Promise<Game> {
    const token = this.auth()
    const data = `fields name,platforms.id,platforms.name,cover.image_id,first_release_date; where id = ${id};`
    const config = {
      url: `${this.igdbUrl}/v4/games`,
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${await token}`,
        Accept: 'application/json',
        'Content-Type': 'text/plain'
      },
      data
    }

    const [game] = await this.httpClient.post(config)
    if (game?.id !== id) return null
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { cover, first_release_date, ...gameData } = game
    return {
      ...gameData,
      cover: cover ? { code: cover.image_id } : undefined,
      releaseDate: new Date(first_release_date * 1000)
    }
  }
}
