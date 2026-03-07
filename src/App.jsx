import React, { useState, useEffect, useCallback } from 'react';

import './styles/App.css';
import modernLaptopImg from './assets/modern-laptop.png';
import minimalPhoneImg from './assets/minimal-phone.png';
import womenCalculatingImg from './assets/women-calculating-artillery-1940s.png';
import mechanicalOfficeImg from './assets/Early-20th-century-clerical-office.png';
import jpegImg from './assets/JPEG-Question.png';
import powerGridImg from './assets/power-grid.png';
import neuralNetworkImg from './assets/neural-network.png';

import selfCheckoutImg from './assets/Self-checkout-kiosk.png';
import punchCardWomenImg from './assets/Women-with-punch-card-machine.png';
import biometricGraphImg from './assets/Biometric-heart-rate-monitor-graph.png';
import cookiesSettingsImg from './assets/Cookies-settings.png';
import atmMachineImg from './assets/atm-machine.png';
import barcodeScannerImg from './assets/barcode-scanner.png';
import womenAtNasaImg from './assets/women-at-nasa-doing-math.png';
import factoryRoboticsImg from './assets/factory-robot.png';
import trafficLightImg from './assets/traffic-lights.png';
import antColonyImg from './assets/ant-colony.png';
import ghostWorkLaborImg from './assets/content-moderation.png';
import dataCenterImg from './assets/data-center-server-rack.png';


