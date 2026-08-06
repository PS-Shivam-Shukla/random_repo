import React from 'react';
import { RefreshCw, WifiOff, ShieldAlert, FileQuestion, ServerCrash, Clock } from 'lucide-react';
import { Button } from './Button';
import { Card, CardContent } from './Card';

export interface ErrorCardProps {
  title?: string;
  message?: string;
  code?: '500' | '403' | '404' | 'OFFLINE' | 'TIMEOUT' | 'WEBSOCKET_DISCONNECTED' | string;
  onRetry?: () => void;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({
  title,
  message,
  code = '500',
  onRetry,
}) => {
  const getIcon = () => {
    switch (code) {
      case '403':
        return <ShieldAlert className="w-8 h-8 text-amber-400" />;
      case '404':
        return <FileQuestion className="w-8 h-8 text-indigo-400" />;
      case 'OFFLINE':
      case 'WEBSOCKET_DISCONNECTED':
        return <WifiOff className="w-8 h-8 text-rose-400" />;
      case 'TIMEOUT':
        return <Clock className="w-8 h-8 text-amber-400" />;
      case '500':
      default:
        return <ServerCrash className="w-8 h-8 text-rose-400" />;
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (code) {
      case '403':
        return '403 Forbidden Access';
      case '404':
        return '404 Resource Not Found';
      case 'OFFLINE':
        return 'Network Connection Offline';
      case 'WEBSOCKET_DISCONNECTED':
        return 'Real-Time WebSocket Disconnected';
      case 'TIMEOUT':
        return 'Request Timeout';
      case '500':
      default:
        return '500 Internal Backend Error';
    }
  };

  const getMessage = () => {
    if (message) return message;
    switch (code) {
      case '403':
        return 'You do not have sufficient permissions to view this resource.';
      case '404':
        return 'The requested interview or resume record does not exist.';
      case 'OFFLINE':
        return 'Please check your network connection and try again.';
      case 'WEBSOCKET_DISCONNECTED':
        return 'The real-time streaming audio connection dropped. Reconnecting...';
      case 'TIMEOUT':
        return 'The backend service took too long to respond.';
      case '500':
      default:
        return 'An unhandled server exception occurred while communicating with FastAPI.';
    }
  };

  return (
    <Card className="border-rose-900/40 bg-slate-900 shadow-xl my-4">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
          {getIcon()}
        </div>
        <div className="space-y-1 max-w-md">
          <h3 className="text-base font-bold text-slate-100">{getTitle()}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{getMessage()}</p>
        </div>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Retry Request
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
