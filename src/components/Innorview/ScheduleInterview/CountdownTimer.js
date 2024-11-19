import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ duration }) => {
  const [progress, setProgress] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });

      setProgress(prevProgress => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevProgress - (100 / duration);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>
        {formatTime(timeRemaining)}
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: 'lightgrey',
          height: '20px',
          borderRadius: '10px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor:
              progress > 50 ? 'green' : progress > 20 ? 'yellow' : 'red',
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
