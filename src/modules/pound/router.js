const Home=(resolve) => {
    import('./components/home').then((module) => {
        resolve(module)
    })
}

const Info=(resolve) => {
    import('./components/showinfo').then((module) => {
        resolve(module)
    })
}
const routes = [
    { path: '/', name: 'home', component: Home, meta: { title: '磅单记录' }},
    { path: '/show', name: 'show', component: Info, meta: { title: '磅单详情' }},
]

export default new VueRouter({
    routes: routes
})