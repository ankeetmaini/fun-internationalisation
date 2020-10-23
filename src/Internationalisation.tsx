import React, {useContext, useState} from 'react';
import {Text} from 'react-native';
import * as EnglishStrings from '../messages/en.json';
import * as HindiStrings from '../messages/hindi.json';

type Languages = 'en' | 'hindi';

const createContext = (lang: Languages) => {
  const translations: Record<Languages, Record<string, string>> = {
    en: EnglishStrings,
    hindi: HindiStrings,
  };

  function translate(id: string, attrs: Record<string, any>): string {
    let message = translations[lang][id];
    const interpolations = message && message.match(/{{[a-z]+}}/g);
    if (interpolations) {
      interpolations.forEach((interpolation) => {
        const placeholder = interpolation.slice(2, -2);
        message = message.replace(interpolation, attrs[placeholder]);
      });
      return message;
    }
    return message;
  }

  return {
    lang,
    translate,
    changeLanguage: (l: Languages) => {},
  };
};

export const Context = React.createContext(createContext('en'));

export const InternationalisationProvider: React.FC = ({children}) => {
  const [context, setContext] = useState(createContext('en'));
  return (
    <>
      <Context.Provider
        value={{
          ...context,
          changeLanguage: (l: Languages) => setContext(createContext(l)),
        }}>
        {children}
      </Context.Provider>
    </>
  );
};

export const TranslationText: React.FC<{
  id: string;
  attrs: Record<string, any>;
}> = ({id, attrs}) => {
  const {translate} = useContext(Context);
  return <Text>{translate(id, attrs)}</Text>;
};
