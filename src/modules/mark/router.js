import store from '@/store/store'
import {vantTool} from '@/function/commonTools'
const Home=(resolve) => {
    import('./components/home').then((module) => {
        resolve(module)
    })
}

const List=(resolve) => {
    import('./components/marklist').then((module) => {
        resolve(module)
    })
}

const Show=(resolve) => {
    import('./components/markshow').then((module) => {
        resolve(module)
    })
}

const routes = [
    { path: '/', name: 'home', component: List, meta: { title: '备案' }},
    { path: '/add', name: 'add', component: Home, meta: { title: '备案' }},
    { path: '/show', name: 'show', component: Show, meta: { title: '备案详情' }}
]

const router= new VueRouter({
    routes: routes
})

router.beforeEach((to, from, next) => {
   next()
})

export default router;