import {
  Loading,
  Notify,
  QSpinner,
} from 'quasar';

export function showLoading(message: string) {
  Loading.show({
    message: message,
    spinner: QSpinner,
    spinnerColor: 'primary',
  });
}

export function hideLoading() {
  Loading.hide();
}

export function showNegativeNotify(
  message: string,
) {
  Notify.create({
    message: message,
    type: 'negative',
    actions: [
      {
        icon: 'close',
        color: 'white',
      },
    ],
  });
}

export function showWarningNotify(
  message: string,
) {
  Notify.create({
    message: message,
    timeout: 1000,
    type: 'warning',
    actions: [
      {
        icon: 'close',
        color: 'white',
      },
    ],
  });
}

export function showPositiveNotify(
  message: string,
) {
  Notify.create({
    message: message,
    type: 'positive',
    timeout: 2000,
    actions: [
      {
        icon: 'close',
        color: 'white',
      },
    ],
  });
}
