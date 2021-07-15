
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
        <div className='homepage'>
            <div>
                <div>
                    <input type='text' placeholder='ex: 72005160' onMouseOver={() => overInGreenRow()} onMouseOut={() => overOutGreenRow()} onChange={(e) => setCep(e.target.value)} value={cep} />
                    <button onClick={() => processCep()} className={loading}>Buscar</button>
                </div>
                <div id='green-row' onClick={() => inputFocus()}></div>

                { errorMessage == true && <div id='error-message'>valor não corresponte a um cep</div> }
            </div>
            <img src={target} />
            <img src={target} />
            <div className='author'>OBS: As consultas não são 100% precisas</div>
        </div>
    )
}

export default Home