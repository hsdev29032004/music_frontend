export const openPlaylistMenuContext = () => ({
    type: "OPEN_PLAYLIST_MENUCONTEXT",
});

export const closePlaylistMenuContext = () => ({
    type: "CLOSE_PLAYLIST_MENUCONTEXT",
});

export const openMusicInPlMenuContext = (obj) => ({
    type: "OPEN_MUSICINPL_MENUCONTEXT",
    payload: obj
})

export const closeMusicInPlMenuContext = () => ({
    type: "CLOSE_MUSICINPL_MENUCONTEXT",
    payload: null
});