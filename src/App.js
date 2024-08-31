import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Auth from './pages/Auth/Auth';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import Layout from './layout/Layout/Layout';
import CheckLogin from './pages/CheckLogin/CheckLogin';
import Library from './pages/Library/Library';
import Ranking from './pages/Ranking/Ranking';
import Discover from './pages/Discover/Discover';
import Config from './pages/Config/Config';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound.js';
import Unauthorized from './pages/Unauthorized/Unauthorized.js';
import Search from './pages/Search/Search.js';
import Singer from './pages/Singer/Singer.js';
import Music from './pages/Music/Music.js';
import Album from './pages/Album/Album.js';
import Playlist from './pages/Playlist/Playlist.js';
import { getSystem } from './services/system.js';

function App() {
  const [system, setSystem] = useState({})

  useEffect(() => {
    const fetchSystem = async () => {
        const result = await getSystem()        
        setSystem(result.data)
    };

    fetchSystem()
  }, []);  

  return (
    <HelmetProvider>
      <Routes>
        <Route element={<Auth />}>
          <Route path='/login' element={<Login title={`${system.siteName || "Meelow"} - Đăng nhập`} />} />
          <Route path='/register' element={<Register title={`${system.siteName} - Đăng ký`} />} />
          <Route path='/forgot-password' element={<ForgotPassword title={`${system.siteName || "Meelow"} - Quên mật khẩu`} />} />
        </Route>
        <Route element={<CheckLogin />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Discover title={`${system.siteName || "Meelow"} - Khám phá`} />} />
            <Route path='/library' element={<Library title={`${system.siteName || "Meelow"} - Thư viện`} />} />
            <Route path='/rank' element={<Ranking title={`${system.siteName || "Meelow"} - Bảng xếp hạng`} />} />
            <Route path='/search' element={<Search title={`${system.siteName || "Meelow"} - Tìm kiếm`} />} />
            <Route path='/singer/:slug' element={<Singer title={`${system.siteName || "Meelow"} - Ca sĩ`} />} />
            <Route path='/music/:slug' element={<Music title={`${system.siteName || "Meelow"} - Bài hát`} />} />
            <Route path='/album/:slug' element={<Album title={`${system.siteName || "Meelow"} - Album`} />} />
            <Route path='/playlist/:slug' element={<Playlist title={`${system.siteName || "Meelow"} - Playlist`} />} />
            <Route element={<Unauthorized />}>
              <Route path='/config' element={<Config title={`${system.siteName || "Meelow"} - Cài đặt website`} />} />
              <Route path='/dashboard' element={<Dashboard title={`${system.siteName || "Meelow"} - Tổng quan`} />} />
            </Route>
            <Route path='*' element={<NotFound title={`${system.siteName || "Meelow"} - 404`} />} />
          </Route>
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
