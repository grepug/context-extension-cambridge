import { Text } from "./type.ts"

export interface LookUpExtensionEntryItem {
    id: string
    title: string
    url: string
    description?: Text
    kind?: string
    keyword: string
}

export interface ImageSource {
    base64?: {
        value: string
    }
    url?: {
        value: string
    }
}