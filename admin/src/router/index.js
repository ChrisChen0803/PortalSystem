import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import routesConfig from './config'
import store from '../store/index'
const routes = [
  {
    path:"/login",
    name: "login",
    component:Login
  },
  {
    path:"/mainbox",
    name:"mainbox",
    component:MainBox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.name==="login"){
    next()
  }
  else{
    //if login next();
    //else redirect to login
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
    }
    else{
      if(!store.state.isGetterRouter){
        //delete all mainbox routers previously created
        router.removeRoute("mainbox");
        ConfigRouter()
        next({
          path:to.fullPath
        })
      }
      else{
        next()
      }
    }
  }
})
const ConfigRouter = () =>{
  if(!router.hasRoute("mainbox")){
    router.addRoute(
      {
        path:"/mainbox",
        name:"mainbox",
        component:MainBox
      }
    )
  }
  routesConfig.forEach(item=>{
    checkPermission(item) && router.addRoute("mainbox",item)
  })
  store.commit("changeGetterRouter",true)
}
// router.addRoute("mainbox",{
//   path:"/index",
//   component:Home
// })

// router.addRoute("mainbox",{
//   path:"/center",
//   component:Center
// })

const checkPermission = (item) =>{
  if(item.requireAdmin){
    return store.state.userInfo.role===1;
  }
  return true
}


export default router
