import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"
export default function Private() {
    const {currenUser} =useSelector((state)=>state.user)
  return currenUser?<Outlet/>:<Navigate to={'/sing-in'}/>
}
