import PushNotification from 'react-native-push-notification';

const NotificationComponent = (id, message, description, date) => {
  PushNotification.localNotificationSchedule({
    id: id.toString().substring(6),
    // title: 'title',
    // autoCancel: true,
    bigText: description,
    // 'This is local notification demo in React Native app. Only shown, when expanded.',
    // subText: 'Local Notification Demo',
    title: message,
    message: description,
    date: new Date(date),
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    // actions: '["Read Now", "Read Later"]',
  });
};

export default NotificationComponent;
