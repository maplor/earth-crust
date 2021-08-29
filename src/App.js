import { useState } from 'react';
import { Slider } from 'antd';
import logo from './logo.svg';
import Github from './github.jsx';
import './App.css';
import VideoPlayer from './VideoPlayer';

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="App">
      <div className="bg">
        <VideoPlayer url="/test.mp4" duration={4.876191} progress={progress} />
      </div>
      <div className="slider">
        <Slider
          value={progress}
          onChange={setProgress}
          marks={{
            0: 0,
            100: 100,
          }}
        />
      </div>
      <div className="logo">
        <img className="App-logo" src={logo} alt="logo" />
        @Maplor
      </div>
      <a className="github" href="https://github.com/maplor/earth-crust" target="_blank" rel="noreferrer">
        <Github />
      </a>
    </div>
  );
}

export default App;
