const Home=(resolve) => {
    import('./components/home').then((module) => {
        resolve(module)
    })
}

const routes = [
    { path: '/', name: 'home', component: Home, meta: { title: '网点查询' }},
]

export default new VueRouter({
    routes: routes
})