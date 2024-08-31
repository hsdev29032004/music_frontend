import { useEffect, useState } from "react"
import { getMusicRank } from "../../services/music"
import Music from "../../components/Music/Music"
import { useSelector } from "react-redux"
import { Helmet } from "react-helmet-async"

export default function Ranking({title}){
    const [music, setMusic] = useState([])

    const user = useSelector(state => state.loginReducer).value

    useEffect(() => {
        const fetchMusic = async () => {
            const result = await getMusicRank()            
            setMusic(result.data)
        }
        fetchMusic()
    }, [])
    
    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="music-container">
                <h4 className="mb-2 pl-3">Bảng xếp hạng</h4>
                <div className="d-flex" style={{flexWrap: "wrap"}}>
                    {music && music.length > 0 && music.map((value, key) => (
                        <div className="col-12" key={key}>
                            <Music
                                data={value}
                                likedMusic={user?.likedMusic}
                                userId={user?._id}
                                showLike
                            />
                            <div className="ml-2 mr-2" style={{borderBottom: "1px solid #292929"}}></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}