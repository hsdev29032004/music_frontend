import { Outlet } from "react-router-dom";
import Menu from "../Menu/Menu";
import "./Layout.css"
import Playlist from "../Playlist/Playlist";
import Header from "../Header/Header";

export default function Layout () {
    return (
        <>
            <Header />
            <Menu />
            <div id="main">
                <Outlet />
            </div>
            <Playlist />
        </>
    )
}