import { Toast } from 'native-base';
import store from '../../store';

export default {
  showMessage(message) {
    Toast.show({
      text: message
    })
  },
  fetchList (type, params) {
    return store.dispatch('FETCH_LIST_DATA', {
      type: type,
      params: { email: params }
    });
  },
  handleFormatNumber(number) {
    let customFormatNumber = new Intl.NumberFormat()
    return customFormatNumber.format(number)
  }
}
