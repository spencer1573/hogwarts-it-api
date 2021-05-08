import { Request, Response, NextFunction } from 'express'

const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  console.info('simple check called')

  return res.status(200).json({
    message: 'pong',
  })
}

export default { healthCheck }
