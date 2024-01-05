// import React from 'react';
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // react-redux의 Provider를 import
import AppRoutes from './router/AppRoutes';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import store from './redux/config/configStore';
// import MapComponent from './components/Map/MapComponent';

const queryClient = new QueryClient();

const App = () => {
    // const coords = {
    //     lat: 33.450701, // 기본 위도
    //     lng: 126.570667 // 'lng'로 변경
    // };

    return (
        <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop) && prop !== 'isSelected'}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <AppRoutes />
                </Provider>
                {/* <MapComponent coords={coords} /> */}
            </QueryClientProvider>
        </StyleSheetManager>
    )
}

export default App;
