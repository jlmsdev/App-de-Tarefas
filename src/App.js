import RoutesApp from "./routes/routes"
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return(
    <div>
      <ToastContainer
        autoClose={1500}
        position="top-right"
        closeOnClick={true}
        limit={1}
        theme="dark"
        className='configToast'
      />

      <RoutesApp />
    </div>
  )
}