import React, {useContext} from 'react';
import {Text} from 'react-native';
import * as EnglishStrings from '../messages/en.json';
import * as HindiStrings from '../messages/hindi.json';
import {KeyMap} from './types';
type AllKeys = keyof KeyMap;
type Languages = 'en' | 'hindi';

const createContext = (lang: Languages) => {
  const translations: Record<Languages, Record<string, string>> = {
    en: EnglishStrings,
    hindi: HindiStrings,
  };

  function translate(
    id: AllKeys,
    attrs: Record<string, string> | undefined,
  ): string {
    let message = translations[lang][id];
    const interpolations = message && message.match(/{{[a-z]+}}/g);
    if (interpolations && attrs) {
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

type Props<T extends AllKeys> = KeyMap[T] extends never
  ? {id: T} & {attrs?: never}
  : {id: T} & {attrs: KeyMap[T]};

export function TranslationText<T extends AllKeys>({id, attrs}: Props<T>) {
  const {translate} = useContext(Context);
  return <Text>{translate(id, attrs)}</Text>;
}
