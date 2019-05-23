
const Home=(resolve) => {
    import('./components/home').then((module) => {
        resolve(module)
    })
}

const Search=(resolve) => {
    import('./components/search').then((module) => {
        resolve(module)
    })
}

const routes = [
    { path: '/', name: 'home', component: Home, meta: { title: '我的运输任务' }},
    { path: '/search', name: 'search', component: Search, meta: { title: '运输任务' }},
]

const router = new VueRouter({
    routes: routes
})

export default router