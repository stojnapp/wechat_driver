const Home=(resolve) => {
    import('./components/home').then((module) => {
        resolve(module)
    })
}
const routes = [
    { path: '/', name: 'home', component: Home, meta: { title: '操作说明' }},
]

const router = new VueRouter({
    routes: routes
})

export default router;