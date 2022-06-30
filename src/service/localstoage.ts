import { IAnime, IAnimes } from "../types/Anime";
// import { v4 as uuidV4 } from 'uuid'
import { v4 as uuidV4 } from 'uuid'

interface IAddAnime {
    title: string;
    description: string;
    image: {
        name: string;
        url: string;
    };
}

interface IGetAnime {
    setAnime: React.Dispatch<React.SetStateAction<IAnimes | undefined>>
}

type StatusAnime = 'toWatch' | 'watching' | 'watched'


export function addAnime(anime: IAddAnime) {
    const animeParsed: IAnime = {...anime, id: uuidV4(),  status: 'toWatch'}

    const animesStorage = localStorage.getItem('animes')

    if (animesStorage) {
        const animes: IAnimes = JSON.parse(animesStorage)
        animes.toWatch.push(animeParsed)

        localStorage.setItem('animes', JSON.stringify(animes))
        console.log(animes)
    } else {
        const animes: IAnimes = {
            toWatch: [],
            watching: [],
            watched: []
        }
        animes.toWatch.push(animeParsed)

        localStorage.setItem('animes', JSON.stringify(animes))
    }   

    const newAnime = new Event('storage')
    dispatchEvent(newAnime)
}

export function deleteAnime(animeId: string, status: StatusAnime) {
    const animesStorage = localStorage.getItem('animes')
    if (animesStorage) {
        const animes: IAnimes = JSON.parse(animesStorage)

        const animeFilted = {
            ...animes, 
            [status]: animes[status].filter(anime => anime.id !== animeId)}
        console.log(animeFilted)
        localStorage.setItem('animes', JSON.stringify(animeFilted))
    }

    const deleteAnime = new Event('storage')
    dispatchEvent(deleteAnime)
}

export function moveTo(animeId: string, status: StatusAnime, statusTo: StatusAnime) {
    const animesStorage = localStorage.getItem('animes')
    if (animesStorage) {
        const animes: IAnimes = JSON.parse(animesStorage)

        const animeTo = [
            ...animes[statusTo], 
            {...animes[status].filter(anime => anime.id === animeId)[0], status: statusTo}
        ]
        const animesMoved = {
            ...animes, 
            [statusTo]: animeTo,
            [status]: animes[status].filter(anime => anime.id !== animeId)
        }
        localStorage.setItem('animes', JSON.stringify(animesMoved))
    }

    const moveAnime = new Event('storage')
    dispatchEvent(moveAnime)
}

export function getAnimes(setAnimes: React.Dispatch<React.SetStateAction<IAnimes | undefined>>) {
    const animesStorage = localStorage.getItem('animes')
    console.log('anie')
    
    if (animesStorage) {
        const animes: IAnimes = JSON.parse(animesStorage)

        localStorage.setItem('animes', JSON.stringify(animes))
        setAnimes(animes)
    }
}


/*
animes = {
    toWatch: [
        animes...
    ],
    watching: [
        animes...
    ],
    watched: [
        animes...
    ]
}
*/