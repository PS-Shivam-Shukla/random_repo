import { useEffect, useRef } from 'react';
import { ENV } from '../../../config/env.config';
import { useInterviewStore } from '../store/InterviewStore';

export function useInterviewWebSocket(interviewId?: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const pingStartTimeRef = useRef<number>(0);
  const reconnectAttemptsRef = useRef<number>(0);

  const {
    setWsConnected,
    setLatencyMs,
    setAIState,
    addTranscriptEntry,
    updateMetrics,
  } = useInterviewStore();

  useEffect(() => {
    if (!interviewId) return;

    const token = localStorage.getItem(ENV.TOKEN_KEY)?.replace(/^"|"$/g, '') || '';
    const wsUrl = `${ENV.WS_BASE_URL}/ws/interviews/${interviewId}?token=${encodeURIComponent(token)}`;

    let pingInterval: any;

    const connectWS = () => {
      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          setWsConnected(true);
          reconnectAttemptsRef.current = 0;

          pingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              pingStartTimeRef.current = Date.now();
              ws.send(JSON.stringify({ type: 'PING' }));
            }
          }, 5000);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === 'PONG') {
              const rtt = Date.now() - pingStartTimeRef.current;
              setLatencyMs(rtt);
            } else if (data.type === 'AI_STATE_CHANGE') {
              setAIState(data.state);
            } else if (data.type === 'AI_SPEECH_CHUNK' || data.type === 'TRANSCRIPT_ENTRY') {
              addTranscriptEntry({
                id: data.id || Math.random().toString(36).substring(2, 9),
                speaker: data.speaker || 'AI',
                text: data.text || '',
                timestamp: data.timestamp || new Date().toISOString(),
              });
            } else if (data.type === 'METRICS_UPDATE') {
              updateMetrics(data.metrics);
            }
          } catch (e) {
            console.warn('Error parsing WS message', e);
          }
        };

        ws.onclose = () => {
          setWsConnected(false);
          clearInterval(pingInterval);

          if (reconnectAttemptsRef.current < 5) {
            reconnectAttemptsRef.current += 1;
            setTimeout(connectWS, 3000);
          }
        };

        ws.onerror = () => {
          setWsConnected(false);
        };
      } catch (e) {
        console.warn('WebSocket connection error', e);
      }
    };

    connectWS();

    return () => {
      clearInterval(pingInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [interviewId]);

  const sendEvent = (eventData: object) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(eventData));
    }
  };

  return { sendEvent };
}
