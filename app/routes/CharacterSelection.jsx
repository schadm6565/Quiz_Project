import React, { useState } from 'react';
import Quiz from './Quiz';
import { Link } from '@remix-run/react';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import hat1 from '../images/hat1.png';
import hat2 from '../images/hat2.png';
import hat3 from '../images/hat3.png';
import maleHat1 from '../images/male_hat1.png';
import maleHat2 from '../images/male_hat2.png';
import maleHat3 from '../images/male_hat3.png';
import femaleHat1 from '../images/female_hat1.png';
import femaleHat2 from '../images/female_hat2.png';
import femaleHat3 from '../images/female_hat3.png';

const AvatarSelection = ({ onSelectAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedHat, setSelectedHat] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onSelectAvatar(avatar);
    setSelectedHat(null);
  };

  const handleHatSelect = (hat) => {
    setSelectedHat(hat);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const getAvatarImage = () => {
    if (selectedAvatar === 'male') {
      return maleAvatar;
    } else if (selectedAvatar === 'female') {
      return femaleAvatar;
    }
    return null;
  };

  const getHatImage = () => {
    if (selectedAvatar === 'male') {
      switch (selectedHat) {
        case 'hat1':
          return maleHat1;
        case 'hat2':
          return maleHat2;
        case 'hat3':
          return maleHat3;
        default:
          return null;
      }
    } else if (selectedAvatar === 'female') {
      switch (selectedHat) {
        case 'hat1':
          return femaleHat1;
        case 'hat2':
          return femaleHat2;
        case 'hat3':
          return femaleHat3;
        default:
          return null;
      }
    }
    return null;
  };

  if (showQuiz) {
    return <Quiz selectedAvatar={selectedAvatar} selectedHat={selectedHat} getHatImage={getHatImage} getAvatarImage={getAvatarImage} />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 20px' }}>
        <h2 style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '2rem', fontWeight: 'bold', color: '#333', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Choose Your Avatar</h2>
        <div className="avatar-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <img
              src={maleAvatar}
              alt="Male Avatar"
              className={selectedAvatar === 'male' ? 'selected' : ''}
              onClick={() => handleAvatarSelect('male')}
              style={{ width: '200px', height: '200px', marginRight: '20px', cursor: 'pointer' }}
            />
            <img
              src={femaleAvatar}
              alt="Female Avatar"
              className={selectedAvatar === 'female' ? 'selected' : ''}
              onClick={() => handleAvatarSelect('female')}
              style={{ width: '200px', height: '200px', cursor: 'pointer' }}
            />
          </div>
          {selectedAvatar && (
            <div className="hats" style={{ marginTop: '10px' }}>
              <h3 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Arial, sans-serif', color: '#333', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Choose Your Hat</h3>
              <div style={{ display: 'flex' }}>
                <img
                  src={hat1}
                  alt="Hat 1"
                  className={selectedHat === 'hat1' ? 'selected' : ''}
                  onClick={() => handleHatSelect('hat1')}
                  style={{ width: '100px', height: '100px', marginRight: '20px', cursor: 'pointer' }}
                />
                <img
                  src={hat2}
                  alt="Hat 2"
                  className={selectedHat === 'hat2' ? 'selected' : ''}
                  onClick={() => handleHatSelect('hat2')}
                  style={{ width: '100px', height: '100px', marginRight: '20px', cursor: 'pointer' }}
                />
                <img
                  src={hat3}
                  alt="Hat 3"
                  className={selectedHat === 'hat3' ? 'selected' : ''}
                  onClick={() => handleHatSelect('hat3')}
                  style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedAvatar && selectedHat && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-100px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '-60px' }}>
            <img
              src={getHatImage()}
              alt="Selected Hat"
              style={{ width: '350px', height: '480px' }}
            />
          </div>
          <button
            className="mt-8 inline-block rounded-full bg-anxpurple-700 px-16 py-4 font-montserrat text-white hover:bg-anxwhite-300 hover:text-anxgreen-300 hover:shadow-xl"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarSelection;
