import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/criptography'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hashed_string')
  },
  async compare (value: string, hash: string): Promise<boolean> {
    return true
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

  describe('compare()', () => {
    it('should call compare with correct values', async () => {
      const value = 'value'
      const hash = 'hash'
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(value, hash)
      expect(compareSpy).toHaveBeenCalledWith(value, hash)
    })

    it('should return true when compare succeeds', async () => {
      const hash = await sut.compare('any_string', 'any_hash')
      expect(hash).toBeTruthy()
    })

    it('should return false when compare falied', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => { return false })
      const hash = await sut.compare('any_string', 'any_hash')
      expect(hash).toBeFalsy()
    })

    it('shoud throw if compare throws', async () => {
      const error = new Error('any_error')
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => { throw error })
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow(error)
    })
  })
})
