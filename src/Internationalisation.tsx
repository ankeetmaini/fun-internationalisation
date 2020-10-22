import React, {useContext} from 'react';
import {Text} from 'react-native';
import * as EnglishStrings from '../messages/en.json';
import * as HindiStrings from '../messages/hindi.json';

type Languages = 'en' | 'hindi';

const createContext = (lang: Languages) => {
  const translations: Record<Languages, Record<string, string>> = {
    en: EnglishStrings,
    hindi: HindiStrings,
  };

  function translate(id: string): string {
    return translations[lang][id];
  }

  return {
    lang,
    translate,
  };
};

const Context = React.createContext(createContext('en'));

export const InternationalisationProvider: React.FC = ({children}) => {
  return (
    <>
      <Context.Provider value={createContext('en')}>
        {children}
      </Context.Provider>
    </>
  );
};

export const TranslationText: React.FC<{id: string}> = ({id}) => {
  const {translate} = useContext(Context);
  return <Text>{translate(id)}</Text>;
};
