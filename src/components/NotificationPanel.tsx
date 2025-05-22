import React, { useEffect } from 'react';
import {
  Notification,
  markNotificationAsRead,
  clearAllNotifications,
  seedDemoNotifications,
} from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Props {
  notifications: Notification[];
  onClose?: () => void;
  onNotificationsUpdate?: () => void;
}

const NotificationPanel: React.FC<Props> = ({
  notifications,
  onClose,
  onNotificationsUpdate,
}) => {
  /* ─────────── seed demo on first mount ─────────── */
  useEffect(() => {
    seedDemoNotifications();
    onNotificationsUpdate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─────────── helpers ─────────── */
  const formatTime = (iso: string): string => {
    const date = new Date(iso);
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`;
    if (hrs < 24) return `${hrs} hr${hrs !== 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
    onNotificationsUpdate?.();
  };

  const handleClearAll = () => {
    clearAllNotifications();
    onNotificationsUpdate?.();
  };

  /* ─────────── icons ─────────── */
  const getIcon = (t: Notification['type']) => {
    const wrap = (cls: string, path: JSX.Element) => (
      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${cls}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          {path}
        </svg>
      </div>
    );
    switch (t) {
      case 'delay':
        return wrap('bg-yellow-100 text-yellow-500', (
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        ));
      case 'disruption':
        return wrap('bg-red-100 text-red-500', (
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        ));
      case 'promotion':
        return wrap('bg-green-100 text-green-500', (
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        ));
      case 'system':
      case 'info':
      default:
        return wrap('bg-blue-100 text-blue-500', (
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
        ));
    }
  };

  /* ─────────── render ─────────── */
  return (
    <div className="p-4 h-full flex flex-col">
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        )}
      </div>

      {/* list / empty state */}
      {notifications.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p>No notifications</p>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`rounded-lg p-3 ${
                    n.read ? 'bg-gray-50' : 'bg-white border border-primary-100'
                  }`}
                >
                  <div className="flex">
                    <div className="mr-3">{getIcon(n.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${n.read ? '' : 'font-bold'}`}>{n.title}</h3>
                        <span className="text-xs text-gray-500">{formatTime(n.timestamp)}</span>
                      </div>
                      <p className="text-sm mt-1 text-gray-600">{n.message}</p>
                      {!n.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => handleMarkAsRead(n.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator className="my-2" />

          <Button variant="outline" size="sm" className="w-full" onClick={handleClearAll}>
            Clear All
          </Button>
        </>
      )}
    </div>
  );
};

export default NotificationPanel;
