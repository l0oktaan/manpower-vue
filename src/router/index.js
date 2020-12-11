import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import DashBoard from '../views/DashBoard.vue'
import Division from '../views/Division.vue'
import Position from '../views/Position.vue'
import Employee from '../views/Employee.vue'
import PositionEmpty from '../views/PositionEmpty.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/empty',
    name: 'PositionEmpty',
    component: PositionEmpty
  },
  {
    path: '/division',
    name: 'Division',
    component: Division
  },
  {
    path: '/position',
    name: 'Position',
    component: Position
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
