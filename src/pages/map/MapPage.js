
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
const cepCoords = require('coordenadas-do-cep')

function MapPage(props) {
  const [ key ] = useState(process.env.REACT_APP_LEAFLET_KEY)
  const [ cepInfo, setCepInfo ] = useState({})
  const history = useHistory()
  const match = useParams()

  useEffect(() => {

    async function getCepInfo() {
      try {
        const cepInfo = await cepCoords.getInfoCep(match.cep)
        setCepInfo(cepInfo)
      } catch(err) {
        console.log('Ocorreu um erro')
      }
    }

    getCepInfo()
    
  }, [])

  function voltar() {
    history.push('/')
  }
  
  return (
    <div className='mappage'>
      <div className='info'>
        <div className='cep'>{cepInfo.cep}</div>
        <div className='content'>
          <div className='item-content'>{cepInfo.uf}</div>
          <div className='item-content'>{cepInfo.localidade}</div>
          <div className='item-content'>{cepInfo.bairro}</div>
          <div className='item-content'>{cepInfo.logradouro}</div>
        </div>
        <button onClick={() => { voltar() }} className='voltar-btn' >Voltar</button>
      </div>
      <MapContainer center={[match.lat, match.lon]} zoom={13} scrollWheelZoom={true} className='map' >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          maxZoom='18'
          id='mapbox/dark-v10'
          tileSize='256'
          accessToken={key}
        />
        <Marker position={[match.lat, match.lon]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default MapPage