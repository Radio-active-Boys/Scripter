import React from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <div className="box" onClick={() => handleClick('/code-uploader')}>
        <div className="box-img img1"></div>
        <div className="box-name">Code Uploader</div>
        <div className="popup">Go to Code Uploader</div>
      </div>
      <div className="box" onClick={() => handleClick('/arduino')}>
        <div className="box-img img2"></div>
        <div className="box-name">Arduino Simulator</div>
        <div className="popup">Go to Arduino Simulator</div>
      </div>
      <div className="box" onClick={() => handleClick('/modeller')}>
        <div className="box-img img3"></div>
        <div className="box-name">Design 3D</div>
        <div className="popup">Go to 3D design</div>
      </div>
    </div>
  );
};

export default MainPage;
