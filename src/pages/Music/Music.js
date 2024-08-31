import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { getOneMusic } from "../../services/music";
import { createComment, getComment } from "../../services/comment";
import Detail from "../../components/Detail/Detail";
import { useSelector } from "react-redux";
import { message } from "antd";
import parseLyrics from "../../helpers/parseLyrics";
import io from "socket.io-client"
import NotFound from "../NotFound/NotFound.js";
import { Helmet } from "react-helmet-async";
const socket = io.connect("http://localhost:3001")

export default function Music({ title }) {
    const [music, setMusic] = useState(null)
    const inputRef = useRef(null)

    const [messageApi, contextHolder] = message.useMessage()
    const { slug } = useParams("slug")
    const user = useSelector(state => state.loginReducer).value

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.value = ""
        }
        if (slug !== "") {
            socket.emit("JOIN_ROOM", slug)
        }
        const fetchMusic = async () => {
            const result = await getOneMusic(slug)

            if (result.data) {
                result.data.lyrics = parseLyrics(result.data.lyrics);
                const comment = await getComment(result.data._id)
                result.data.comment = comment.data
            }
            setMusic(result.data)
        }

        fetchMusic()
        return () => {
            socket.emit('LEAVE_ROOM', slug);
        };
    }, [slug])

    const handleComment = async () => {
        if (user.level) {
            await createComment({
                content: inputRef.current?.value,
                music: music._id,
                room: slug
            })
        } else {
            messageApi.error("Bạn chưa đăng nhập")
        }
    }

    const handleEnter = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            handleComment()
        }
    }

    useEffect(() => {
        socket.on("SERVER_RETURN_COMMENT", (data) => {
            setMusic(prevMusic => ({
                ...prevMusic,
                comment: [data, ...prevMusic.comment]
            }));
            inputRef.current.value = ""
        })

        return () => {
            socket.off("SERVER_RETURN_COMMENT")
        };
    }, [])

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {contextHolder}
            {music ? (
                <>
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                            <Detail data={music} user={user} messageApi={messageApi} type="MUSIC" />
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-12 col-12 overflow-hidden">
                            <div>
                                <h4 style={{ fontSize: "21px", fontWeight: 700 }}>Mô tả</h4>
                                <p className="fw-700 text-717171">{music.description}</p>
                            </div>
                            <div className="mt-3" style={{ flex: 1 }}>
                                <h4 style={{ fontSize: "21px", fontWeight: 700 }}>Lời bài hát</h4>
                                <div className="fw-700 text-717171">{music.lyrics?.map((value, key) => (
                                    <p key={key}>{value.content}</p>
                                ))}</div>
                            </div>
                        </div>
                    </div>
                    <div className="comment-container mt-4">
                        <div>
                            <h4 style={{ fontSize: "21px", fontWeight: 700 }}>Bình luận</h4>
                            <div className="input-bora dflex-a-center mt-2">
                                <input onKeyUp={handleEnter} ref={inputRef} autoComplete="off" id="input-comment" style={{ backgroundColor: "inherit", border: "none", outline: "none", color: "white", width: "100%" }} />
                                <i onClick={handleComment} className="fa-solid fa-paper-plane-top cursor-pointer"></i>
                            </div>
                        </div>
                        <ul className="list-comment">
                            {music.comment?.length > 0 && music.comment.map((value, key) => (
                                <li
                                    key={key}
                                    className={`inner-comment ml-0 mb-3 d-flex"}`}
                                >
                                    <div className="col-12 d-flex">
                                        <div className="inner-image dflex-a-center mr-2">
                                            <img src={value.user?.avatar} alt="" />
                                        </div>
                                        <div className="comment">
                                            <h5>{value.user?.fullName}</h5>
                                            <p style={{ wordBreak: "break-word" }}>{value.content}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <NotFound />
            )}
        </>
    )
}