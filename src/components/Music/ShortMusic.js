import { Link } from 'react-router-dom';
import "./Music.css";
import { Fragment, useRef } from 'react';
import { likeMusic } from '../../services/favorite';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { openMusicInPlMenuContext } from '../../actions/menuContext';

export default function ShortMusic({ data, likedMusic, userId, active, onClick, musicKey }) {
    const dispatch = useDispatch()

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
        const result = await likeMusic(data.key, userId)
        if (result.msg === "Thích bài hát thành công.") {
            heartRef.current.classList.add("liked");
        } else if (result.msg === "Bỏ thích bài hát thành công.") {
            heartRef.current.classList.remove("liked");
        }
        messageApi[result.status](result.msg)
    }

    const handleOpenMenu = (event, musicKey) => {
        event.preventDefault();
        event.stopPropagation();

        const { clientX: left, clientY: top } = event;
         
        dispatch(openMusicInPlMenuContext({musicKey, menuPosition: {top, left}}))
    }
    
    return (
        <>
            {contextHolder}
            <div className={`music-playlist-item ${active ? "current-music" : ""}`}>
                <div className="inner-item">
                    <div className="inner-img-playlist">
                        <img src={data.avatar} alt="" />
                    </div>
                    <div className="ml-2">
                        <Link to={data.slug} className="ellipsis" onClick={handleClickLink}>
                            {data.premium ? <span className='tag-premium'>Premium</span> : null}
                            <h3 className='song-link'>{data.name}</h3>
                        </Link>
                        <p className="ellipsis">
                            {singerLinks}
                        </p>
                    </div>
                </div>
                <div className="icon-container">
                    <i onClick={onClick} className="fa-solid fa-triangle"></i>
                    <i ref={heartRef} onClick={handleLike} className={`fa-duotone fa-solid fa-heart ${likedMusic?.includes(data.key) ? 'liked' : ''}`}></i>
                    <i onClick={(event) => handleOpenMenu(event, musicKey)} className="fa-solid fa-ellipsis ml-2"></i>
                </div>
            </div>
        </>
    );
}
