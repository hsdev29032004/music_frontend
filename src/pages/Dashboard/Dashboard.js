import { useEffect } from "react"

export default function Dashboard ({title}){
    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])
    return(
        <>
            Dashboard
        </>
    )
}