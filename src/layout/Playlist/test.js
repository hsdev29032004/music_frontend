useEffect(() => {
    const fetchPlaylist = async () => {
        const parsedPlaylist = JSON.parse(localStorage.getItem('queuePlaylist'));
        const savedId = localStorage.getItem('currentId');
        if (parsedPlaylist) {
            setPlaylist(parsedPlaylist);
            if (!savedId) {
                localStorage.setItem("currentId", parsedPlaylist[0]?.id);
                await loadMusicData(parsedPlaylist[0]?.slug);
            } else {
                const foundIndex = parsedPlaylist.findIndex(item => item.id === savedId);
                if (foundIndex !== -1) {
                    await loadMusicData(parsedPlaylist[foundIndex]?.slug);
                } else {
                    localStorage.setItem("currentId", parsedPlaylist[0]?.id);
                    await loadMusicData(parsedPlaylist[0]?.slug);
                }
            }
        }
    };
    fetchPlaylist();
}, [loadPll]);