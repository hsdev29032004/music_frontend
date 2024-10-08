import { Link } from 'react-router-dom';
import "./Music.css";
import { Fragment, useRef, useState } from 'react';
import { likeMusic } from '../../services/favorite';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { openMusicMenuContext } from '../../actions/menuContext';
import { handleReplaceWaitingList } from '../../helpers/playlist';
import { formatNumber } from "../../helpers/format"
import { deleteFromPlaylist } from '../../services/music';

export default function Music({ data, likedMusic, userId, showMore, showLike, showDelete}) {   
    const dispatch = useDispatch()
    const [quantityLike, setQuantityLike] = useState(data.quantityLike)
    const [isLiked, setIsLiked] = useState(likedMusic?.some(item => item._id === data._id))    
    const [_delete, setDelete] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();
    const heartRef = useRef(null);

    const allSingers = [data.singerId, ...data.otherSingersId];

    const handleClickLink = (e) => {
        e.stopPropagation()
    }

    const singerLinks = allSingers.map((singer, index) => (
        <Fragment key={singer.slug}>
            <Link onClick={handleClickLink} to={`/singer/${singer.slug}`} className="singer-link">
                {singer.fullName}
            </Link>
            {index < allSingers.length - 1 && ', '}
        </Fragment>
    ));

    const handleLike = async (e) => {
        e.stopPropagation()
        const result = await likeMusic(data._id, userId)
        if (result.status === "like") {
            heartRef.current?.classList.add("liked");
            setIsLiked(true)
            setQuantityLike(prev => prev + 1)
        } else if (result.status === "unlike") {
            heartRef.current?.classList.remove("liked");
            setIsLiked(false)
            setQuantityLike(prev => prev - 1)
        }
    }

    const handleOpenMenu = (event, data) => {
        event.preventDefault();
        event.stopPropagation();

        const { clientX: left, clientY: top } = event;
         
        dispatch(openMusicMenuContext({music: data, menuPosition: {top, left}}))
    }

    const handleDelete = async () => {
        const result = await deleteFromPlaylist({musicId: data._id, playlistId: showDelete})
        if(result.status === "success"){
            setDelete(true)
        }
    }

    if(_delete){
        return null
    }
    
    return (
        <>
            {contextHolder}
            <div className={`music-playlist-item`}>
                <div className="inner-item">
                    <div className="inner-img-playlist">
                        <img src={data.avatar} alt="" />
                    </div>
                    <div className="ml-2">
                        <Link to={`/music/${data.slug}`} className="ellipsis" onClick={handleClickLink}>
                            {data.premium ? <span className='tag-premium'>Premium</span> : null}
                            <h3 className='song-link'>{data.name}</h3>
                        </Link>
                        <p className="ellipsis">
                            {singerLinks}
                        </p>
                    </div>
                </div>
                <div className="icon-container">
                    <i onClick={() => handleReplaceWaitingList(data, dispatch, messageApi, "MUSIC")} className="fa-solid fa-triangle"></i>
                    <i ref={heartRef} onClick={handleLike} className={`fa-duotone fa-solid fa-heart ${likedMusic?.some(item => item._id === data._id) ? 'liked' : ''}`}></i>
                    {showDelete && <i onClick={handleDelete} className="fa-solid fa-trash"></i>}
                    <i onClick={(event) => handleOpenMenu(event, data)} className="fa-solid fa-ellipsis ml-2"></i>
                </div>
                {showMore && <i onClick={(event) => handleOpenMenu(event, data)} className="fa-solid fa-ellipsis ml-2 hover-none" style={{padding: "5px"}}></i>}
                {showLike && (
                    <div className='dflex-a-center hover-none' style={{padding: "5px"}}>
                        <div className='show-like'>
                            <i className={`fa-duotone fa-solid fa-heart ${isLiked ? 'liked' : ''}`}></i>
                            {formatNumber(quantityLike)}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
