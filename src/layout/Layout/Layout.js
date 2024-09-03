import React, { useRef, useEffect, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Menu from "../Menu/Menu";
import "./Layout.css";
import Playlist from "../Playlist/Playlist";
import Header from "../Header/Header";
import { useSelector } from 'react-redux';

export default function Layout() {
    const mainRef = useRef(null);
    const thumbRef = useRef(null);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [showFakeScroll, setShowFakeScroll] = useState(false);
    const location = useLocation()

    const system = useSelector(state => state.systemInfoReducer)

    useEffect(() => {
        const mainElement = mainRef.current;
        const handleScroll = () => {
            setScrollTop(mainElement.scrollTop);
        };

        const updateDimensions = () => {
            const newScrollHeight = mainElement.scrollHeight;
            const newClientHeight = mainElement.clientHeight;
            setScrollHeight(newScrollHeight);
            setClientHeight(newClientHeight);
            setShowFakeScroll(newScrollHeight > newClientHeight);
        };

        mainElement.addEventListener("scroll", handleScroll);
        updateDimensions();

        const resizeObserver = new ResizeObserver(updateDimensions);
        resizeObserver.observe(mainElement);

        return () => {
            mainElement.removeEventListener("scroll", handleScroll);
            resizeObserver.disconnect();
        };
    }, [scrollTop, location]);

    useEffect(() => {
        if (thumbRef.current) {
            const thumbElement = thumbRef.current;
            const thumbHeight = (clientHeight / scrollHeight) * clientHeight;

            thumbElement.style.height = `${thumbHeight}px`;
            thumbElement.style.top = `${(scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight)}px`;
        }
    }, [scrollTop, scrollHeight, clientHeight, location]);

    return (
        <>
            <Header />
            <Menu />
            <div id="main" ref={mainRef}>
                <div className='container'>
                    <Outlet />
                </div>
                {showFakeScroll && (
                    <div className="fake-scroll">
                        <div className="fake-scroll-thumb" ref={thumbRef}></div>
                    </div>
                )}
                <footer className='pt-2 pb-2 mt-4 text-center' style={{borderTop: "1px solid #3f3f3f", color: "#717171", fontSize: "15px"}}>{system.footer}</footer>
            </div>
            <Playlist />
        </>
    );
}
