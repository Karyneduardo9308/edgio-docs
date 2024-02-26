import React from 'react';
import {FiSun, FiMoon} from 'react-icons/fi';
import styled from 'styled-components';

import {useTheme} from 'contexts/ThemeContext';

const ThemeSwitcherButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit; // You can set the color to match your theme or leave it to inherit from the parent
  font-size: 1.5em; // Adjust the size as needed
`;

export default function ThemeSwitcher() {
  const {toggleTheme, themedValue} = useTheme();
  const Icon = themedValue(FiMoon, FiSun);

  return (
    <ThemeSwitcherButton
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${themedValue('dark', 'light')} mode`}>
      {themedValue(<FiMoon />, <FiSun />)}
    </ThemeSwitcherButton>
  );
}
