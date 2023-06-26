import { Text } from "./type"

export interface LookUpExtensionEntryItem {
    id: string
    title: string
    url: string
    description: Text
    imageSource?: ImageSource
}

export interface ImageSource {
    base64?: {
        value: string
    }
    url?: {
        value: string
    }
}