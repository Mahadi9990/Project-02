import express from "express";
import { singup } from "../contoraler/auth.user.js";

const route =express.Router()

route.post('/sing-up',singup)

export default route;