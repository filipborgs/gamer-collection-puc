import { type Uuid } from '@/data/protocols/datatype'
import { type AddGameItemToCollectionRepository } from '@/data/protocols/repo/collections'
import { type LoadGameByIdGateway } from '@/data/protocols/repo/games'
import { ItemType, PurchaseStatus } from '@/domain/entities'
import { type AddItemParams, type AddItemToCollection } from '@/domain/usecases/collection'

export class DbAddItemToCollection implements AddItemToCollection {
  constructor (
    private readonly gameRepo: LoadGameByIdGateway,
    private readonly collectionRepo: AddGameItemToCollectionRepository,
    private readonly uuid: Uuid
  ) {}

  async add (params: AddItemParams): Promise<string> {
    const { itemId, purchaseDate, purchasePrice, userId } = params
    const game = await this.gameRepo.loadById(itemId)
    if (!game) return null

    const purchaseStatus = PurchaseStatus[params.purchaseStatus]
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
        purchaseStatus
      }
    )
    return id
  }
}
