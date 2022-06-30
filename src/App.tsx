import { useState } from "react"
import { AddAnimeModal } from "./components/AddAnimeModal"
import { Header } from "./components/Header"
import { Home } from "./page"
import './style/global.scss'
import axios from 'axios'

function App() {
    const [ addAnimeModalIsOpen, setAddAnimeModalIsOpen ] = useState(false)

    function handleToggleAddAnimeModal() {
        setAddAnimeModalIsOpen(!addAnimeModalIsOpen)
    }

    return (
        <>
            <Header
                isOpen={addAnimeModalIsOpen}
                setToggleModal={handleToggleAddAnimeModal}
            /> 
            <Home /> 

            <AddAnimeModal 
                isOpen={addAnimeModalIsOpen}
                setToggleModal={handleToggleAddAnimeModal}
            />
        </>
    )
}

export default App
