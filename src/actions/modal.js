export const openModalCreatePlaylist = () => ({
    type: "OPEN_MODAL_CREATE_PLAYLIST",
})

export const closeModalCreatePlaylist = () => ({
    type: "CLOSE_MODAL_CREATE_PLAYLIST",
})

export const openModalEditPlaylist = () => ({
    type: "OPEN_MODAL_EDIT_PLAYLIST",
})

export const closeModalEditPlaylist = () => ({
    type: "CLOSE_MODAL_EDIT_PLAYLIST",
})

export const openModalEditAlbum = () => ({
    type: "OPEN_MODAL_EDIT_ALBUM",
})

export const closeModalEditAlbum = () => ({
    type: "CLOSE_MODAL_EDIT_ALBUM",
})

export const openModalEditMusic = () => ({
    type: "OPEN_MODAL_EDIT_MUSIC",
})

export const closeModalEditMusic = () => ({
    type: "CLOSE_MODAL_EDIT_MUSIC",
})

export const openModalCreateMusic = (singer) => ({
    type: "OPEN_MODAL_CREATE_MUSIC",
    payload: singer
})

export const closeModalCreateMusic = () => ({
    type: "CLOSE_MODAL_CREATE_MUSIC",
    playload: null
})

export const openModalCreateAlbum = (singer) => ({
    type: "OPEN_MODAL_CREATE_ALBUM",
    payload: singer
})

export const closeModalCreateAlbum = () => ({
    type: "CLOSE_MODAL_CREATE_ALBUM",
    playload: null
})