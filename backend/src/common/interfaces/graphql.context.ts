import type { Request, Response } from "express"

export interface GraphQLContext {
  req: Request
  res: Response
  user?: {
    id: string
    email: string
    role: string
    auth0Id: string
  }
}
