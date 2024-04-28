import express from "express";
import { singin, singup,google } from "../contoraler/auth.user.js";

const route =express.Router()

route.post('/sing-up',singup)
route.post('/sing-in',singin)
route.post('/google',google)




export default route;