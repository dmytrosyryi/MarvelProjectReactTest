import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import("../pages/Page404"))
const MainPage = lazy(() => import("../pages/MainPage"))
const ComicsPage = lazy(() => import("../pages/ComicsPage"))
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"))
const SinglePage = lazy(() => import("../pages/SinglePage"))
const SingleCharacterLoyout = lazy(() => import("../pages/singleCharacterLoyout/SingleCharacterLoyout"))
const SingleComicLoyout = lazy(() => import("../pages/SingleComicLoyout/SingleComicLoyout"))


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicLoyout} dataType='comic' />} />
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLoyout} dataType='character' />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>

    )

}

export default App