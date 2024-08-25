    import { useState, useRef, useEffect } from 'react';
    import { LeftOutlined, RightOutlined } from '@ant-design/icons';
    import { getListPlaylist } from '../../services/playlist';
    import { useDispatch, useSelector } from 'react-redux';
    import { Link, NavLink, useLocation } from 'react-router-dom';
    import './Menu.css';
    import { openModalCreatePlaylist } from '../../actions/modal';
    import { openPlaylistMenuContext } from '../../actions/menuContext';
import { savePl } from '../../actions/savePl';
    // import { savePl } from '../../actions/playlist';

    export default function Menu() {
        const [collapse, setCollapse] = useState(window.matchMedia('(max-width: 1125px)').matches);
        const [playlist, setPlaylist] = useState([])
        const dispatch = useDispatch()
        const location = useLocation();        

        const menuRef = useRef(null);
        const imgRef = useRef(null);
        const secondaryRef = useRef(null);    

        const { value } = useSelector(state => state.loginReducer);
        // const playlist = useSelector(state => state.savePlReducer)
        
        const {playlistChange: reloadPlaylist} = useSelector(state => state.reloadReducer)        

        const handleOpenMenu = (event, playlist) => {                    
            event.preventDefault();
            event.stopPropagation(); // Thêm để hiển thị menucontext
            
            const { clientX: left, clientY: top } = event;
                        
            dispatch(openPlaylistMenuContext({playlist: playlist, menuPosition: {top, left}}))
        };

        const handleClick = () => {
            setCollapse(!collapse);
        };

        const changeStt = () => {
            dispatch(openModalCreatePlaylist())
        };

        useEffect(() => {            
            const updateMenuStyles = () => {                
                const menu = menuRef.current;
                const img = imgRef.current;
                const secondary = secondaryRef.current;

                const p = document.querySelectorAll("#menu p");
                const li = document.querySelectorAll(".menu-content ul li");
                const i = document.querySelectorAll(".menu-content i");                

                if (collapse) { // Đóng
                    img.src = 'https://res.cloudinary.com/dfjft1zvv/image/upload/v1722261635/xvd0dyrysq5orblilqul.png';
                    img.style.width = "40px";
                    menu.style.width = "80px";
                    secondary.style.display = "none";
                    p.forEach((item) => {
                        item.style.display = "none";
                    });
                    li.forEach((item) => {
                        item.style.display = "flex";
                        item.style.justifyContent = "center";
                    });
                    i.forEach(item => {
                        item.classList.remove("mr-3")
                    });
                } else { // Mở
                    img.src = 'https://res.cloudinary.com/dfjft1zvv/image/upload/v1722263453/lhuc6qqvcxzl0rxjlcdh.png';
                    img.style.width = "150px";
                    menu.style.width = "230px";
                    secondary.style.display = "block";
                    p.forEach((item) => {
                        item.style.display = "inline";
                    });
                    li.forEach((item) => {
                        item.style.display = "block";
                        item.style.justifyContent = "unset";
                    });
                    i.forEach(item => {
                        item.classList.add("mr-3");
                    });
                }
            };

            updateMenuStyles();
        }, [collapse, location, value]);

        useEffect(() => {
            window.addEventListener('resize', () => {
                const smallScreen = window.matchMedia('(max-width: 1125px)');
                setCollapse(smallScreen.matches);
            });

            return () => {
                window.removeEventListener('resize', () => {
                    const smallScreen = window.matchMedia('(max-width: 1125px)');
                    setCollapse(smallScreen.matches);
                });
            };
        }, [collapse])

        useEffect(() => {
            const fetchPlaylist = async () => {
                const result = await getListPlaylist(value?._id);
                setPlaylist(result.data)
                dispatch(savePl(result.data))
            };

            if (value?._id) {
                fetchPlaylist();
            }
            // eslint-disable-next-line
        }, [value, reloadPlaylist]);

        useEffect(() => {
            const listItems = document.querySelectorAll(".menu-content ul li");
            const actionDiv = document.getElementById("menu-action");

            const routeToPosition = {
                '/': 1,
                '/library': 2,
                '/rank': 3,
                '/dashboard': 4,
                '/config': 5,
            };

            const currentPath = location.pathname;
            const initialPosition = routeToPosition[currentPath || "/"];
            if (!initialPosition) {
                actionDiv.style.display = "none";
            } else {
                actionDiv.style.display = "block";
                const numberOfItems = listItems.length;
                if ((initialPosition - 1) * (100 / numberOfItems) >= 100) {
                    actionDiv.style.display = "none";
                    return;
                }
                actionDiv.style.top = `${(initialPosition - 1) * (100 / numberOfItems)}%`;
                actionDiv.style.height = `${100 / numberOfItems}%`;
            }
        }, [location, value]);

        const menus = [
            {
                content: "Khám phá",
                path: "/",
                icon: "fa-regular fa-compact-disc fa-fw",
                level: 0,
            },
            {
                content: "Thư viện",
                path: "/library",
                icon: "fa-duotone fa-album-circle-user fa-fw",
                level: 0,
            },
            {
                content: "Bảng xếp hạng",
                path: "/rank",
                icon: "fa-solid fa-ranking-star",
                level: 0,
            },
            {
                content: "Tổng quan",
                path: "/dashboard",
                icon: "fa-regular fa-grid-horizontal",
                level: 3,
            },
            {
                content: "Cấu hình",
                path: "/config",
                icon: "fa-solid fa-gear",
                level: 3,
            },
        ];    

        return (
            <>
                <div id="menu" ref={menuRef}>
                    <div className="header-logo dflex-aj-center">
                        <img
                            ref={imgRef}
                            width={collapse ? "150px" : "40px"}
                            src={collapse ? 'https://res.cloudinary.com/dfjft1zvv/image/upload/v1722263453/lhuc6qqvcxzl0rxjlcdh.png' : 'https://res.cloudinary.com/dfjft1zvv/image/upload/v1722261635/xvd0dyrysq5orblilqul.png'}
                            alt="logo"
                        />
                    </div>

                    <div className="menu-content">
                        <ul>
                            {menus.map((item, key) =>
                                value?.level >= item.level && (
                                    <NavLink to={item.path} key={key} className="text-gray fw-600 mt-3 mb-3">
                                        <li className="d-flex">
                                            <i className={`${item.icon} mr-3`} style={{ fontSize: "20px", zIndex: 2 }}></i>
                                            <p style={{ zIndex: 2 }}>{item.content}</p>
                                        </li>
                                    </NavLink>
                                )
                            )}
                            <div id="menu-action"></div>
                        </ul>
                    </div>

                    <div className="divide"></div>

                    <div className="secondary" ref={secondaryRef}>
                        {value?.level === 1 && (
                            <div className="card-nav-upgrade">
                                <p className="">Nâng cấp để nghe toàn bộ kho nhạc PREMIUM</p>
                                <div className="btn-yellow">Nâng cấp tài khoản</div>
                            </div>
                        )}
                        {value?.level === 0 && (
                            <div className="card-nav-upgrade">
                                <p className="">Đăng nhập để khám phá chức năng của Meelow</p>
                                <Link style={{ display: "block" }} to="/login" className="btn-yellow">Đăng nhập ngay</Link>
                            </div>
                        )}
                        <ul>
                            {playlist && playlist.length > 0 && playlist.map((value, key) => (
                                <li key={key} className="text-gray d-flex-spacebetween playlist-item">
                                    <p style={{padding: "5px"}}>{value.name}</p>
                                    <i onClick={(event) => handleOpenMenu(event, value)} className="fa-solid fa-ellipsis icon-more"></i>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="add-playlist-sidebar text-gray dflex-aj-center" onClick={changeStt}>
                        <i className="fa-regular fa-circle-plus mr-2"></i>
                        <p>Tạo playlist mới</p>
                    </div>
                    <div className="btn-collapse text-gray dflex-aj-center">
                        {collapse ?
                            <RightOutlined className="icon-collapse" onClick={handleClick} />
                            :
                            <LeftOutlined className="icon-collapse" onClick={handleClick} />}
                    </div>
                </div>
            </>
        );
    }
