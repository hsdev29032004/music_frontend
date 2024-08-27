import './App.css';
import {Route, Routes} from "react-router-dom"
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

function App() {
  return (
    <Routes>
        <Route element={<Auth />}>
          <Route path='/login' element={<Login title="Meelow - Đăng nhập" />}/>
          <Route path='/register' element={<Register title="Meelow - Đăng ký"/>} />
          <Route path='/forgot-password' element={<ForgotPassword title="Meelow - Quên mật khẩu"/>} />
        </Route>
        <Route element={<CheckLogin />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Discover title="Meelow - Khám phá"/>}></Route>
            <Route path='/library' element={<Library title="Meelow - Thư viện"/>}></Route>
            <Route path='/rank' element={<Ranking title="Meelow - Bảng xếp hạng"/>}></Route>
            <Route path='/search' element={<Search title="Meelow - Tìm kiếm"/>}></Route>
            <Route path='/singer/:slug' element={<Singer title="Meelow - Ca sĩ" />}></Route>
            <Route path='/music/:slug' element={<Music title="Meelow - Bài hát" />}></Route>
            <Route path='/album/:slug' element={<Album title="Meelow - Album" />}></Route>
            <Route element={<Unauthorized />}>
              <Route path='/config' element={<Config title="Meelow - Cài đặt website"/>}></Route>
              <Route path='/dashboard' element={<Dashboard title="Meelow - Tổng quan"/>}></Route>
            </Route>
            <Route path='*' element={<NotFound title="Meelow - 404"/>} />
          </Route>
        </Route>
    </Routes>
  );
}

export default App;
