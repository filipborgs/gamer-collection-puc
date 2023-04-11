import { type Uuid } from '@/data/protocols/datatype'
import { type AddGameItemToCollectionRepository } from '@/data/protocols/repo/collections'
import { type LoadGameByIdGateway } from '@/data/protocols/repo/games'
import { ItemType, PurchaseState } from '@/domain/entities'
import { type AddGameItemParams, type AddGameCollectionItem } from '@/domain/usecases/collection'

export class DbAddGameItem implements AddGameCollectionItem {
  constructor (
    private readonly gameRepo: LoadGameByIdGateway,
    private readonly collectionRepo: AddGameItemToCollectionRepository,
    private readonly uuid: Uuid
  ) {}

  async add (params: AddGameItemParams): Promise<string> {
    const { itemId, purchaseDate, purchasePrice, userId } = params
    const game = await this.gameRepo.loadById(itemId)
    if (!game) return null

    const purchaseState = PurchaseState[params.purchaseState]
    const { name } = game

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
        purchaseState
      }
    )
    return id
  }
}
