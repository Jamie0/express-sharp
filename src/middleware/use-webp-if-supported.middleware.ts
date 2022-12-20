import { NextFunction, Request, Response } from 'express'
import { ResizeDto } from '../resize.dto'

export function useWebpIfSupported(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { dto } = res.locals as { dto: ResizeDto }

  if (!dto.format && req.headers.accept?.includes('image/webp')) {
    dto.format = 'webp'
  }

  next()
}
