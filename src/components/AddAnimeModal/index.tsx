import style from './style.module.scss'
import ReactModal from 'react-modal';

interface IAddAnimeModalProps {
    isOpen: boolean;
    setToggleModal: () => void;
}

ReactModal.setAppElement('#root')

export function AddAnimeModal({isOpen, setToggleModal}: IAddAnimeModalProps) {
    
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={setToggleModal}
            className={style.modal__content}
            overlayClassName="modal__overlay"
        >

            ad

        </ReactModal>
    )
}