import express from 'express'
import {update,deleteUser,singOut,list,listing,deleteList,getList,updateList} from '../contoraler/user.contoraler.js'
import { verifyToken } from '../utils/verifyUser.js'

const route =express.Router()

route.post('/update/:id',verifyToken,update)
route.delete('/delete/:id',verifyToken,deleteUser)
route.get('/singout',singOut)
route.post('/list',verifyToken,list)
route.get('/listing/:id',verifyToken,listing)
route.delete('/deleteList/:id',verifyToken,deleteList)
route.get('/get/:id',getList)
route.post('/updateList/:id',verifyToken,updateList)








export default route;