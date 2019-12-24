import { 
  Select,
  Option, 
  OptionGroup, 
  Input, 
  Tree, 
  Button, 
  Row, 
  Col, 
  Table, 
  Pagination, 
  TableColumn,
  Checkbox,
  CheckboxGroup, 
  DatePicker,
  Cascader,
  Loading
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Tree)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Button)
    Vue.use(Table)
    Vue.use(Pagination)
    Vue.use(TableColumn)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(DatePicker)
    Vue.use(Cascader)
    Vue.use(Loading)
  }
}
export default element