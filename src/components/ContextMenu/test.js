import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAlbumMenuContext } from "../../actions/menuContext";
import { message } from "antd";
import { handleCopy } from "../../helpers/copy";

export default function AlbumContextMenu() {
    const [messageApi, contextHolder] = message.useMessage();
    const contextMenuRef = useRef(null);
    const dispatch = useDispatch();

    const albumContextMenu = useSelector(state => state.AlbumContextMenuReducer);
    const menuPosition = albumContextMenu.data?.menuPosition;
    const album = albumContextMenu.data?.album;
    const isMenuOpen = albumContextMenu.albumOpen;

    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            dispatch(closeAlbumMenuContext());
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
        // eslint-disable-next-line
    }, []);

    const menuStyles = () => {
        if (!isMenuOpen) return {};

        // Lấy kích thước thực của menuContext
        const menuElement = contextMenuRef.current;
        const menuHeight = menuElement?.offsetHeight;
        const menuWidth = menuElement?.offsetWidth;

        const { top, left } = menuPosition;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        let adjustedTop = top + 10;
        let adjustedLeft = left + 10;

        if (adjustedTop + menuHeight > windowHeight) {
            adjustedTop = top - menuHeight - 10;
        }

        if (adjustedLeft + menuWidth > windowWidth) {
            adjustedLeft = windowWidth - menuWidth - 10;
        }

        return {
            position: 'fixed',
            top: adjustedTop,
            left: adjustedLeft,
            zIndex: 1000,
        };
    };

    return isMenuOpen ? (
        <>
            {contextHolder}
            <div
                ref={contextMenuRef}
                className="context-menu"
                style={menuStyles()}
            >
                <ul style={{ color: "white" }}>
                    <li>
                        <i className="fa-regular fa-list-music"></i>
                        <button>Thêm vào danh sách phát</button>
                    </li>
                    <li>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <button>Chỉnh sửa playlist</button>
                    </li>
                    <li>
                        <i className="fa-solid fa-trash"></i>
                        <button>Xóa playlist</button>
                    </li>
                    <li
                        onClick={() => handleCopy(`http://localhost:3000/album/${album.slug}`, messageApi)}
                    >
                        <i className="fa-solid fa-link"></i>
                        <button>Sao chép liên kết</button>
                    </li>
                </ul>
            </div>
        </>
    ) : null;
}
