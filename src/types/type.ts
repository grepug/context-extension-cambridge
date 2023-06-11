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
    desc: string
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
    // 等级标签
    levelText?: string
    // 用法标签
    usageText: string
    // 释义标签
    labels: string[]
    // 语法标签
    grammarTraits: string[]
    // 同义词
    synonyms: string[]
    // 反义词
    opposites: string[]
    // 关联词
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