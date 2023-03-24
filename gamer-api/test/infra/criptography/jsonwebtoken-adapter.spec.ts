import jwt from 'jsonwebtoken'
import { JsonWebTokenAdapter } from '@/infra/criptography'

jest.mock('jsonwebtoken', () => ({
  sign (
    payload: string | Buffer | object,
    secretOrPrivateKey: any,
    options: any,
    callback: any
  ): void {
    callback(null, 'valid_jwt')
  },
  verify (
    payload: string,
    secretOrPrivateKey: any,
    callback: any
  ): void {
    callback(null, 'valid_body')
  }
}))

describe('JsonWebTokenAdapter', () => {
  let sut: JsonWebTokenAdapter
  const expiresIn = 12
  const privateKey = 'any_key'
  const param = 'value'

  beforeEach(() => {
    sut = new JsonWebTokenAdapter(privateKey, expiresIn)
  })

  describe('generate()', () => {
    it('should call hash with correct values', async () => {
      const jwtSpy = jest.spyOn(jwt, 'sign')
      await sut.generate(param)
      expect(jwtSpy).toHaveBeenCalledWith(
        param,
        privateKey,
        { expiresIn },
        expect.any(Function))
    })

    it('should return a jwt on sucess', async () => {
      const hash = await sut.generate('any_string')
      expect(hash).toBe('valid_jwt')
    })

    it('shoud throw if jwt throws', async () => {
      const error = new Error('any_error')
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw error })
      const promise = sut.generate('any_value')
      await expect(promise).rejects.toThrow(error)
    })
  })

  describe('decode()', () => {
    it('should call hash with correct values', async () => {
      const jwtSpy = jest.spyOn(jwt, 'verify')
      await sut.decode(param)
      expect(jwtSpy).toHaveBeenCalledWith(
        param,
        privateKey,
        expect.any(Function))
    })

    it('should return a decoded jwt on sucess', async () => {
      const decoded = await sut.decode('any_string')
      expect(decoded).toBe('valid_body')
    })

    it('shoud throw if verify throws', async () => {
      const error = new Error('any_error')
      jest.spyOn(jwt, 'verify').mockImplementation(() => { throw error })
      const promise = sut.decode('any_value')
      await expect(promise).rejects.toThrow(error)
    })
  })
})
