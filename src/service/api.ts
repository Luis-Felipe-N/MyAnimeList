interface IAnimeFetch {
    coverImage:  {small: string};
    canonicalTitle: string;
    description: string;
}
export async function getAnimes() {
    const url = 'https://kitsu.io/api/edge/anime'
    const results = await fetch(url)
    const resultsJson = await results.json()
    return resultsJson.data
}


export async function getAnimesByText(text: string) {
    const url = `https://kitsu.io/api/edge/anime?filter[text]=${text}?page[limit]=1`
    const results = await fetch(url)
    const resultsJson = await results.json()
    return resultsJson.data
}
