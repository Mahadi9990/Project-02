import express from 'express'
import {update,deleteUser,singOut} from '../contoraler/user.contoraler.js'
import { verifyToken } from '../utils/verifyUser.js'

const route =express.Router()

route.post('/update/:id',verifyToken,update)
route.delete('/delete/:id',verifyToken,deleteUser)
route.get('/singout',singOut)



export default route;