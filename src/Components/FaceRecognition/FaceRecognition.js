import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img className='img' id='inputimage' src={imageURL} alt='' width='500px' height='auto'/>
        {box && box.topRow!==null && (
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              left: box.leftCol,
              bottom: box.bottomRow,
              right: box.rightCol,
              position: 'absolute',
              border: '2px solid red'
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;