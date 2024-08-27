import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getOneMusic } from "../../services/music";

export default function Singer({title}){
    const [music, setMusic] = useState({})
    const {slug} = useParams("slug")

    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchMusic = async () => {
            const result = await getOneMusic(slug)
            setMusic(result.data)
        }

        fetchMusic()
        // eslint-disable-next-line
    }, [])

    console.log(music);

    return(
        <>
            Music
        </>
    )
}