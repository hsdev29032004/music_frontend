import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getOneAlbum } from "../../services/album";

export default function Album({title}){
    const [album, setAlbum] = useState({})
    const {slug} = useParams("slug")

    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchAlbum = async () => {
            const result = await getOneAlbum(slug)
            setAlbum(result.data)
        }

        fetchAlbum()
        // eslint-disable-next-line
    }, [])

    console.log(album);

    return(
        <>
            Album
        </>
    )
}