import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComic = lazy(() => import('../singleComic/SingleComic'));
const MainPage = lazy(() => import('../pages/MainPage'));
const Page404 = lazy(() => import('../pages/404'));
const SingleCharacter = lazy(() => import('../singleCharacter/SingleCharacter'));


const App = () => {

    return (
       <Router>
        <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComic/>}/>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                        <Route path="/character/:id" element={<SingleCharacter/>}/>
                    </Routes>
                </Suspense>
            </main>
        </div>
       </Router>
    )

}

export default App;