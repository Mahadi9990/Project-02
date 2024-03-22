import express from 'express'
import {test} from '../contoraler/user.contoraler.js'

const route =express.Router()

route.use('/test',test)

export default route;