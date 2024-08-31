import { Helmet } from "react-helmet-async"

export default function Config ({title}){
    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            Config
        </>
    )
}