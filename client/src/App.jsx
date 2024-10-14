import { BrowserRouter,Routes,Route } from 'react-router-dom'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import React from 'react'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import About from './pages/About'
import Header from './components/Header'
import FooterCom from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'
import Dashboard from "./pages/Dashboard"
import UpdatePost from "./pages/UpdatePost"
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import News from './pages/News'
import Search from './pages/Search'
import Market from './pages/Market'
function App() {
  return (

    <BrowserRouter>
    <Header />
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path='/sign-up' element={<SignUp />} />
      
      <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
          <Route path='/search' element={<Search />} />
        </Route>
      <Route path="/news" element={<News/>}></Route>
      <Route path="/post/:postSlug" element={<PostPage />}></Route>
      <Route path='/market' element={<Market />} />
    </Routes>
    <FooterCom />
    </BrowserRouter>
  )
}

export default App