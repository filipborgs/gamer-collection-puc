import { LoadPlatformsGateway } from '@/data/protocols/repo/platform'
import { PlatformCategory, LoadResult, PlatformPreview, Platform } from '@/domain/entities'
import { LoadPlatformById } from '@/domain/usecases/platform'
import { IgdbHelper } from '@/infra/api/igdb/helper'

export class PlatformsIgdbGateway extends IgdbHelper implements LoadPlatformsGateway, LoadPlatformById {
  public async load (search: string, offset: number): Promise<LoadResult<PlatformPreview>> {
    const token = this.auth()

    const searchClean: string = search.replace(/\s/g, '-').replace(/:/g, '')
    const limit = 20
    const where = `(name = "${searchClean}" | name ~ *"${searchClean}"* | abbreviation ~ *"${search}"*);`
    const data = `query platforms/count "count" {w ${where}}; query platforms "platforms" {f name; sort rating desc; w ${where} limit ${limit}; offset ${offset};};`
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
    const items = result[1].result

    return {
      count,
      limit,
      items,
      offset
    }
  }

  public async loadById (id: number): Promise<Platform> {
    const token = this.auth()
    const data = `fields name,abbreviation,category,generation,alternative_name; where id = ${id};`
    const config = {
      url: `${this.igdbUrl}/v4/platforms`,
      headers: {
        'Client-ID': this.clientId,
        Authorization: `Bearer ${await token}`,
        Accept: 'application/json',
        'Content-Type': 'text/plain'
      },
      data
    }

    const [platform] = await this.httpClient.post(config)
    if (platform?.id !== id) return null
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { category, alternative_name, ...platformData } = platform
    return {
      ...platformData,
      alternativeName: alternative_name,
      category: PlatformsIgdbGateway.parseCategory(category)
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
