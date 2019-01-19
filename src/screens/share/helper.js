import { Toast } from 'native-base';

export default {
  showMessage(message) {
    Toast.show({
      text: message
    })
  }
}
