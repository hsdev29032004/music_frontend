import { Skeleton } from "antd";

export default function SkeletonMusic() {
    return (
        <div>
            <div className="dflex-a-center p-2 mb-2" style={{ backgroundColor: "#292929", borderRadius: "5px" }}>
                <Skeleton.Avatar size={"large"} active style={{ backgroundColor: "#282828", borderRadius: "10px" }} />
                <div className="col-4">
                    <Skeleton style={{ margin: 0 }} active paragraph={{ rows: 2 }} />
                </div>
            </div>
        </div>
    )
}