import { ConflictError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (body: any): HttpResponse => ({
  statusCode: 201,
  body
})

export const noContent = (): HttpResponse => ({
  statusCode: 204
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const conflict = (): HttpResponse => ({
  statusCode: 409,
  body: new ConflictError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
