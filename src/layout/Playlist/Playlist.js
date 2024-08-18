import React, { useState, useEffect, useRef } from 'react';
import ShortMusic from '../../components/Music/ShortMusic';
import { useSelector } from 'react-redux';
import { getOneMusic } from '../../services/music';
import './Playlist.css';
import parseLyrics from '../../helpers/parseLyrics';
import MusicInPlContextMenu from '../../components/ContextMenu/MusicInPl';

export default function Playlist() {
    const [playlist, setPlaylist] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusic, setCurrentMusic] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [loop, setLoop] = useState(false)
    const [volume, setVolume] = useState(0.1);
    const [collapse, setCollapse] = useState(window.matchMedia('(max-width: 1350px)').matches);

    const containerRef = useRef(null);
    const audioRef = useRef(null);
    const lyricsRef = useRef([]);

    const user = useSelector(state => state.loginReducer.value);
    const loadPll = useSelector(state => state.loadPlReducer);
    const value = useSelector(state => state.musicInPlContextMenuReducer)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;            
        }
        // eslint-disable-next-line
    }, [volume, audioRef.current])

    useEffect(() => {
        window.addEventListener('resize', () => {
            const smallScreen = window.matchMedia('(max-width: 1350px)');
            setCollapse(smallScreen.matches);
        });

        return () => {
            window.removeEventListener('resize', () => {
                const smallScreen = window.matchMedia('(max-width: 1350px)');
                setCollapse(smallScreen.matches);
            });
        };
    }, [collapse])

    useEffect(() => {        
        const fetchPlaylist = async () => {
            const parsedPlaylist = JSON.parse(localStorage.getItem('queuePlaylist'));
            const savedId = localStorage.getItem('currentId');  
            if (parsedPlaylist && parsedPlaylist.length > 0) {
                setPlaylist(parsedPlaylist);

                if (!savedId) {                    
                    localStorage.setItem("currentId", parsedPlaylist[0].id)
                    await loadMusicData(parsedPlaylist[0].slug);
                } else if (savedId && !isPlaying) {
                    const foundIndex = parsedPlaylist.findIndex(item => item.id === savedId);
                    if(foundIndex !== -1){                        
                        await loadMusicData(parsedPlaylist[foundIndex]?.slug);
                    }else{                        
                        localStorage.setItem("currentId", parsedPlaylist[0]?.id)
                        await loadMusicData(parsedPlaylist[0]?.slug);
                    }
                }
            }else{
                setPlaylist([])
            }
        };
        fetchPlaylist();
        // eslint-disable-next-line
    }, [loadPll]);

    const loadMusicData = async (slug) => {
        try {
            const result = await getOneMusic(slug);
            if (result.status === 'success') {
                const lyrics = parseLyrics(result.data.lyrics);
                setCurrentMusic({ ...result.data, lyrics });
                if (audioRef.current) {
                    audioRef.current.src = result.data.urlMp3;
                    audioRef.current.autoplay = true;
                    await new Promise(resolve => setTimeout(resolve, 100));
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            }
        } catch (error) {
            // console.error('Error loading or playing music:', error);
        }
    };

    useEffect(() => {
        if (currentMusic) {
            const lyricsDiv = document.querySelector('.lyrics');
            if (lyricsDiv) {
                lyricsDiv.scrollTop = 0;
            }
        }
    }, [currentMusic]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, currentMusic]);

    const handlePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const handleTimeUpdate = (e) => {
        const currentTime = e.target.currentTime;
        setCurrentTime(currentTime);

        if (currentMusic && currentMusic.lyrics) {
            let activeLineIndex = -1;
            for (let i = 0; i < currentMusic.lyrics.length; i++) {
                const line = currentMusic.lyrics[i];
                if (currentTime >= line.startTime / 1000 && currentTime < line.endTime / 1000) {
                    activeLineIndex = i;
                    break;
                }
            }

            lyricsRef.current.forEach((lineRef, index) => {
                if (lineRef) {
                    if (index === activeLineIndex) {
                        lineRef.classList.add('active');
                        lineRef.classList.remove('over');
                        lineRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else if (index < activeLineIndex) {
                        lineRef.classList.add('over');
                        lineRef.classList.remove('active');
                    } else {
                        lineRef.classList.remove('over');
                        lineRef.classList.remove('active');
                    }
                }
            });
        }
    };

    const handleEnded = () => {
        handleNext();
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleNext = async () => {
        const savedPlaylist = localStorage.getItem('queuePlaylist');
        const savedId = localStorage.getItem('currentId');

        if (savedPlaylist && savedId) {
            const parsedPlaylist = JSON.parse(savedPlaylist);
            const currentIndex = parsedPlaylist.findIndex(item => item.id === savedId);
            const nextIndex = (currentIndex + 1) % parsedPlaylist.length;

            localStorage.setItem('currentId', parsedPlaylist[nextIndex]?.id);
            await loadMusicData(parsedPlaylist[nextIndex]?.slug);
            setIsPlaying(true);
        }
    };

    const handlePrevious = async () => {
        const savedPlaylist = localStorage.getItem('queuePlaylist');
        const savedId = localStorage.getItem('currentId');

        if (savedPlaylist && savedId) {
            const parsedPlaylist = JSON.parse(savedPlaylist);
            const currentIndex = parsedPlaylist.findIndex(item => item.id === savedId);
            const prevIndex = (currentIndex - 1 + parsedPlaylist.length) % parsedPlaylist.length;

            localStorage.setItem('currentId', parsedPlaylist[prevIndex].id)
            await loadMusicData(parsedPlaylist[prevIndex].slug);
            setIsPlaying(true);
        }
    };

    const handleSelectMusic = async (e, index) => {
        e.stopPropagation();
        const savedPlaylist = localStorage.getItem('queuePlaylist');
        if (savedPlaylist) {
            const parsedPlaylist = JSON.parse(savedPlaylist);
            const selectedMusic = parsedPlaylist[index];
            localStorage.setItem('currentId', selectedMusic.id);
            setCurrentMusic(selectedMusic);
            await loadMusicData(selectedMusic.slug);
            setIsPlaying(true);
        }
    };

    const handleDragStart = (index) => {
        setDraggingIndex(index);
    };

    const handleDragEnter = (index) => {
        if (draggingIndex !== index) {
            const updatedPlaylist = Array.from(playlist);
            const [movedItem] = updatedPlaylist.splice(draggingIndex, 1);
            updatedPlaylist.splice(index, 0, movedItem);
            setPlaylist(updatedPlaylist);
            setDraggingIndex(index);
        }
    };

    const handleDragEnd = () => {
        setDraggingIndex(null);
        localStorage.setItem('queuePlaylist', JSON.stringify(playlist));
    };

    return (
        <>
            <MusicInPlContextMenu
                menuPosition={value.data?.menuPosition}
                musicKey={value.data?.musicKey}
                onNext={handleNext}
            />
            <div id="playlist" className={collapse ? 'hidden' : ''}>
                {playlist.length === 0 ? (
                    <p className='text-center'>Chưa có danh sách phát</p>
                ) : (
                    <>
                        <div ref={containerRef} className="playlist-container" style={{ maxHeight: "40%", height: "40%", overflowY: "auto", padding: 0 }}>
                            <ul style={{ padding: 0 }}>
                                {playlist.map((item, index) => (
                                    <li
                                        key={index}
                                        draggable
                                        onDragStart={() => handleDragStart(index)}
                                        onDragEnter={() => handleDragEnter(index)}
                                        onDragEnd={handleDragEnd}
                                        className={`playlist-item ${draggingIndex === index ? 'dragging' : ''}`}
                                    >
                                        <ShortMusic
                                            musicKey={item.id}
                                            onClick={(e) => handleSelectMusic(e, index)}
                                            active={item.id === localStorage.getItem("currentId") || ""}
                                            data={item}
                                            likedMusic={user?.likedMusic}
                                            userId={user?._id}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='lyrics text-center' style={{ height: "30%", width: "100%", padding: "10px 20px", overflowY: 'hidden', marginTop: "20px" }}>
                            {currentMusic?.lyrics?.length > 0 && currentMusic.lyrics.map((line, index) => (
                                <p key={index} ref={el => lyricsRef.current[index] = el}>
                                    {line.content}
                                </p>
                            ))}
                        </div>
                        <div style={{ position: 'absolute', bottom: "10px", textAlign: "center", width: "100%" }}>
                            <p>{currentMusic?.name}</p>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
                                <span style={{ paddingRight: "5px" }}>{formatTime(currentTime)}</span>
                                <input
                                    className='inp-duration'
                                    type="range"
                                    min="0"
                                    max={duration}
                                    value={currentTime}
                                    onChange={(e) => {
                                        const newTime = e.target.value;
                                        setCurrentTime(newTime);
                                        audioRef.current.currentTime = newTime;
                                    }}
                                />
                                <span style={{ paddingLeft: "5px" }}>{formatTime(duration)}</span>
                            </div>
                            <div className='controls'>
                                <div className='volume-container'>
                                    <i className="fa-solid fa-volume" style={{ position: 'relative' }}></i>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        className='volume-slider'
                                        onChange={(e) => setVolume(e.target.value)}
                                    />
                                </div>
                                <i onClick={handlePrevious} className="fa-solid fa-backward"></i>
                                <i className={`fa-solid fa-${isPlaying ? 'pause' : 'play'}`} onClick={handlePlayPause}></i>
                                <i onClick={handleNext} className="fa-solid fa-forward"></i>
                                <i className="fa-solid fa-arrow-rotate-left" style={{ color: loop ? "#8b45ca" : "" }} onClick={() => setLoop(!loop)}></i>
                            </div>
                        </div>
                        <audio
                            ref={audioRef}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={handleEnded}
                            loop={loop}
                            volume={volume}
                        />
                    </>
                )}
                <div style={{ right: collapse ? "20px" : "320px", backgroundColor: collapse ? "#414141" : "#8b45ca" }} className='btn-collapse-playlist' onClick={() => setCollapse(!collapse)}>
                    <i className="fa-regular fa-list-music"></i>
                </div>
            </div>
        </>
    );
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}