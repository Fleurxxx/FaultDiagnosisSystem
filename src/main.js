/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-05-30 20:36:57
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-07 22:44:17
 * @FilePath: \maintenance\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import router from "./router"
import App from './App.vue'
import Vuex from 'vuex'

//全局引入mock(这里只需要这一行引入)
import "./mock/index.js";

// ======= iView
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

// ======= pinia
import { createPinia } from 'pinia'
const state = createPinia()

// ======= awesome字体图标
import 'font-awesome/css/font-awesome.min.css'

// ======= codemirror编辑器
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// import "codemirror/addon/hint/show-hint.css";


// ======= echarts
import * as echarts from 'echarts'
import 'echarts-gl'

// ======= element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// main.js:注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import JsonViewer from 'vue-json-viewer'

//Driver页面分步引导
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'


const app = createApp(App)

app.config.globalProperties.$echarts = echarts
// app.prototype.$echarts = echarts

// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


import zhCn from 'element-plus/dist/locale/zh-cn'
zhCn.el.pagination.total = '共 ' + '{total}' + ' 条';

// 引入 mavon-editor
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'

//挂载
app.use(router)
    .use(Vuex)
    .use(state)
    .use(ElementPlus, { locale: zhCn })
    .use(VueCodeMirror)
    .use(JsonViewer)
    .use(ViewUIPlus)
    // .use(mavonEditor)
    .mount('#app');