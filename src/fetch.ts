import fetch from 'node-fetch'

export async function fetchHTML(url: string) {
    const result = await fetch(url)
    return result.text()
}