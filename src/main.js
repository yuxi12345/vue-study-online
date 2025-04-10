import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Elicons from "@element-plus/icons-vue";
import router from './router';

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')

for (const name in Elicons) {
  app.component(name, Elicons[name]);
}

    