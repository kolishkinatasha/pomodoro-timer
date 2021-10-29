import './App.css';
import Settings from '../Settings';
import Timer from '../Timer';
import { useState } from 'react';
import SettingsContext from '../../Context/SettingsContext';

const App = () => {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
       <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes, 
        setBreakMinutes
      }}>
      <div className='wrapper'>
        {showSettings ?  <Settings/> : <Timer/>} 
      </div>
        
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
