import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/criptography'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hashed_string')
  }
}))

describe('Bcrypt Adapter', () => {
  let sut: BcryptAdapter
  const salt = 12

  beforeEach(() => {
    sut = new BcryptAdapter(salt)
  })

  describe('hash()', () => {
    it('should call hash with correct values', async () => {
      const param = 'value'
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(param)
      expect(hashSpy).toHaveBeenCalledWith(param, salt)
    })

    it('should return a hash on sucess', async () => {
      const hash = await sut.hash('any_string')
      expect(hash).toBe('hashed_string')
    })

    it('shoud throw if hash throws', async () => {
      const error = new Error('any_error')
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => { throw error })
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow(error)
    })
  })
})
