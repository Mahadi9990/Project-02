import express from "express";
import { singin, singup } from "../contoraler/auth.user.js";

const route =express.Router()

route.post('/sing-up',singup)
route.post('/sing-in',singin)


export default route;