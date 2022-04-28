import { createApp } from 'vue'
import Vue from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { CaretRight } from "@element-plus/icons-vue";

const app = createApp(App)
app.config.globalProperties.$axios = axios
axios.defaults.baseURL = 'http://localhost:5000/api/'
app.use(store).use(router).use(VueAxios, axios).use(ElementPlus).mount('#app')

app.component('CaretRight', {
    template: CaretRight
})
