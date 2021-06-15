export type LangLocale =
  "ar-sa" | // - Arabic Saudi Arabia
  "cs-cz" | // - Czech Czech Republic
  "da-dk" | // - Danish Denmark
  "de-de" | // - German Germany
  "el-gr" | // - Modern Greek Greece
  "en-au" | // - English Australia
  "en-gb" | // - English United Kingdom
  "en-ie" | // - English Ireland
  "en-us" | // - English United States
  "en-za" | // - English South Africa
  "es-es" | // - Spanish Spain
  "es-mx" | // - Spanish Mexico
  "fi-fi" | // - Finnish Finland
  "fr-ca" | // - French Canada
  "fr-fr" | // - French France
  "he-il" | // - Hebrew Israel
  "hi-in" | // - Hindi India
  "hu-hu" | // - Hungarian Hungary
  "id-id" | // - Indonesian Indonesia
  "it-it" | // - Italian Italy
  "ja-jp" | // - Japanese Japan
  "ko-kr" | // - Korean Republic of Korea
  "nl-be" | // - Dutch Belgium
  "nl-nl" | // - Dutch Netherlands
  "no-no" | // - Norwegian Norway
  "pl-pl" | // - Polish Poland
  "pt-br" | // - Portuguese Brazil
  "pt-pt" | // - Portuguese Portugal
  "ro-ro" | // - Romanian Romania
  "ru-ru" | // - Russian Russian Federation
  "sk-sk" | // - Slovak Slovakia
  "sv-se" | // - Swedish Sweden
  "th-th" | // - Thai Thailand
  "tr-tr" | // - Turkish Turkey
  "zh-cn" | // - Chinese China
  "zh-hk" | // - Chinese Hong Kong
  "zh-tw" | // - Chinese Taiwan
  never;

export interface LangConfig {
  /** 名称 */ name: string;
  /** 地点 */ locale: LangLocale;
  /** 别名 */ alternate: string;
  /** 国家 */ country: string;
  /** 退路 */ fallback: boolean;
}
