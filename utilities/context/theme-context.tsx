import React, { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, ModalService, ThemeType, useTheme as useKittenTheme } from '@ui-kitten/components';

/**
 * you can customize your app theme here
 * https://colors.eva.design/
 */
import { default as appTheme } from '../../constants/theme/app-theme.json'; // <-- Import app theme
import { default as mapping } from '../../constants/theme/mapping.json'; // <-- Import app mapping
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Storage from '../storage/async-storage';
import { ThemeContextType } from '@/constants/types/context/theme-context';

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => { },
});



// useTHeme hook
export const useTheme = () => React.useContext(ThemeContext);


ModalService.setShouldUseTopInsets = true //applies StatusBar additional offset
// "background-basic-color-1": "#0f1113",

export const ThemeProvider = ({ children }: any) => {
  var customEvaMapping = {
    ...eva.mapping,
    ...mapping,
    strict: {
      ...eva.mapping.strict,
      ...mapping.strict,
    },
  };
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  const toggleTheme = async () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    // store theme in storage 
    await Storage.storeData('theme', nextTheme);
  };

  // load theme from storage
  const loadTheme = async () => {
    const storedTheme = await Storage.getData('theme');
    if (storedTheme) {
      setTheme(storedTheme === "light" ? 'light' : 'dark');
    }
  }

  useEffect(() => {
    // useEffect to load theme from storage 
    loadTheme();

  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva[theme], ...appTheme }}
        mapping={customEvaMapping}
      >
        {children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};
