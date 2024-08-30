import { useState } from "react";
import { Link } from "react-router-dom";
import "./Comment.css"
import { allowComment, refuseComment } from "../../services/comment";
import { Empty } from "antd";

export default function CommentTable({comment, messageApi}) {
    const [allowedComments, setAllowedComments] = useState([]);

    const handleAllow = async (value) => {
        const result = await allowComment(value._id);
        if(result.status === "success"){
            setAllowedComments([...allowedComments, value._id])
            messageApi.success(result.msg)
        } else {
            messageApi.error(result.msg)
        }
    }

    const handleRefuse = async (value) => {
        const result = await refuseComment(value._id);
        if(result.status === "success"){
            setAllowedComments([...allowedComments, value._id])
            messageApi.success(result.msg)
        } else {
            messageApi.error(result.msg)
        }
    }

    return (
        <>
            {comment.length > 0 ? (
                <>
                    <div className="inner-comment d-flex mt-3" style={{ flexWrap: "nowrap" }}>
                        <div className="col-8 dflex-a-center">
                            Bình luận
                        </div>
                        <div className="col-5 dflex-aj-center">
                            Bài hát
                        </div>
                        <div className="col-6 d-flex" style={{ justifyContent: "flex-end" }}>
                            Hành động
                        </div>
                    </div>
                    {comment.map((value, key) => (
                        <div
                            key={key}
                            className={`inner-comment mt-3 ${allowedComments.includes(value._id) ? "d-none" : "d-flex"}`}
                        >
                            <div className="col-8 d-flex">
                                <div className="inner-image dflex-a-center mr-2">
                                    <img src={value.user?.avatar} alt="" />
                                </div>
                                <div className="comment">
                                    <h5>{value.user?.fullName}</h5>
                                    <p>{value.content}</p>
                                </div>
                            </div>
                            <div className="col-5 text-center">
                                <Link className="singer-link" style={{ fontSize: "15px" }} to={`/music/${value.music?.slug}`}>
                                    {value.music?.name}
                                </Link>
                            </div>
                            <div className="col-6 d-flex" style={{ justifyContent: "flex-end" }}>
                                <i onClick={() => handleRefuse(value)} className="fa-solid fa-trash mr-2 btn-danger action-icon"></i>
                                <i onClick={() => handleAllow(value)} className="fa-solid fa-check btn-success action-icon"></i>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <Empty className="mt-4" description="Không có bình luận nào"/>
            )}
        </>
    );
}
