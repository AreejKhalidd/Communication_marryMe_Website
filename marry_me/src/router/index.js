import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyProfile from '../views/MyProfile.vue'
import block from '../views/Block'
import friend from '../views/Friend'
import HomePage from '../views/HomePage'
import Userinfo from '../views/Userinfo'
import follower from '../views/LikedMe'
import CertifyMe from '../views/CertifyMe'
import requests from '../views/Request'
import questions from '../views/Quizzes'
import SearchResult from '../views/SearchResult'
import Userinfoforsearch from '../views/Userinfoforsearch'
import Login from '../views/Login';
import ResetPassword from '../views/ResetPassword';
import Register from '../views/Register';
import ForgotPassword from '../views/ForgotPassword';

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
        path: '/certifyme',
        name: 'CertifyMe',
        component: CertifyMe,
    },
    { 
        path: '/allRequests',
        name: 'requests',
        component: requests
    },
    {
        path: '/questions',
        name: 'questions',
        component: questions
    },
    {
        path: '/searchResult',
        name: 'SearchResult',
        component: SearchResult,
        props: true
    },
    {
        path: '/userinfoforsearch',
        name: 'Userinfoforsearch',
        component: Userinfoforsearch,
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: ForgotPassword,
    },
    {
        path: '/resetpassword',
        name: 'ResetPassword',
        component: ResetPassword,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router