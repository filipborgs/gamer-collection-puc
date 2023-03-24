import { type NextFunction, type Request, type Response } from 'express'
import { type HttpRequest } from '@/presentation/protocols'
import { type Middleware } from '@/presentation/protocols/middleware'

export const adaptMiddleware = (middleware: Middleware) => async (req: Request, res: Response, next: NextFunction) => {
  const request: HttpRequest = {
    headers: { ...(req.headers || {}) }
  }
  const httpResponse = await middleware.handle(request)
  if (httpResponse.statusCode === 200) {
    Object.assign(req, httpResponse.body)
    next()
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}
