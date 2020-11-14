import PushNotification from 'react-native-push-notification';

const NotificationComponent = (message) => {
  PushNotification.localNotificationSchedule({
    id: '1',
    // title: 'title',
    // autoCancel: true,
    // bigText:
    // 'This is local notification demo in React Native app. Only shown, when expanded.',
    // subText: 'Local Notification Demo',
    title: 'Scheduled File',
    message: 'TASK REMINDER',
    // date: new Date(Date.now() + time * 1000),
    vibrate: true,
    vibration: 300,
    playSound: true,
    // soundName: 'default',
    // actions: '["Read Now", "Read Later"]',
  });
};

export default NotificationComponent;
