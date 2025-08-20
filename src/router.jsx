import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import NotFound from "./pages/NotFound.jsx";
import Videos from "./pages/Videos.jsx";
import VideoDetail from "./pages/VideoDetail.jsx";
import Error from "./components/Error.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        errorElement:<NotFound/>,
        children:[
            { index: true, element: <Videos/> },
            { path: 'videos', element: <Videos/> },
            { path: 'videos/:keyword', element: <Videos/> },
            { path: 'videos/watch/:videoId', element: <VideoDetail/> },
        ],
    }
]);

export default router;