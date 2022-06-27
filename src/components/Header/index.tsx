import style from './style.module.scss'
import { Plus } from 'phosphor-react'

interface IHeaderProps {
    isOpen: boolean;
    setToggleModal: () => void;
}


export function Header({isOpen, setToggleModal}: IHeaderProps) {
    return (
        <header className={style.header}>
            <h1>MyAnimeList</h1>
            <button
                onClick={setToggleModal}
            >
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor" />
                </svg>
                Adicionar
            </button>
        </header>
    )
}