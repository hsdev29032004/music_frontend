export const openPlaylistMenuContext = (obj) => ({
    type: "OPEN_PLAYLIST_MENUCONTEXT",
    payload: obj
});

export const closePlaylistMenuContext = () => ({
    type: "CLOSE_PLAYLIST_MENUCONTEXT",
    payload: null
});

export const openMusicInPlMenuContext = (obj) => ({
    type: "OPEN_MUSICINPL_MENUCONTEXT",
    payload: obj
})

export const closeMusicInPlMenuContext = () => ({
    type: "CLOSE_MUSICINPL_MENUCONTEXT",
    payload: null
});

export const openAlbumMenuContext = (obj) => ({
    type: "OPEN_ALBUM_MENUCONTEXT",
    payload: obj
})

export const closeAlbumMenuContext = () => ({
    type: "CLOSE_ALBUM_MENUCONTEXT",
    payload: null
})