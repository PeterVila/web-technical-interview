import type { AppProps } from "next/app"
import { ToastContainer } from 'react-toastify';

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
