import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'
import NewsAdd from '../views/news-management/NewsAdd.vue'
import NewsList from '../views/news-management/NewsList.vue'
import ProductAdd from '../views/product-management/ProductAdd.vue'
import ProductList from '../views/product-management/ProductList.vue'
import UserAdd from '../views/user-management/UserAdd.vue'
import UserList from '../views/user-management/UserList.vue'
import NotFound from '../views/notfound/NotFound.vue'
import NewsEdit from '../views/news-management/NewsEdit.vue'
import ProductEdit from '../views/product-management/ProductEdit.vue'

const routes = [
    {
        path:"/index",
        component:Home
    },
    {
        path:"/center",
        component:Center
    },
    {
        path:"/news-management/addnews",
        component:NewsAdd
    },
    {
        path:"/news-management/newslist",
        component:NewsList
    },
    {
        path:"/news-management/editnews/:id",
        component:NewsEdit
    },
    {
        path:"/product-management/editproduct/:id",
        component:ProductEdit
    },
    {
        path:"/product-management/addproduct",
        component:ProductAdd
    },
    {
        path:"/product-management/productlist",
        component:ProductList
    },
    {
        path:"/user-management/adduser",
        component:UserAdd,
        requireAdmin:true
    },
    {
        path:"/user-management/userlist",
        component:UserList,
        requireAdmin:true
    },
    {
        path:"/",
        redirect:"/index"
    },
    {
        path:"/:pathMatch(.*)*",
        name:"Notfound",
        component:NotFound
    }
];
export default routes;