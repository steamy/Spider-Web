import Vue from 'vue'
import { Select, Option, Loading, Table, TableColumn } from 'element-ui'

// import locale from 'element-ui/lib/locale/lang/en'

export default () => {
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Loading)
  Vue.use(Table)
  Vue.use(TableColumn)
}
