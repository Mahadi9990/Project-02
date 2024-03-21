import express from 'express'
import {test} from '../contoraler/user.contoraler.js'

const route =express.Router()

route.use('/list',test)

export default route;