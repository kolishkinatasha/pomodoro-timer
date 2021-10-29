import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from '../Buttons/PauseButton';
import PlayButton from '../Buttons/PlayButton';
import SettingsButton from '../Buttons/SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import './Timer.css';
import SettingsContext from '../../Context/SettingsContext';

const red = '#bc414a';
const green = '#353f35';

function Timer() {
    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); // work/break/null
    const [secondsLeft, setSecondsLeft] = useState(0);
  
    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
  
    function tick() {
      secondsLeftRef.current--;
      setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

        function switchMode() {
          const nextMode = modeRef.current === 'work' ? 'break' : 'work';
          const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
    
          setMode(nextMode);
          modeRef.current = nextMode;
    
          setSecondsLeft(nextSeconds);
          secondsLeftRef.current = nextSeconds;
        }
    
        secondsLeftRef.current = settingsInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);
    
        const interval = setInterval(() => {
          if (isPausedRef.current) {
            return;
          }
          if (secondsLeftRef.current === 0) {
            return switchMode();
          }
    
          tick();
        },1000);
    
        return () => clearInterval(interval);
      }, [settingsInfo]);

    const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+seconds;

    return (
        <div>
            <div className='btns'>
            {isPaused 
                ? <PlayButton onClick={() => {
                    setIsPaused(false);
                    isPausedRef.current = false }}/> 
                : <PauseButton onClick={() => {
                    setIsPaused(true);
                    isPausedRef.current = true }}/>}         
            <div>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
            </div>
            </div>
            
            <CircularProgressbar 
                value={percentage} 
                text={`${minutes} : ${seconds}`} 
                styles={buildStyles({
                    textColor:'#fff',
                    pathColor: mode === 'work' ? red : green,
                    trailColor: 'rgba(255,255,255,.1)',
                    strokeLinecap: 'butt',

            })}/>
        </div>
        
    )
}

export default Timer