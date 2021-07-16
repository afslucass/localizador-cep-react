
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import target from '../../assets/target-icon.svg'
const cepCoords = require('coordenadas-do-cep')

function Home(props) {

    const [ cep, setCep ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(false)
    const [ loading, setLoading ] = useState('')
    const history = useHistory()

    async function processCep() {
        setErrorMessage(false)
        try {
            setLoading('loading')
            document.querySelector('button').disabled = true
            const cepData = await cepCoords.getByCep(cep)
            history.push(`/map/${cep}/${cepData.lat}/${cepData.lon}`)
        } catch(err) {
            setLoading('')
            document.querySelector('button').disabled = false
            setErrorMessage(true)
        }
    }

    function inputFocus() {
        document.querySelector('input').focus()
    }

    function overInGreenRow() {
        document.getElementById('green-row').style.backgroundColor = '#339900'
    }
    function overOutGreenRow() {
        document.getElementById('green-row').style.backgroundColor = '#4CE500'
    }

    return (
        <div>
            <div className='homepage'>
                <div>
                    <div>
                        <input type='text' placeholder='ex: 72005160' onMouseOver={() => overInGreenRow()} onMouseOut={() => overOutGreenRow()} onChange={(e) => setCep(e.target.value)} value={cep} />
                        <button onClick={() => processCep()} className={loading}>Buscar</button>
                    </div>
                    <div id='green-row' onClick={() => inputFocus()}></div>

                    { errorMessage === true && <div id='error-message'>valor não corresponte a um cep</div> }
                </div>
                <img src={target} alt='imagem simbolica de uma taxa usada para marcar mapas' />
                <img src={target} alt='imagem simbolica de uma taxa usada para marcar mapas' />
                <div className='author'>OBS: As consultas não são 100% precisas</div>
            </div>
            <article>
                <h1>Sobre o Localizador de CEP</h1>
                <p>
                    Este é um projeto que visa prover uma interface simples, rapida e facil para os usuarios 
                    extrairem informações sobre localidades o mais rapido possivel. Utilizamos tecnologias para 
                    calcular a localizacao de CEP Brasileiros no Globo, mostrando o resultado final por 
                    meio de um mapa. O resultado não é 100% preciso pois não temos acesso a um base de dados 
                    grande o suficiente.
                </p>
                <p>
                    O site foi desenvolvido como forma de aprendizado em uma tecnologia para construção de aplicações web 
                    chamada React, utilizando tecnologias de terceiros para o tratamento e obtenção dos dados de localização para
                    projetar no mapa a consulta do usuario.
                </p>
                <p>
                    Não nos responsabilizamos por nenhum prejuizo sofrido por parte do usuário.
                </p>
                <h1>Tecnologias Usadas</h1>
                <p>HTML, CSS, Javascript</p>
                <p>React - <a href='https://pt-br.reactjs.org/'>https://pt-br.reactjs.org/</a></p>
                <p>Leaflet - <a href='https://leafletjs.com/'>https://leafletjs.com/</a></p>
                <p>Coordenadas do CEP - <a href='https://www.npmjs.com/package/coordenadas-do-cep'>https://www.npmjs.com/package/coordenadas-do-cep</a></p>
                <p>Viacep - <a href='https://viacep.com.br/'>https://viacep.com.br/</a></p>
                <p>Sass - <a href='https://sass-lang.com/'>https://sass-lang.com/</a></p>
            </article>
        </div>
    )
}

export default Home