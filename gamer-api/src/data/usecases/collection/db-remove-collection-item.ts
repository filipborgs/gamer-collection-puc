import { RemoveCollectionItemByIdRepository } from '@/data/protocols/repo/collection'
import { DeleteError } from '@/domain/entities'
import { RemoveCollectionItem } from '@/domain/usecases/collection'

export class DbRemoveCollectionItem implements RemoveCollectionItem {
  constructor (private readonly collectionRepo: RemoveCollectionItemByIdRepository) {}

  async remove (id: string): Promise<void> {
    const deleted = await this.collectionRepo.removeById(id)
    if (!deleted) throw new DeleteError()
  }
}
