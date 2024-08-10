import { useEffect } from "react"

export default function Discover({title}){
    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])
    return(
        <>
            Discover
        </>
    )
}