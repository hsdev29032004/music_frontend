import { DotChartOutlined } from "@ant-design/icons";
import SkeletonMusic from "./Music";
import { Skeleton } from "antd";

export default function SkeletonDetailAlbum() {
    return (
        <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                <div className="detail-container row" style={{ position: "sticky", top: 0, left: 0 }}>
                    <div className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-12 mb-3">
                        <div className="album-item">
                            <Skeleton.Node
                                active
                                style={{ width: "100%", backgroundColor: "#292929" }}
                            >
                                <DotChartOutlined className="d-none" />
                            </Skeleton.Node>
                        </div>
                    </div>
                    <div className="content col-xl-12 col-lg-12 col-md-8 col-sm-8 col-12">
                        <Skeleton style={{ textAlign: "center" }} active paragraph={{ rows: 2 }} />
                    </div>
                </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-12 col-12">
                <div className="music-container">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonMusic key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}