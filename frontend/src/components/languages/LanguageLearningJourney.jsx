import { useState } from 'react';
import LevelTestComponent from './LevelTestComponent';
import LevelResult from './LevelResult';
import LanguageSelection from './LanguageSelection';
import { calculateLevel } from '../../constants/levelTest';
import Navbar from './Navbar';

function LanguageLearningJourney() {
  const [step, setStep] = useState('language-selection');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [finalLevel, setFinalLevel] = useState(null);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setStep('level-test');
  };

  const handleLevelTestComplete = (levelTestAnswers) => {
    const level = calculateLevel(levelTestAnswers);
    setFinalLevel(level);
    setStep('level-result');
  };

  const startLearningJourney = () => {
    console.log(`Début du parcours pour ${selectedLanguage.name} - Niveau ${finalLevel}`);
  };

  const handleBack = () => {
    setStep('language-selection');
    setSelectedLanguage(null);
    setFinalLevel(null);
  };

  return (
    <div>
      <Navbar onBack={step !== 'language-selection' ? handleBack : null} />
      
      {step === 'language-selection' && (
        <LanguageSelection onSelectLanguage={selectLanguage} />
      )}
      {step === 'level-test' && (
        <>
          <LevelTestComponent 
            selectedLanguage={selectedLanguage} 
            onLevelTestComplete={handleLevelTestComplete}
            back={() => setStep("language-selection")}
          />

        </>
      )}
      {step === 'level-result' && (
        <LevelResult 
          selectedLanguage={selectedLanguage}
          finalLevel={finalLevel}
          onStartLearningJourney={startLearningJourney}
        />
      )}
    </div>
  );
}

export default LanguageLearningJourney;
