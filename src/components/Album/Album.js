import { Link } from "react-router-dom";
import "./Album.css"
import { handleReplaceWaitingList } from "../../helpers/playlist";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { likeAlbum } from "../../services/favorite";
import { openAlbumMenuContext } from "../../actions/menuContext"

export default function Album({value, messageApi, user}) {    
    const dispatch = useDispatch()
    const heartRef = useRef(null)

    const handleOpenMenu = (event, value) => {
        event.preventDefault();
        event.stopPropagation();

        const { clientX: left, clientY: top } = event;

        dispatch(openAlbumMenuContext({album: value, menuPosition: {top, left}}))
    }

    const handleLike = async () => {
        const result = await likeAlbum(value._id, user._id)
        if(result.status === "like"){
            heartRef.current.classList.add("liked")
            messageApi.success(result.msg)
        }else if(result.status === "unlike"){
            heartRef.current.classList.remove("liked")
            messageApi.success(result.msg)
        }else if (result.status === "error"){
            messageApi.error(result.msg)
        }
    }
    
    return (
        <div>
            <div className="inner-image">
                <img src={value.avatar} alt="" />
                <div className="tippy">
                    <i ref={heartRef} className={`fa-duotone fa-solid fa-heart ${user?.likedAlbum?.includes(value._id) ? 'liked' : ''}`} onClick={handleLike}></i>
                    <i className="fa-solid fa-triangle" onClick={() => handleReplaceWaitingList(value, dispatch, messageApi, "ALBUM")}></i>
                    <i onClick={(event) => handleOpenMenu(event, value)} className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            <div className="mt-2 text-center">
                <Link to={`album/${value.slug}`} className="ellipsis">
                    <h3 className='album-link'>{value.name}</h3>
                </Link>
                <Link to={`singer/value.singerId.slug`} className="ellipsis">
                    {value.singerId.fullName}
                </Link>
            </div>
        </div>
    )
}