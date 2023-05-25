/**
 * 词条
 */
export interface Entry {
    id: string
    text: string
    definitionGroups: DefinitionGroup[]
}

/**
 * 释义组
 */
export interface DefinitionGroup {
    id: string
    partOfSpeech: string
    senses: Sense[]
    idioms: Entry[]
    phrasalVerbs: Entry[]
    pronunciations: Pronunciations[]
}

/**
 * 发音
 */
export interface Pronunciations {
    id: string
    geoKind: string
    phoneticAlphabet: string
    url?: string
}

/**
 * 词性
 */
// export enum PartOfSpeech {
//     "verb" = 'verb',
//     'noun' = 'noun'
// }

/**
 * 释义
 */
export interface Sense {
    id: string
    text: Text
    usageText: string
    labels: string[]
    grammarTraits: string[]
    synonyms: string[]
    opposites: string[]
    relatedEntries: string[]
    examples: SenseExample[]
    children: Sense[]
}

export interface SenseExample {
    id: string
    text: Text
    children: SenseExample[]
}

export interface Text {
    id: string
    rawText: string
    lang: Lang
    translation?: Text
}

export enum Lang {
    "en" = "en",
    "zh" = "zh"
}