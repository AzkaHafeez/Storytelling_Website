import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroGate from './components/IntroGate';
import ThemeSelector from './components/ThemeSelector';
import StoryScroller from './components/StoryScroller';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [phase, setPhase] = useState('intro');
  const [theme, setTheme] = useState(null); 

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      // Critical: Refresh ScrollTrigger after DOM updates with new theme
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const handleStart = () => {
    setPhase('theme');
  };

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setPhase('story');
  };

  return (
    <>
      {phase === 'intro' && <IntroGate onBegin={handleStart} />}

      {phase === 'theme' && <ThemeSelector onSelect={handleThemeSelect} />}

      {phase === 'story' && theme && (
        <>
          <StoryScroller theme={theme} onReplay={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            setTheme(null);
            setPhase('intro');
          }} />
        </>
      )}
    </>
  );
}

export default App;
