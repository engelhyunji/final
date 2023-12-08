import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.tsx'
import store from './redux/config/configStore'
import { createRoot } from 'react-dom/client' 
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root')!)

root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>
        {/* Add the ReactQueryDevtools component */}
        <ReactQueryDevtools />
    </QueryClientProvider>,
)

// 그전 셋팅 버전.
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import store from './redux/config/configStore'
// import { Provider } from 'react-redux'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
// )
