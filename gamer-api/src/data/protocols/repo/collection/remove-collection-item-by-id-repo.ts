export interface RemoveCollectionItemByIdRepository {
  removeById: (id: string) => Promise<boolean>
}
