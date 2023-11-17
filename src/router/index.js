import { createRouter, createWebHashHistory } from 'vue-router'
import UserListView from '../views/UserListView.vue'

const routes = [
  {
    path: '/',
    name: 'user-list',
    component: UserListView
  },
  {
    path: '/add-user',
    name: 'add-user',
    component: () => import(/* webpackChunkName: "add-user" */ '../views/AddUserView.vue')
  },
  {
    path: '/update-user/:id',
    name: 'update-user',
    component: () => import(/* webpackChunkName: "update-user" */ '../views/UpdateUserView.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
