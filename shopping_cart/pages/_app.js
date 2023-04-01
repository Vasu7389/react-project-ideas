import '@/styles/globals.css'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
