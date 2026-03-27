import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const intervalRef = useRef(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (appState.current === 'active') {
          setElapsedTime((prev) => prev + 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startTimer = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setStartTime(null);
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setStartTime(null);
    setIsRunning(false);
  };

  return (
    <TimerContext.Provider
      value={{
        elapsedTime,
        isRunning,
        startTime,
        startTimer,
        stopTimer,
        resetTimer,
        setElapsedTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
