export class DeleteError extends Error {
  constructor (message?: string) {
    super(message || 'Delete failed')
    this.name = 'DeleteError'
  }
}
