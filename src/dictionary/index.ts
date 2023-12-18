import { ptbr } from './ptbr';
import { en } from './en';

export enum Terms {
  CRASH_COMPLETION_CHAT
}

export enum Lang {
  PT_BR = 'ptbr',
  EN = 'en'
}

export interface Dics {
  [key: string]: string;
}

export class Dictionary {
  static get(lang: Lang, term: Terms): string {
    switch (lang) {
      case Lang.PT_BR:
        return ptbr[term];
      case Lang.EN:
        return en[term];
      default:
        return en[term];
    }
  }
}
