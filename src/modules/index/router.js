
const Home=(resolve) => {
    import('./components/home').then((module) => {
        resolve(module)
    })
}

const SendCar=(resolve) => {
    import('./components/sendcar').then((module) => {
        resolve(module)
    })
}

const routes = [
    { path: '/home', name: 'home', component: Home, meta: { title: '我的任务' }},
    { path: '/sendcar', name: 'sendcar', component: SendCar, meta: { title: '发车' }},
]

const router = new VueRouter({
    routes: routes
})
router.beforeEach((to, from, next) => {
    next();
})


export default router