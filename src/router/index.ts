import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Device from '../views/device/DeviceView.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'Device',
    component: Device,
  },
  {
    path: '/device/unit',
    name: 'unit',
    component: () => import('../views/device/UnitView.vue')
  },
  {
    path: '/device/site',
    name: 'site',
    component: () => import('../views/device/SiteView.vue')
  },

  {
    path: '/model/image',
    name: 'image',
    component: () => import('../views/model/ImageView.vue')
  },
  {
    path: '/model/drill',
    name: 'drill',
    component: () => import('../views/model/DrillView.vue')
  },
  {
    path: '/model/list',
    name: 'list',
    component: () => import('../views/model/ListView.vue')
  },


  {
    path: '/farmer',
    name: 'farmer',
    component: () => import('../views/FarmerView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView.vue')
  },
  {
    path: '/basedata/price',
    name: 'price',
    component: () => import('../views/basedata/PriceView.vue')
  },
  {
    path: '/basedata/area',
    name: 'area',
    component: () => import('../views/basedata/AreaNewView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
