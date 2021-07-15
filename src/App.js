
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import Home from './pages/home/Home'
import MapPage from './pages/map/MapPage'

function App(props) {
    return (
        <Router>
            <Switch>
                <Route path='/map/:cep/:lat/:lon'>
                    <MapPage />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default App