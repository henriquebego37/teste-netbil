import { notification } from 'antd';

export function Notification(notificationBody) {
  notification[notificationBody.type]({
    message: notificationBody.title,
    description: notificationBody.description,
  });
}
