import {Outlet} from "react-router-dom";
import SearchHeader from "./components/SearchHeader.jsx";
import {useDarkMode} from "./context/useDarkMode.js";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {YoutubeApiProvider} from "./context/YoutubeApiContext.jsx";
import ScrollToTop from "./components/ScrollTop.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            keepPreviousData: false,
            staleTime: 0,
            gcTime: 0,
        },
    },
});

function App() {
    const { isDark } = useDarkMode();

    return (
    <main className={`${isDark && 'bg-black text-white'} transition-colors duration-100 w-full min-h-screen flex flex-col`}>
        <ScrollToTop behavior="auto" />
        <SearchHeader/>
        <YoutubeApiProvider>
            <QueryClientProvider client={queryClient}>
                <Outlet/>
            </QueryClientProvider>
        </YoutubeApiProvider>
    </main>
    )
}

export default App
