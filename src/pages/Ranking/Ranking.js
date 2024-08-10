import { useEffect } from "react"

export default function Ranking({title}){
    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])
    return(
        <>
            Ranking
        </>
    )
}