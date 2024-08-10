import { useEffect } from "react"

export default function Config ({title}){
    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])
    return(
        <>
            Config
        </>
    )
}