// Navbar Component
const Navbar = ({ currentPage, onNavigate, games }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('home')}>
        Conceptual Games
      </div>
      <div className="navbar-menu">
        <button className="navbar-item" onClick={() => onNavigate('home')}>
          Home
        </button>
        <div className="dropdown">
          <button className="navbar-item">Games ▾</button>
          <div className="dropdown-content">
            {games.map((game, index) => (
              <div
                key={game.id}
                className={`dropdown-item ${!game.available ? 'disabled' : ''}`}
                onClick={() => game.available && onNavigate(game.id)}
              >
                {game.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// GameCard Component
const GameCard = ({ game, index, onSelect }) => {
  return (
    <div
      className={`game-card ${!game.available ? 'disabled' : ''}`}
      onClick={() => game.available && onSelect(game.id)}
    >
      <div className="game-card-number">0{index + 1}</div>
      <h3 className="game-card-title">{game.title}</h3>
      <p className="game-card-desc">{game.description}</p>
      {!game.available && (
        <div className="game-card-status">Coming Soon</div>
      )}
    </div>
  );
};

// Home Page
const HomePage = ({ games, onSelectGame }) => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-title">Conceptual Games</h1>
        <p className="home-subtitle">
          Interactive experiences that confront, question, and reveal.
        </p>
        <div className="course-caption">
          <p>
            This project was created as part of the <strong>Digital Humanities</strong> course, which explores the social, historical, and political dimensions of computing through critical readings and discussion. The project engages with ideas from the course about how technological systems shape and are shaped by human societies.
          </p>
        </div>
      </header>
      <section className="games-section">
        <div className="section-divider">
          {/* <span className="section-title">Games</span> */}
        </div>
        <div className="games-grid">
          {games.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              index={index}
              onSelect={onSelectGame}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

// What Is Computer Game Screens
const IntroScreen = ({ onBegin }) => (
  <div className="game-screen">
    <div className="screen-content">
      <h1 className="main-title">What Is A Computer?</h1>
      <div className="intro-list">
        <ul>
          <li>This interactive project asks a simple question.</li>
          <li>You will see a series of images.</li>
          <li>For each one, decide: Is this a computer?</li>
          <li>There are no correct answers.</li>
          <li>Your definition will shape what you see and what disappears.</li>
        </ul>
      </div>
      <button className="primary-btn" onClick={onBegin}>
        Begin
      </button>
    </div>
  </div>
);

const DefinitionScreen = ({ onSubmit }) => {
  const [definition, setDefinition] = useState('');

  const handleSubmit = () => {
    if (definition.trim()) {
      onSubmit(definition.trim());
    }
  };

  return (
    <div className="game-screen">
      <div className="screen-content">
        <p className="prompt-text">In one sentence, what is a computer?</p>
        <input
          type="text"
          className="text-input"
          placeholder="Type your definition..."
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          className="primary-btn"
          onClick={handleSubmit}
          disabled={!definition.trim()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const ClassificationScreen = ({ scenario, options, onSelect, feedback, image, caption }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    if (feedback) {
      setShowFeedback(true);
      setTimeout(() => {
        onSelect(option);
      }, 1500);
    } else {
      setTimeout(() => {
        onSelect(option);
      }, 100);
    }
  };

  return (
    <div className="game-screen">
      <div className="screen-content">
        {image && <img src={image} className="question-image" alt="Scenario documentary evidence" />}
        {caption && <p className="image-caption">{caption}</p>}
        <p className="prompt-text">Is this a computer?</p>
        <div className="options-container">
          {options.map((option) => (
            <button
              key={option}
              className={`option-btn ${selected === option ? 'selected' : ''}`}
              onClick={() => !selected && handleSelect(option)}
              disabled={selected !== null}
            >
              {option}
            </button>
          ))}
        </div>
        {showFeedback && feedback && (
          <p className="feedback-message">{feedback}</p>
        )}
      </div>
    </div>
  );
};

const RevealScreen = ({ userDefinition, flags, answers, onContinue }) => {
  const getCritique = () => {

  const machineScreens = ['laptop', 'smartphone', 'selfCheckout', 'atmMachine', 'factoryRobotics'];
  const laborScreens = ['humanComputer', 'punchCardWomen', 'womenAtNasa', 'mechanicalOffice', 'ghostWorkLabor'];
  const infrastructureScreens = ['trafficLight', 'powerGrid', 'barcodeScanner'];
  const abstractScreens = ['jpeg', 'cookiesSettings', 'biometricGraph', 'aiModel', 'antColony'];

  const yesAnswers = answers.filter(a => a.answer === 'Yes');
  const noAnswers = answers.filter(a => a.answer === 'No');
  const uncertainAnswers = answers.filter(a => a.answer.toLowerCase().includes('not') || a.answer.toLowerCase().includes('unsure'));

  const machineYes = yesAnswers.filter(a => machineScreens.includes(a.screen)).length;
  const laborNo = noAnswers.filter(a => laborScreens.includes(a.screen)).length;
  const infraNo = noAnswers.filter(a => infrastructureScreens.includes(a.screen)).length;
  const abstractUncertain = uncertainAnswers.filter(a => abstractScreens.includes(a.screen)).length;

  if (machineYes > 2 && laborNo > 1) {
    return "You confidently defined machines as computers, but dismissed the people who historically performed computation.";
  }

  if (infraNo > 1) {
    return "You treated computers as isolated devices, overlooking the infrastructures that allow them to function.";
  }

  if (abstractUncertain > 2) {
    return "Your certainty weakened when computation became invisible. Much of modern computing works this way.";
  }

  if (uncertainAnswers.length > 5) {
    return "As the examples expanded, the boundary of the computer became difficult to maintain.";
  }

  if (flags.includedAssemblage) {
    return "You recognized that computing often exists as a system rather than a single machine.";
  }

  return "Your definition of a computer reveals assumptions about technology, labor, and visibility.";
};

  return (
    <div className="game-screen">
      <div className="screen-content">
        <div className="reveal-section">
          <div className="reveal-label">Your Definition</div>
          <p className="reveal-definition">"{userDefinition}"</p>
        </div>
        <div className="reveal-section">
          <div className="reveal-label">Observation</div>
          <p className="reveal-critique">{getCritique()}</p>
        </div>
        <button className="primary-btn" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

const ExclusionScreen = ({ flags, onContinue }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  
  const exclusions = [];

if (flags.excludedHuman) {
  exclusions.push("Human computers");
  exclusions.push("Women mathematicians of WWII");
}

if (!flags.includedAssemblage) {
  exclusions.push("Clerical labor of the mechanical office");
  exclusions.push("Infrastructure");
}

if (flags.machineOnlyBias) {
  exclusions.push("Social systems behind computing");
}

exclusions.push("Standards and protocols");
exclusions.push("Invisible data infrastructures");

  useEffect(() => {
    const timeouts = [];
    exclusions.forEach((_, index) => {
      const timeoutId = setTimeout(() => {
        setVisibleItems(prev => prev.includes(index) ? prev : [...prev, index]);
      }, index * 700);
      timeouts.push(timeoutId);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="game-screen">
      <div className="screen-content">
        <p className="prompt-text">Under your definition, the following disappear:</p>
        <div className="exclusion-list">
          {exclusions.map((item, index) => (
            <p
              key={index}
              className={`exclusion-item ${visibleItems.includes(index) ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              — {item}
            </p>
          ))}
        </div>
        {visibleItems.length >= exclusions.length && (
          <button className="primary-btn" onClick={onContinue}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

const FinalScreen = ({ onRestart, onAbout }) => {
  const [selected, setSelected] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const options = [
  "Human labor",
  "Women in computing history",
  "Infrastructure",
  "Politics and power",
  "Data systems",
  "All of the above"
];

  const handleSelect = (option) => {
    setSelected(option);
    setTimeout(() => setShowMessage(true), 800);
  };

  return (
    <div className="game-screen">
      <div className="screen-content">
        {!showMessage ? (
          <>
            <p className="prompt-text">
              Who disappears when we narrow the definition of a computer?
            </p>
            <div className="options-container">
              {options.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${selected === option ? 'selected' : ''}`}
                  onClick={() => !selected && handleSelect(option)}
                  disabled={selected !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="final-message">
              <strong>A computer is never just a machine.</strong><br /><br />
              It is a history of labor, standardization, power, and code.<br /><br />
              You participated in defining it.
            </p>
            <p className="participation-note">
              The boundaries we draw determine who we see.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <button className="primary-btn" onClick={onAbout}>
                Read About This Project
              </button>
              <button className="restart-btn" onClick={onRestart}>
                Start Over
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const AboutScreen = ({ onRestart }) => (
  <div className="game-screen">
    <div className="screen-content">
      <h1 className="main-title">About This Project</h1>
      <div className="scenario-text" style={{ textAlign: 'left', lineHeight: '1.6' }}>
        <p>The interactive project is a game that asks a simple question: What is a computer?</p>
        <p style={{ marginTop: '10px' }}>For most people, the answer is a device, like a laptop or a smartphone. However, the term &quot;computer&quot; has also referred to a human performing calculations, often a woman whose work was later obscured by machines. In addition, the concept of a computer has expanded to include systems, networks, and other elements.</p>
        <p style={{ marginTop: '10px' }}>The game is a set of classifications, where the user is asked to determine if a given computer is a &ldquo;computer&rdquo; or &ldquo;not a computer.&rdquo; As the game progresses, the examples become increasingly difficult to place, and the definitions of the term begin to change.</p>
        <p style={{ marginTop: '10px' }}>The purpose of the project is not to test the user&apos;s knowledge, but to show how definitions affect what is visible and what is invisible. At the end of the game, the user is presented with the definitions that they have made, and the results are displayed.</p>
        <p style={{ marginTop: '10px' }}>Through this interactive game, the project examines the concept of a computer as a <strong>historical, social, and infrastructural system.</strong></p>
      </div>
      <button className="restart-btn" onClick={onRestart} style={{ marginTop: '20px' }}>
        Start Again
      </button>
    </div>
  </div>
);

// Progress Indicator
const ProgressIndicator = ({ currentStep, totalSteps }) => (
  <div className="progress-indicator">
    {Array.from({ length: totalSteps }, (_, i) => (
      <div
        key={i}
        className={`progress-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
      />
    ))}
  </div>
);

// What Is Computer Game Controller
const WhatIsComputerGame = ({ onExit }) => {
  const [gameState, setGameState] = useState({
    currentScreen: 0,
    userDefinition: '',
    answers: [],
    flags: {
      excludedHuman: false,
      includedAssemblage: false,
      machineOnlyBias: false,
      aiAsThinking: false,
      hesitant: false,
    },
    emotionalToneLevel: 0,
    uncertaintyScore: 0,
  });

  const screens = [
    'intro',
    'definition',
    'laptop',
    'smartphone',
    'atmMachine',
    'selfCheckout',
    'barcodeScanner',
    'trafficLight',
    'factoryRobotics',
    'powerGrid',
    'mechanicalOffice',
    'humanComputer',
    'womenAtNasa',
    'punchCardWomen',
    'jpeg',
    'ghostWorkLabor',
    'cookiesSettings',
    'biometricGraph',
    'dataCenter',
    'antColony',
    'aiModel',
    'reveal',
    'exclusion',
    'final',
    'about'
  ];

  const nextScreen = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: prev.currentScreen + 1,
    }));
  };

  const increaseTone = (amount = 1) => {
    setGameState(prev => ({
      ...prev,
      emotionalToneLevel: Math.min(5, prev.emotionalToneLevel + amount),
    }));
  };

  const handleDefinitionSubmit = (definition) => {
    setGameState(prev => ({
      ...prev,
      userDefinition: definition,
    }));
    increaseTone(0.5);
    nextScreen();
  };

  const handleAnswer = (screenKey, answer, flagUpdates = {}) => {
    setGameState(prev => ({
      ...prev,
      answers: [...prev.answers, { screen: screenKey, answer }],
      flags: { ...prev.flags, ...flagUpdates },
    }));
    nextScreen();
  };

  const handleScaleAnswer = (screenKey, answer, extraUpdates = {}) => {
    let newUncertainty = gameState.uncertaintyScore;
    if (answer === 'Probably' || answer === 'Probably Not') {
      newUncertainty += 1;
      increaseTone(0.5);
    } else if (answer === 'Not Sure') {
      newUncertainty += 2;
      increaseTone(1);
    } else {
      increaseTone(0.25);
    }
    
    setGameState(prev => ({
      ...prev,
      uncertaintyScore: newUncertainty,
      answers: [...prev.answers, { screen: screenKey, answer }],
      flags: { 
        ...prev.flags, 
        ...extraUpdates,
        hesitant: newUncertainty >= 3 ? true : prev.flags.hesitant
      },
    }));
    nextScreen();
  };

  const handleHumanComputerAnswer = (answer) => {
    const flagUpdates = {};
    if (answer === 'No') {
      flagUpdates.excludedHuman = true;
      flagUpdates.machineOnlyBias = true;
      increaseTone(2);
    } else {
      increaseTone(0.5);
    }
    handleAnswer('humanComputer', answer, flagUpdates);
  };

  const handleMechanicalOfficeAnswer = (answer) => {
    const flagUpdates = {};
    if (answer === "It's a system" || answer === 'Yes') {
      flagUpdates.includedAssemblage = true;
    }
    increaseTone(0.5);
    handleAnswer('mechanicalOffice', answer, flagUpdates);
  };

  const handleAIAnswer = (answer) => {
    const flagUpdates = {};
    if (answer === 'It is thinking') {
      flagUpdates.aiAsThinking = true;
    }
    increaseTone(1);
    handleAnswer('aiModel', answer, flagUpdates);
  };

  const handleRestart = () => {
    setGameState({
      currentScreen: 0,
      userDefinition: '',
      answers: [],
      flags: {
        excludedHuman: false,
        includedAssemblage: false,
        machineOnlyBias: false,
        aiAsThinking: false,
        hesitant: false,
      },
      emotionalToneLevel: 0,
      uncertaintyScore: 0,
    });
  };

  const renderScreen = () => {
    const screen = screens[gameState.currentScreen];
    
    switch (screen) {
      case 'intro':
        return <IntroScreen onBegin={nextScreen} />;
      
      case 'definition':
        return <DefinitionScreen onSubmit={handleDefinitionSubmit} />;
      
      case 'laptop':
        return (
          <ClassificationScreen
            key="laptop"
            image={modernLaptopImg}
            options={['Yes', 'No', 'Unsure']}
            onSelect={(a) => { increaseTone(0.25); handleAnswer('laptop', a); }}
          />
        );
      
      case 'smartphone':
        return (
          <ClassificationScreen
            key="smartphone"
            image={minimalPhoneImg}
            options={['Yes', 'No', 'Unsure']}
            onSelect={(a) => { increaseTone(0.25); handleAnswer('smartphone', a); }}
          />
        );
      
      case 'selfCheckout':
        return (
          <ClassificationScreen
            key="selfCheckout"
            image={selfCheckoutImg}
            options={['Yes (the self-checkout itself is a computer)', 'No (it’s just a terminal connected to one)', 'Both', 'I’m not sure']}
            onSelect={(a) => { increaseTone(0.25); handleAnswer('selfCheckout', a); }}
          />
        );

      case 'womenAtNasa':
        return (
          <ClassificationScreen
            key="womenAtNasa"
            image={womenAtNasaImg}
            options={['Yes', 'No', 'They used to be','Unsure']}
            onSelect={(a) => { increaseTone(0.25); handleAnswer('womenAtNasa', a); }}
          />
        );
      
      case 'atmMachine':
        return (
          <ClassificationScreen
            key="atmMachine"
            image={atmMachineImg}
            options={['Yes (the ATM itself is a computer)', 'No (the real computer is the bank’s system)', 'Unsure']}
            onSelect={(a) => { increaseTone(0.25); handleAnswer('atmMachine', a); }}
          />
        );
      
      case 'barcodeScanner':
        return (
          <ClassificationScreen
            key="barcodeScanner"
            image={barcodeScannerImg}
            options={['Yes', 'No', 'part of one', 'Unsure ']}
            onSelect={(a) => { increaseTone(0.25); handleAnswer('barcodeScanner', a); }}
          />
        );
      
      case 'humanComputer':
        return (
          <ClassificationScreen
            key="humanComputer"
            image={womenCalculatingImg}
            options={['Yes', 'No', 'Only metaphorically', 'Unsure']}
            onSelect={handleHumanComputerAnswer}
          />
        );
      
      case 'punchCardWomen':
        return (
          <ClassificationScreen
            key="punchCardWomen"
            image={punchCardWomenImg}
            options={['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not']}
            onSelect={(a) => handleScaleAnswer('punchCardWomen', a)}
          />
        );
      
      case 'mechanicalOffice':
        return (
          <ClassificationScreen
            key="mechanicalOffice"
            image={mechanicalOfficeImg}
            options={['Yes', 'No', "It's a system", 'Unsure']}
            onSelect={handleMechanicalOfficeAnswer}
          />
        );

      case 'factoryRobotics':
        return (
          <ClassificationScreen
            key="factoryRobotics"
            image={factoryRoboticsImg}
            options={['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not']}
            onSelect={(a) => handleScaleAnswer('factoryRobotics', a)}
          />
        );

      case 'trafficLight':
        return (
          <ClassificationScreen
            key="trafficLight"
            image={trafficLightImg}
            options={['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not']}
            onSelect={(a) => handleScaleAnswer('trafficLight', a)}
          />
        );
      
      case 'jpeg':
        return (
          <ClassificationScreen
            key="jpeg"
            image={jpegImg}
            options={['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not']}
            onSelect={(a) => handleScaleAnswer('jpeg', a)}
          />
        );
      
      case 'ghostWorkLabor':
        return (
          <ClassificationScreen
            key="ghostWorkLabor"
            image={ghostWorkLaborImg}
            options={['Yes', 'No', 'Only the platform', 'It’s labor, not computing']}
            onSelect={(a) => handleAnswer('ghostWorkLabor', a)}
          />
        );

      case 'dataCenter':
        return (
          <ClassificationScreen
            key="dataCenter"
            image={dataCenterImg}
            options={['Yes', 'No', 'It’s many computers', 'It’s infrastructure']}
            onSelect={(a) => handleAnswer('dataCenter', a)}
          />
        );
      

      case 'cookiesSettings':
        return (
          <ClassificationScreen
            key="cookiesSettings"
            image={cookiesSettingsImg}
            options={['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not']}
            onSelect={(a) => handleScaleAnswer('cookiesSettings', a)}
          />
        );


      case 'biometricGraph':
        return (
          <ClassificationScreen
            key="biometricGraph"
            image={biometricGraphImg}
            options={['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not']}
            onSelect={(a) => handleScaleAnswer('biometricGraph', a)}
          />
        );



      case 'antColony':
        return (
          <ClassificationScreen
            key="antColony"
            image={antColonyImg}
            options={['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not']}
            onSelect={(a) => handleScaleAnswer('antColony', a)}
          />
        );
      

      case 'powerGrid':
        return (
          <ClassificationScreen
            key="powerGrid"
            image={powerGridImg}
            options={['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not']}
            onSelect={(a) => handleScaleAnswer('powerGrid', a)}
          />
        );
      
      case 'aiModel':
        return (
          <ClassificationScreen
            key="aiModel"
            image={neuralNetworkImg}
            caption="A representation of a model trained to detect patterns in data."
            options={['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not']}
            onSelect={(a) => {
              const flags = a === 'Definitely' || a === 'Probably' ? { aiAsThinking: true } : {};
              handleScaleAnswer('aiModel', a, flags);
              
            }}
          />
        );
      
      case 'reveal':
        return (
          <RevealScreen
            userDefinition={gameState.userDefinition}
            flags={gameState.flags}
            answers={gameState.answers}
            onContinue={nextScreen}
          />
        );
      
      case 'exclusion':
        return (
          <ExclusionScreen
            flags={gameState.flags}
            onContinue={nextScreen}
          />
        );
      
      case 'final':
        return <FinalScreen onRestart={handleRestart} onAbout={nextScreen} />;
      
      case 'about':
        return <AboutScreen onRestart={handleRestart} />;
      
      default:
        return null;
    }
  };

  return (
    <>
      {renderScreen()}
      {gameState.currentScreen > 0 && 
       screens[gameState.currentScreen] !== 'final' && 
       screens[gameState.currentScreen] !== 'about' && (
        <ProgressIndicator
          currentStep={gameState.currentScreen}
          totalSteps={screens.length}
        />
      )}
    </>
  );
};

// Main App
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [emotionalTone, setEmotionalTone] = useState(0);

  const games = [
    {
      id: 'what-is-a-computer',
      title: 'What Is A Computer?',
      description: 'A confrontational exploration of definitions, labor, and the hidden histories of computation.',
      available: true,
    }
    //,
    // {
    //   id: 'build-society',
    //   title: 'Build Your Perfect Society',
    //   description: 'Design utopia. Discover its costs.',
    //   available: false,
    // },
    // {
    //   id: 'attention-economy',
    //   title: 'Attention Economy Simulator',
    //   description: 'Your time is currency. Watch it drain.',
    //   available: false,
    // },
    // {
    //   id: 'data-double',
    //   title: 'Data Double',
    //   description: 'Meet the version of you that exists in databases.',
    //   available: false,
    // },
  ];

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setEmotionalTone(0);
  };

  return (
    <>
      <div className="app-container" data-tone={emotionalTone}>
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          games={games}
        />
        {currentPage === 'home' && (
          <HomePage games={games} onSelectGame={handleNavigate} />
        )}
        {currentPage === 'what-is-a-computer' && (
          <WhatIsComputerGame onExit={() => handleNavigate('home')} />
        )}
      </div>
    </>
  );
}