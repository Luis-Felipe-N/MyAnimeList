import { DotsThreeCircleVertical, DotsThreeVertical, Eye, EyeClosed, Trash } from 'phosphor-react'
import { useState } from 'react'
import { deleteAnime, moveTo } from '../../service/localstoage'
import { IAnime } from '../../types/Anime'
import style from './style.module.scss'

interface ICardProps {
    anime: IAnime
}

export function Card({anime}: ICardProps) {
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false)
    return (
        <div className={style.card}>
            <img 
                src={ anime.image.url } 
                alt={ anime.image.name }
                title={ anime.title }
                        />
            <div className={style.content}>
                <h2>{ anime.title }</h2>
                <p>{ anime.description }</p>
            </div>
            <div className={style.containerModal}>
                <button 
                    title='Abrir menu dropdown'
                    onClick={() => setDropDownIsOpen(!dropDownIsOpen)}>
                    <DotsThreeVertical />
                </button>
                <div className={dropDownIsOpen ? style.dropdownOpen : style.dropdown}>
                    <ul>
                        <li>
                            <button onClick={() => deleteAnime(anime.id, anime.status)}>
                                <Trash /> Deletar anime
                            </button>
                            <button
                                onClick={() => moveTo(anime.id, anime.status, 'watching')}
                            >
                                <Eye /> Mover para assistindo
                            </button>
                            <button 
                                onClick={() => moveTo(anime.id, anime.status, 'watched')}
                            >
                                <EyeClosed /> Mover para assistindo
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}