import { useState } from "react";
import { Card } from "../components/Card";
import style from '../style/page/home.module.scss'

export function Home() {

    return (
        <main className={style.home}>
            <section>
                <header>
                    <h3>Para assitir</h3>
                </header>
                <ul>
                    <li>
                        <Card />
                    </li>
                    <li>
                        <Card />
                    </li>
                </ul>
            </section>
            <section>
                <header>Para assitir</header>
                <ul>
                    <li>
                        <Card />
                    </li>
                    <li>
                        <Card />
                    </li>
                </ul>
            </section>
            <section>
                <header>Para assitir</header>
                <ul>
                    <li>
                        <Card />
                    </li>
                    <li>
                        <Card />
                    </li>
                </ul>
            </section>
        </main>
    )
}