import { UpdatePlatformItemByIdRepository } from '@/data/protocols/repo/collection'
import { PurchaseState } from '@/domain/entities'
import { UpdatePlatformCollectionItem, UpdatePlatformItemParams } from '@/domain/usecases/collection'

export class DbUpdatePlatformCollectionItem implements UpdatePlatformCollectionItem {
  constructor (private readonly collectionRepo: UpdatePlatformItemByIdRepository) {}

  async update (params: UpdatePlatformItemParams): Promise<boolean | null> {
    const purchaseState = PurchaseState[params.purchaseState]
    const { id, purchaseDate, purchasePrice, manual, sealed, box, cables, joysticks } = params

    return await this.collectionRepo.updateById({
      id,
      purchaseState,
      purchaseDate,
      purchasePrice,
      manual,
      box,
      cables,
      joysticks,
      sealed
    })
  }
}
