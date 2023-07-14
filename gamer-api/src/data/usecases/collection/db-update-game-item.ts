import { UpdateGameItemByIdRepository } from '@/data/protocols/repo/collection'
import { PurchaseState } from '@/domain/entities'
import { UpdateGameCollectionItem, UpdateGameItemParams } from '@/domain/usecases/collection'

export class DbUpdateGameCollectionItem implements UpdateGameCollectionItem {
  constructor (private readonly collectionRepo: UpdateGameItemByIdRepository) {}

  async update (params: UpdateGameItemParams): Promise<boolean | null> {
    const purchaseState = PurchaseState[params.purchaseState]
    const { id, purchaseDate, purchasePrice, manual, disk, cover, sealed } = params

    return await this.collectionRepo.updateById({
      id,
      purchaseState,
      purchaseDate,
      purchasePrice,
      manual,
      disk,
      cover,
      sealed
    })
  }
}
