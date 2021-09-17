import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyProfile from '../views/MyProfile.vue'
import block from '../views/Block'
import friend from '../views/Friend'
import HomePage from '../views/HomePage'
import Userinfo from '../views/Userinfo'
import follower from '../views/LikedMe'
import Chat from '../views/Chat'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/my_profile',
        name: 'MyProfile',
        component: MyProfile
    },

    {
        path: '/blockedUsers',
        name: 'block',
        component: block
    },
    {
        path: '/favUsers',
        name: 'friend',
        component: friend
    },
    {
        path: '/homepage',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/followersList',
        name: 'follower',
        component: follower
    },
    {
        path: '/userinfo',
        name: 'Userinfo',
        component: Userinfo,
        props: true
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router