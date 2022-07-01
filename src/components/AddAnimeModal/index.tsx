import style from './style.module.scss'
import ReactModal from 'react-modal';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Target } from 'phosphor-react';
import { addAnime } from '../../service/localstoage';
import { getAnimes, getAnimesByText } from '../../service/api';

interface IAddAnimeModalProps {
    isOpen: boolean;
    setToggleModal: () => void;
}

interface IAnimeFetch {
    attributes: {
        posterImage:  {small: string};
        canonicalTitle: string;
        description: string;
        slug: string;
    },
    id: string;
}

interface IForm {
    title: string;
    description: string;
    image: {
        name: string;
        url: string;
    };
}

ReactModal.setAppElement('#root')

let pauseToWrite: any;
export function AddAnimeModal({isOpen, setToggleModal}: IAddAnimeModalProps) {
    const [animes, setAnimes] = useState<IAnimeFetch[] | null>()
    const [errors, setErrors] = useState('')
    const [formData, setFormData] = useState<IForm>({
        title: '',
        description: '',
        image: {
            name: '',
            url: ''
        }
    })

    const containerAutoCompleteRef = useRef<HTMLLabelElement>(null)

    async function handleAutocomplete() {
        const data = await getAnimes()

        if (data) {
            setAnimes(data)
            removeAutocompleteByCLickOutSide()
        }
    }

    function removeAutocompleteByCLickOutSide() {
        if (containerAutoCompleteRef.current) {
            function handleClickOutSide(event: any) {
                if (!containerAutoCompleteRef.current?.contains(event.target)) {
                    handleRemoveAutocomplete()
                    window.removeEventListener('click', handleClickOutSide)
                }
            }
            window.addEventListener('click', handleClickOutSide)
        }
    }
    
    function handleFilterAutocomplete(text: string) {
        clearTimeout(pauseToWrite)
        pauseToWrite = setTimeout(async () => {
            const data = await getAnimesByText(text)
            setAnimes(data)
            console.log(data)
        }, 500);
        
    }

    function handleSetAnimeByAutocomplete(animeId: string) {
        if (animes) {
            const anime = animes.filter( anime => anime.id === animeId)[0]

            setFormData({
                title: anime.attributes.canonicalTitle,
                description: anime.attributes.description,
                image: {
                    url: anime.attributes.posterImage.small,
                    name: anime.attributes.slug + '.jpeg'
                }
            })
        }
    }

    function handleRemoveAutocomplete() {
        setAnimes(null)
        clearTimeout(pauseToWrite)
    }
    
    function handleChangeImage(target: HTMLInputElement) {
        const file = target.files?.item(0)
        
        if (file) {
            const url = URL.createObjectURL(file)
            const name = file.name
    
            setFormData({...formData, image: {name, url}})
        }   
    }

    function handleAddNewAnime(event: FormEvent) {
        event.preventDefault();

        const hasTitle = formData.title.trim() !== ''
        const hasFile = formData.image.url !== ''

        if (!hasFile) {
            setErrors('Imagem é obrigátoria!')
            return
        }

        if (!hasTitle) {
            setErrors('Título é obrigátorio!')
            return
        }

        if (formData.title.trim()) {
            addAnime(formData)
            setFormData({
                title: '',
                description: '',
                image: {
                    name: '',
                    url: ''
                }
            })

            setErrors('')
        }
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={setToggleModal}
            className={errors ? `${style.modal__content} ${style.modal__error}` : style.modal__content}
            overlayClassName="modal__overlay"
        >
            <h2>Adicionar anime à lista</h2>

            {errors && (<p className={style.textError}>{errors}</p>)}

            <form onSubmit={(e) => handleAddNewAnime(e)}>
                <label ref={containerAutoCompleteRef}>
                    Titulo
                    <input
                        onKeyUp={() => handleFilterAutocomplete(formData.title)}
                        onFocus={handleAutocomplete}
                        type="text"
                        placeholder='Ex: hunte x hunter'
                        value={formData.title}
                        onChange={(event) => setFormData({...formData, title: event.target.value})}
                    />

                    {animes && (
                        <ul className={style.autocomplete}>
                            {animes.map(anime => (
                                <li 
                                    key={anime.id} 
                                    onClick={() => handleSetAnimeByAutocomplete(anime.id)}
                                >
                                    <img src={anime.attributes.posterImage.small} alt={`Imagem de capa do anime ${anime.attributes.canonicalTitle}`} />
                                    <span>{anime.attributes.canonicalTitle}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </label>
                <label>
                    Descrição (opcional)
                    <textarea
                        placeholder='Ex: Hunter × Hunter é uma série de mangá escrita e ilustrada por Yoshihiro Togashi'
                        value={formData.description}
                        onChange={(event) => setFormData({...formData, description: event.target.value})}
                    />
                </label>
                <label className={style.inputFile}>


                    {formData.image.url ? (
                        <img src={formData.image.url} />
                    ) : (
                        <div className={style.imagePreview}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711L17.657 9.65685L12.0001 4L6.34326 9.65685L7.75748 11.0711L11 7.82854V14.9861Z" fill="currentColor" /><path d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z" fill="currentColor" /></svg>
                        <p>imagem de capa</p>
                        </div>
                    )}
                    
                        <div>
                            <span>Imagem</span>
                            {formData.image.name ? <p>{formData.image.name}</p> : <p>Selecione uma imagem</p>}
                        </div>
                    <input onChange={(event) => handleChangeImage(event.target)} type="file"/>
                </label>

                <button>Adicionar</button>
            </form>
        </ReactModal>
    )
}