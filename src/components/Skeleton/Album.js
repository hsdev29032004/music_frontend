import { DotChartOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

export default function SkeletonAlbum() {
    return (
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="album-item">
                <Skeleton.Node
                    active
                    style={{ width: "100%", backgroundColor: "#292929" }}
                >
                    <DotChartOutlined className="d-none" />
                </Skeleton.Node>
            </div>
            <Skeleton active paragraph={{ rows: 2 }} />
        </div>
    )
}