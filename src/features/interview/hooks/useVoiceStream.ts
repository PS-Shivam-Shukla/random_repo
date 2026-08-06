import { useCallback, useEffect, useRef } from 'react';
import { useInterviewStore } from '../store/InterviewStore';
import { useNotification } from '../../../hooks/useNotification';

export function useVoiceStream() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const { micStatus, setMicStatus, setMicLevel, setAIState } = useInterviewStore();
  const notify = useNotification();

  const stopMicrophone = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.disconnect();
      } catch {
        // Ignore disconnect errors
      }
      sourceNodeRef.current = null;
    }

    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch {
        // Ignore disconnect errors
      }
      analyserRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch {
        // Ignore close errors
      }
      audioContextRef.current = null;
    }

    setMicLevel(0);
    setMicStatus('OFF');
    setAIState('IDLE');
  }, [setMicLevel, setMicStatus, setAIState]);

  const startMicrophone = useCallback(async () => {
    // If already active or requesting, do nothing
    if (mediaStreamRef.current?.active) return;

    setMicStatus('REQUESTING');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      sourceNodeRef.current = source;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateLevel = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((acc, val) => acc + val, 0);
        const average = sum / dataArray.length;
        const normalizedLevel = Math.min(100, Math.round((average / 128) * 100));

        setMicLevel(normalizedLevel);

        if (normalizedLevel > 20) {
          setAIState('LISTENING');
        }

        animationFrameRef.current = requestAnimationFrame(updateLevel);
      };

      updateLevel();
      setMicStatus('ON');
    } catch (err) {
      console.warn('Microphone permission denied or unavailable', err);
      stopMicrophone();
      setMicStatus('ERROR');
      notify.error('Microphone Permission Denied', 'Please grant microphone access in your browser to enable voice interaction.');
    }
  }, [setMicStatus, setMicLevel, setAIState, stopMicrophone, notify]);

  const toggleMicrophone = useCallback(() => {
    if (micStatus === 'ON' || micStatus === 'REQUESTING') {
      stopMicrophone();
    } else {
      startMicrophone();
    }
  }, [micStatus, startMicrophone, stopMicrophone]);

  // Clean up all tracks and audio contexts on component unmount ONLY
  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, [stopMicrophone]);

  return {
    micStatus,
    startMicrophone,
    stopMicrophone,
    toggleMicrophone,
    isMicActive: micStatus === 'ON',
  };
}
