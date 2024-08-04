import { defineComponent } from 'vue';
import * as mdiIcons from 'mdi-vue/v3';

export default {
  install(app) {
    for (const [key, component] of Object.entries(mdiIcons)) {
      app.component(key, component);
    }
  },
};
