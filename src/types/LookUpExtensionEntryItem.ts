export interface LookUpExtensionEntryItem {
    id: string
    title: string
    url: string
    description: string
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