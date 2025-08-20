import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import {RouterProvider} from "react-router-dom";
import router from './router.jsx';
import {DarkModeProvider} from "./context/DarkModeContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
        <RouterProvider router={router}/>
    </DarkModeProvider>
  </StrictMode>,
)
