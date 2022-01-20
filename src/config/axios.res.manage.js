import $eventBus from '../assets/js/event_bus'
import {
  AlertModule
} from 'vux'

export default {
  dealSuc(res) {
    /*
     * 在返回数据之前做些什么
     */
    if (res.data.code === 500) { // 通用错误
      $eventBus.$emit('vux-toast', {
        state: true,
        text: res.data.msg,
        type: 'text'
      });
      return false
    }

    return res.data
  }
}
