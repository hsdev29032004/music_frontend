import { useEffect, useState } from "react"
import { getInfo } from "../../services/system"

export default function Dashboard ({title}){
    const [info, setInfo] = useState({})

    useEffect(() => {
        document.title = title
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchInfo = async () => {
            const result = await getInfo()
            setInfo(result.data)
        }

        fetchInfo()
    }, [])

    console.log(info);

    return(
        <>
            Dashboard
        </>
    )
}