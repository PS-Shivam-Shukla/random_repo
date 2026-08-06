import { useNotificationStore } from '../stores/NotificationStore';

export function useNotification() {
  const { addNotification, removeNotification, clearNotifications } = useNotificationStore();

  return {
    success: (title: string, message?: string) => addNotification({ type: 'success', title, message }),
    error: (title: string, message?: string) => addNotification({ type: 'error', title, message }),
    warning: (title: string, message?: string) => addNotification({ type: 'warning', title, message }),
    info: (title: string, message?: string) => addNotification({ type: 'info', title, message }),
    remove: removeNotification,
    clear: clearNotifications,
  };
}
