import { type LoadPlatformsGateway } from '@/data/protocols/api/platforms'
import { PlatformCategory, type GamePreview, type LoadResult } from '@/domain/entities'
import { IgdbHelper } from '../igdb-helper'

export class PlatformsIgdbGateway extends IgdbHelper implements LoadPlatformsGateway {
  public async load (search: string, offset: number): Promise<LoadResult<GamePreview>> {
    const token = this.auth()

    const searchClean: string = search.replace(/\s/g, '-').replace(/:/g, '')
    const limit = 10
    const where = `(name = "${searchClean}" | name ~ *"${searchClean}"* | abbreviation ~ *"${search}"*);`
    const data = `query platforms/count "count" {w ${where}}; query platforms "platforms" {f name,abbreviation,category,generation,alternative_name; sort rating desc; w ${where} limit ${limit}; offset ${offset};};`
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const items = result[1].result.map(({ alternative_name, category, ...platformData }) => {
      return {
        ...platformData,
        alternativeName: alternative_name,
        category: PlatformsIgdbGateway.parseCategory(category)
      }
    })

    return {
      count,
      limit,
      items,
      offset
    }
  }

  static parseCategory (value: number): PlatformCategory {
    switch (value) {
      case 1:
        return PlatformCategory.CONSOLE
      case 2:
        return PlatformCategory.ARCADE
      case 3:
        return PlatformCategory.PLATFORM
      case 4:
        return PlatformCategory.OPERATION_SYSTEM
      case 5:
        return PlatformCategory.PORTABLE_CONSOLE
      case 6:
        return PlatformCategory.COMPUTER
      default:
        return null
    }
  }
}
