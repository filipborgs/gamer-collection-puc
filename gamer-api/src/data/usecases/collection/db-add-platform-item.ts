import { Uuid } from '@/data/protocols/datatype'
import { AddPlatformItemToCollectionRepository } from '@/data/protocols/repo/collection'
import { LoadPlatformByIdGateway } from '@/data/protocols/repo/platform'
import { ItemType, PurchaseState } from '@/domain/entities'
import { AddPlatformItem, AddPlatformItemParams } from '@/domain/usecases/collection'

export class DbAddPlatformItem implements AddPlatformItem {
  constructor (
    private readonly platformRepository: LoadPlatformByIdGateway,
    private readonly collectionRepo: AddPlatformItemToCollectionRepository,
    private readonly uuid: Uuid
  ) {}

  async add (params: AddPlatformItemParams): Promise<string> {
    const { itemId, purchaseDate, purchasePrice, userId, box, cables, joysticks, manual, sealed } = params
    const platform = await this.platformRepository.loadById(itemId)
    if (!platform) return null

    const purchaseState = PurchaseState[params.purchaseState]
    const { name } = platform

    const id = this.uuid.generate()
    await this.collectionRepo.addPlatform(
      {
        id,
        itemId,
        userId,
        name,
        type: ItemType.PLATFROM,
        purchaseDate,
        purchasePrice,
        purchaseState,
        box,
        cables,
        joysticks,
        manual,
        sealed
      }
    )
    return id
  }
}
