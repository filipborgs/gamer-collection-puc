import igdb from 'igdb-api-node'

export const IgdbHelper = {
  client: null as any,

  async connect (clientId: string, token: string): Promise<void> {
    if (!this.client) {
      this.client = igdb(clientId, token)
    }
  },

  getClient () {
    return this.client
  }
}
