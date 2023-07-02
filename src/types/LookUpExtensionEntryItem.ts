import { Text } from "./type"

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