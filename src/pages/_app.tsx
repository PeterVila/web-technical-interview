import type { AppProps } from "next/app"
import "../styles/globals.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthWrapper from "../components/AuthWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <AuthWrapper>
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
    </AuthWrapper>
  )
}

export default MyApp
