import style from './style.module.scss'

export function Card() {
    return (
        <div className={style.card}>
            <img 
                src="https://img1.ak.crunchyroll.com/i/spire3/cbb55a6382682bf71e91f685c6473c5a1487736090_full.jpg" 
                alt="Imagem de capa do anime Hunter X Hunter"
                title="Hunter X Hunter"
                        />
            <div>
                <h2>Hunter X Hunter</h2>
                <p>Hunter × Hunter é uma série de mangá escrita e ilustrada por Yoshihiro Togashi. </p>
            </div>
            {/* <button>Assistido</button> */}
        </div>
    )
}