import { useEffect } from "react"

export default function Library({title}){
    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])
    return(
        <>
            Library
        </>
    )
}