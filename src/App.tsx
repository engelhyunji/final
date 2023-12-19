import AppRoutes from './router/AppRoutes'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
// import MapComponent from './components/Map/MapComponent'

const queryClient = new QueryClient()

const App = () => {
    return (
        <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop) && prop !== 'isSelected'}>
            <QueryClientProvider client={queryClient}>
                <AppRoutes />
                {/* <MapComponent /> */}
            </QueryClientProvider>
        </StyleSheetManager>
    )
}

export default App
