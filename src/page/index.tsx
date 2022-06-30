import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { getAnimes } from "../service/localstoage";
import style from '../style/page/home.module.scss'
import { IAnimes } from "../types/Anime";

export function Home() {
    const [ animes, setAnimes ] = useState<IAnimes>()

    useEffect(() => {
        getAnimes(setAnimes)
        window.addEventListener('storage', () => getAnimes(setAnimes))
        return  window.removeEventListener('storage', () => getAnimes(setAnimes))
    }, [])

    return (
        <main className={style.home}>
            <section>
                <header>
                    <h3>Para assitir</h3>
                </header>
                <ul>
                    {animes && animes.toWatch.map( anime => (
                        <li key={anime.id}>
                            <Card anime={anime} />
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <header>
                    <h3>Assistindo</h3>
                </header>
                <ul>
                    {animes && animes.watching.map( anime => (
                        <li key={anime.id}>
                            <Card anime={anime} />
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <header>
                    <h3>Assistidos</h3>
                </header>
                <ul>
                    {animes && animes.watched.map( anime => (
                        <li key={anime.id}>
                            <Card anime={anime} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}