const Home=(resolve) => {
    import('./components/home').then((module) => {
        resolve(module)
    })
}

const ChangeBinding=(resolve) => {
    import('./components/changephone').then((module) => {
        resolve(module)
    })
}
const routes = [
    { path: '/', name: 'home', component: Home, meta: { title: '我的手机号' }},
    { path: '/changebind', name: 'changebind', component: ChangeBinding, meta: { title: '绑定手机号' }},
]

const router = new VueRouter({
    routes: routes
})

export default router;