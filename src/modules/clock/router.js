const Home=(resolve) => {
    import('./components/home').then((module) => {
        resolve(module)
    })
}

const List=(resolve) => {
    import('./components/list').then((module) => {
        resolve(module)
    })
}
const routes = [
    { path: '/list', name: 'list', component: Home, meta: { title: '打卡记录' }},
    { path: '/', name: 'home', component: List, meta: { title: '打卡记录' }},
]

export default new VueRouter({
    routes: routes
})