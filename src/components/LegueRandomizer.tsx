import React, { useState } from 'react';
import Normal from './Normal';
import style from './LegueRandomizer.module.scss';
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';

const LegueRandomizer = () => {
  const [chosen, setChosen] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  let background;

  switch (chosen) {
    case 'NORMAL':
      background = style.normal;
      break;
    case 'ARAM':
      background = style.aram;
      break;
    case 'URF':
      background = style.urf;
      break;
    default:
      background = style.default__background;
      break;
  }

  return (
    <div className={background}>
      <Header chosen={chosen} />
      <section onClick={() => setIsInputFocused(false)}>
        {chosen === 'NORMAL' && <Normal />}
        {chosen === 'ARAM' && <p>Aram</p>}
        {chosen === 'URF' && <p>URF</p>}
      </section>
      <Footer
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
        chosen={chosen}
        setChosen={setChosen}
      />
    </div>
  );
};

export default LegueRandomizer;
