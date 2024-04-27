import express from 'express'
import {test,update} from '../contoraler/user.contoraler.js'
import { verifyToken } from '../utils/verifyUser.js'

const route =express.Router()

route.use('/test',test)
route.post('/update/:id',verifyToken,update)

export default route;