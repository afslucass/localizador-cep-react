
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import target from '../../assets/target-icon.svg'
import leaftLogo from '../../assets/leafletlogo.png'
import OSMLogo from '../../assets/256px-Openstreetmap_logo.svg.png'
import OSILogo from '../../assets/Osi_standard_logo.png'
const cepCoords = require('coordenadas-do-cep')

function Home(props) {

    const [cep, setCep] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const [loading, setLoading] = useState('')
    const history = useHistory()

    async function processCep() {
        setErrorMessage(false)
        try {
            setLoading('loading')
            document.querySelector('button').disabled = true
            const cepData = await cepCoords.getByCep(cep)
            history.push(`/map/${cep}/${cepData.lat}/${cepData.lon}`)
        } catch (err) {
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

                    {errorMessage === true && <div id='error-message'>valor não corresponte a um cep</div>}
                </div>
                <img src={target} alt='imagem simbolica de uma taxa usada para marcar mapas' />
                <img src={target} alt='imagem simbolica de uma taxa usada para marcar mapas' />
                <div className='author'>OBS: As consultas não são 100% precisas</div>
                <div className='down'>Arraste Para Baixo</div>
            </div>
            <article>
                <h1>Mapas Open Source</h1>
                <p>Software de código aberto ( OSS ) é o software de computador lançado sob uma licença na qual o detentor dos direitos autorais concede aos usuários os direitos de usar, estudar, alterar e distribuir o software e seu código-fonte para qualquer pessoa e para qualquer finalidade. O software de código-fonte aberto pode ser desenvolvido de forma pública colaborativa . O software de código aberto é um exemplo proeminente de colaboração aberta.</p>
                <div className='img'>
                    <img src={OSILogo} alt='logo Open Source' />
                    <p>Colin Viebrock, <a href='http://www.opensource.org/logo-usage-guidelines#The_Standard_Logo'>http://www.opensource.org/logo-usage-guidelines#The_Standard_Logo</a> - <a href='https://creativecommons.org/licenses/by-sa/2.5/deed.en'>https://creativecommons.org/licenses/by-sa/2.5/deed.en</a></p>
                </div>
                <p>
                Um mapeamento da Web ou um mapeamento online é o processo de utilização de mapas fornecidos por sistemas de informação geográfica (SIG) na Internet, mais especificamente na World Wide Web (WWW). Um mapa da web ou um mapa online é servido e consumido, portanto, o mapeamento da web é mais do que apenas uma cartografia da web, é um serviço pelo qual os consumidores podem escolher o que o mapa mostrará. O Web GIS enfatiza os aspectos de processamento de geodados mais envolvidos com aspectos de design, como aquisição de dados e arquitetura de software de servidor, como armazenamento de dados e algoritmos, do que os próprios relatórios do usuário final.
                </p>
                <p>
                    OpenStreetMap (OSM) é um projeto colaborativo para criar um mapa do mundo editável gratuitamente. Os geodados subjacentes ao mapa são
                    considerados a saída principal do projeto. A criação e o crescimento do OSM foram motivados por restrições no uso ou disponibilidade de
                    dados de mapas em grande parte do mundo e pelo advento de dispositivos portáteis de navegação por satélite de baixo custo.
                </p>
                <div className='img'>
                    <img src={OSMLogo} alt='logo OpenStreetMap' />
                    <p>Ken Vermette, <a href='https://wiki.openstreetmap.org/wiki/File:Public-images-osm_logo.svg'>https://wiki.openstreetmap.org/wiki/File:Public-images-osm_logo.svg</a> - <a href='https://creativecommons.org/licenses/by-sa/2.0/deed.en'>https://creativecommons.org/licenses/by-sa/2.0/deed.en</a></p>
                </div>
                <p>
                    Os dados do mapa são coletados do zero por voluntários realizando levantamentos sistemáticos do solo usando ferramentas como uma unidade GPS portátil, um notebook, uma câmera digital ou um gravador de voz. Os dados são então inseridos no banco de dados OpenStreetMap usando uma série de ferramentas de software, incluindo JOSM e Mercator. Os eventos de competição do Mapathon também são realizados pela equipe do OpenStreetMap e por organizações sem fins lucrativos e governos locais para mapear uma área específica. 
                </p>
                <p>
                    Para fazer a pequisa de dados, usa-se o Nominatim que é uma ferramenta para pesquisar dados OSM por nome e endereço (geocodificação) e para gerar endereços sintéticos de pontos OSM (geocodificação reversa). Ele pode ser encontrado em nominatim.openstreetmap.org.
                </p>
                <p>
                    Além disso, outra ferramenta muito utilizada se chama Leaflet que é uma biblioteca JavaScript de código aberto usada para construir aplicativos de mapeamento da web. Lançado pela primeira vez em 2011, [2] ele suporta a maioria das plataformas móveis e de desktop, com suporte a HTML5 e CSS3. Entre seus usuários estão FourSquare, Pinterest e Flickr.
                </p>
                <div className='img'>
                    <img src={leaftLogo} alt='logo leaflet' />
                    <p><a href='http://leaflet.cloudmade.com'>http://leaflet.cloudmade.com</a></p>
                </div>
                <p>
                    Há o Viacep, uma serviço web que permite a consulta de CEPs de endereços brasileiros gratuitamente. Este serviço retorna informações como 
                    CEP, nome da Cidade, UF, etc.
                </p>
                <p>
                    Fontes: https://wiki.openstreetmap.org, https://www.wikipedia.org/
                </p>
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