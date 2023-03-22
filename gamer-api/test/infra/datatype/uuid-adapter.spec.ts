import { UuidAdapter } from '@/infra/datatype'
import uuid from 'uuid'

jest.mock('uuid', () => ({
  v4 (): string {
    return 'any_uuid'
  }
}))

describe('UuidAdapter', () => {
  let sut: UuidAdapter

  beforeEach(() => {
    sut = new UuidAdapter()
  })

  describe('generate()', () => {
    it('should call v4 with no params', async () => {
      const v4Spy = jest.spyOn(uuid, 'v4')
      sut.generate()
      expect(v4Spy).toHaveBeenCalledWith()
    })

    it('should return a uuid on success', async () => {
      const uuid = sut.generate()
      expect(uuid).toBe('any_uuid')
    })

    it('shoud throw if v4 throws', async () => {
      const error = new Error('any_error')
      jest.spyOn(uuid, 'v4').mockImplementation(() => { throw error })
      try {
        sut.generate()
      } catch (e) {
        expect(e).toEqual(error)
      }
    })
  })
})
