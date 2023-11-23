import { Router } from 'express'
import usersRouter from './users'
import listsRouter from './lists'
import giftsRouter from './gifts'

const v1Router = Router()

v1Router.use('/users', usersRouter)
v1Router.use('/lists', listsRouter)
v1Router.use('/gifts', giftsRouter)

export default v1Router