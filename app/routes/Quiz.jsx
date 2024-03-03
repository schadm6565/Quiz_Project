import React, { useState, useEffect } from 'react';
import sad from '../images/sad.png';
import happy from '../images/happy.png';

const questions = [
  {
    question: 'Which of the following is a common physical symptom of anxiety?',
    options: ['Stomach ache', 'Headache', 'Sneezing', 'Toothache'],
    correctAnswer: 'Stomach ache'
  },
  {
    question: 'What is the name of the feeling you get when you are worried or scared about something?',
    options: ['Happiness', 'Excitement', 'Anxiety', 'Sleepiness'],
    correctAnswer: 'Anxiety'
  },
  {
    question: 'What can you do when you feel anxious to help yourself feel better?',
    options: ['Talk to a friend or family member', 'Watch TV all day', 'Eat lots of candy', 'Ignore your feelings'],
    correctAnswer: 'Talk to a friend or family member'
  },
  {
    question: 'Which of the following activities can help you relax and calm down when you are feeling anxious?',
    options: ['Deep breathing exercises', 'Running around and screaming', 'Eating fast food', 'Playing video games for hours'],
    correctAnswer: 'Deep breathing exercises'
  },
  {
    question: 'What is a common trigger for anxiety?',
    options: ['Eating healthy food', 'Getting enough sleep', 'Taking a walk in nature', 'Facing a big test'],
    correctAnswer: 'Facing a big test'
  }
];

const Quiz = ({ selectedAvatar, selectedHat, getHatImage, getAvatarImage, handleBackToSelection }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (currentQuestion < questions.length && !showScore) {
      setTimer(10);
      const timerId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(timerId);
          }
          return prevTimer > 0 ? prevTimer - 1 : 0;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [currentQuestion, showScore]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    let bonusPoints = timer > 0 && selectedOption === questions[currentQuestion].correctAnswer ? 2 : 1;
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + bonusPoints);
      if (bonusPoints === 2) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      }
    }
    setSelectedOption('');
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };
  

  const handleChangeAnswer = () => {
    setSelectedOption('');
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowScore(false);
    setTimer(10);
    setShowNotification(false);
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      {/* Display selected avatar and hat images */}
      {selectedAvatar && selectedHat && !showScore && (
        <div style={{ position: 'absolute', left: '100px', top: '44%', transform: 'translateY(-50%)' }}>
          <img src={getHatImage()} alt="Selected Hat" style={{ width: '350px', height: '480px' }} />
        </div>
      )}
      <div style={{ maxWidth: '500px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        {showScore ? (
          <div style={{ marginTop: '50px' }}>
            {score <5  ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>Your Score: {score} out of {questions.length}</h2>
                <img src={sad} alt="Sad Emoji" style={{ width: '300px', borderRadius: '10%' }} />
                <p style={{ fontSize: '28px', color: '#333', marginTop: '20px', lineHeight: '1.6' }}>
                  Oh no! Don't be discouraged. Every challenge is an opportunity to learn and grow. You've got this! Give it another shot and keep aiming high!
                </p>
                <button onClick={handleRetryQuiz} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', background: '#007bff', color: '#fff', outline: 'none' }}>Retry Quiz</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>Your Score: {score} out of {questions.length}</h2>
                <img src={happy} alt="Happy Emoji" style={{ width: '300px', borderRadius: '50%' }} />
                <p style={{ fontSize: '28px', color: '#333', marginTop: '20px', lineHeight: '1.6' }}>
                  Great job! Your progress is inspiring. Keep up the good work!
                </p>
                <button onClick={handleRetryQuiz} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', background: '#007bff', color: '#fff', outline: 'none' }}>Retry Quiz</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ marginTop: '50px' }}> {/* Adjust the top margin as needed */}
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '20px' }}>Question {currentQuestion + 1}</h2>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000', marginBottom: '20px' }}>{questions[currentQuestion].question}</h3>
            <div>
              {questions[currentQuestion].options.map((option) => (
                <button 
                  key={option} 
                  onClick={() => handleOptionSelect(option)}
                  style={{ margin: '5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', background: selectedOption === option ? '#3f72af' : '#6c757d', color: '#fff', outline: 'none' }}
                  disabled={selectedOption !== ''}
                >
                  {option}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '14px', color: '#000', marginTop: '20px' }}>{timer > 0 ? `Bonus Point Timer: ${timer}` : 'Bonus Point Timer: Time\'s up!'}</p>
            {showNotification && (
              <div style={{ background: '#28a745', color: '#fff', padding: '10px', borderRadius: '5px', marginTop: '20px' }}>
                Congratulations! You earned bonus points!
              </div>
            )}
            <div style={{ marginTop: '20px' }}>
              <button onClick={handleNextQuestion} style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', background: '#007bff', color: '#fff', outline: 'none' }} disabled={selectedOption === ''}>Next</button>
              <button onClick={handleChangeAnswer} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: 'none', borderRadius: '5px', background: '#dc3545', color: '#fff', outline: 'none' }} disabled={selectedOption === ''}>Clear Answer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
