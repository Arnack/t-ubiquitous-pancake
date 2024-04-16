import React, { createContext, useEffect, useState } from 'react';
import { ThemeType, useTheme } from '@ui-kitten/components';
import i18n from '../localizations/i18n';
import Storage from '../storage/async-storage';
import { AppContextProps, AppDataType, LanguageType, initialState } from '@/constants/types/context/app-context';


// Create the context
export const AppContext = createContext<AppContextProps>(initialState);

// Create app context hook
export const useAppContext = () => React.useContext(AppContext);

// Create the context provider
export const AppContextProvider = ({ children }: any) => {
    // Set the state for the context provider
    const [appData, setAppData] = useState<AppDataType>({
        language: {
            name: 'English',
            code: 'en',
        },
        coins: {
            amount: 7
        },
        history: {
            audio: [],
            image: []
        }
    });

    // chat history list
    const [chatHistory, setChatHistory] = useState<any>([]);

    // change language
    const changeLanguage = async (language: LanguageType) => {
        setAppData({
            ...appData,
            language,
        });
        i18n.locale = language.code;
        await Storage.storeData('language', language.code);
    };

    // get language from storage
    const getLanguage = async () => {
        const storedLanguage = await Storage.getData('language');
        if (storedLanguage) {
            changeLanguage({ name: i18n.t('lang-name'), code: storedLanguage });
        }
    };

    // useEffect to get language from storage
    useEffect(() => {
        getLanguage();
    }, []);


    // get theme
    const kittenTheme: ThemeType = useTheme();


    // Set the values for the context provider
    const values = {
        appData,
        setAppData,
        kittenTheme,
        changeLanguage,
        chatHistory, setChatHistory
    };

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
