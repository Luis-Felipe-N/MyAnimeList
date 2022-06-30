import { DotsThreeCircleVertical, DotsThreeVertical, Eye, EyeClosed, Trash } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import { deleteAnime, moveTo } from '../../service/localstoage'
import { IAnime } from '../../types/Anime'
import style from './style.module.scss'

interface ICardProps {
    anime: IAnime
}

export function Card({anime}: ICardProps) {
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false)

    const dropDownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (dropDownIsOpen) {
            function handleClickOutSide(event: Event) {
                if (!dropDownRef.current?.contains(event.target)) {
                    setDropDownIsOpen(false)

                    window.removeEventListener('click', handleClickOutSide)
                }
            }
            window.addEventListener('click', handleClickOutSide)
        }
    }, [dropDownIsOpen])

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
            <div ref={dropDownRef} className={style.containerModal}>
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
                            {anime.status === 'watching' ? (
                                <button
                                    onClick={() => moveTo(anime.id, anime.status, 'toWatch')}
                                >
                                    <Eye /> Voltar para 'Assistir depois'
                                </button>
                            ): (
                                <button
                                    onClick={() => moveTo(anime.id, anime.status, 'watching')}
                                >
                                    <Eye /> Mover para assistindo
                                </button>

                            )}

                            {anime.status === 'watched' ? (
                                <button
                                onClick={() => moveTo(anime.id, anime.status, 'toWatch')}
                                >
                                    <Eye /> Voltar para 'Assistir depois'
                                </button>
                            ): (
                                <button 
                                onClick={() => moveTo(anime.id, anime.status, 'watched')}
                                >
                                    <EyeClosed /> Mover para assistido
                                </button>

                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}