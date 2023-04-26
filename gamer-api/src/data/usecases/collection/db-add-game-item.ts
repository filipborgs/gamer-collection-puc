import { Uuid } from '@/data/protocols/datatype'
import { AddGameItemToCollectionRepository } from '@/data/protocols/repo/collection'
import { LoadGameByIdGateway } from '@/data/protocols/repo/game'
import { ItemType, PurchaseState } from '@/domain/entities'
import { AddGameItemParams, AddGameCollectionItem } from '@/domain/usecases/collection'

export class DbAddGameItem implements AddGameCollectionItem {
  constructor (
    private readonly gameRepo: LoadGameByIdGateway,
    private readonly collectionRepo: AddGameItemToCollectionRepository,
    private readonly uuid: Uuid
  ) {}

  async add (params: AddGameItemParams): Promise<string> {
    const { itemId, purchaseDate, purchasePrice, userId, manual, disk, cover, sealed, platformId } = params
    const game = await this.gameRepo.loadById(itemId)
    if (!game) return null

    const purchaseState = PurchaseState[params.purchaseState]
    const { name, platforms } = game
    const platform = platforms.find(p => p.id === platformId)
    if (!platform) return null

    const id = this.uuid.generate()
    await this.collectionRepo.addGameItem(
      {
        id,
        itemId,
        userId,
        name,
        type: ItemType.GAME,
        purchaseDate,
        purchasePrice,
        purchaseState,
        manual,
        disk,
        cover,
        sealed,
        platform: {
          id: platform.id,
          name: platform.abbreviation || platform.name
        }
      }
    )
    return id
  }
}
