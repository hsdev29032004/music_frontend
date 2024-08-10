import { Col, Row } from "antd"

export default function Header(){
    return(
        <>
            <div id="header">
                <Row className="inner-header">
                    <Col xxl={9} xl={9} lg={9} md={9} sm={9} xs={9}>
                        <input className="input-bora" placeholder="Tìm kiếm bài hát, ca sĩ, lời bài hát, ..."/>
                    </Col>
                    <Col  xxl={15} xl={15} lg={15} md={15} sm={15} xs={15} style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                        <p>Nâng cấp</p>
                        <p>Readme</p>
                        <p>Avatar</p>
                    </Col>
                </Row>
            </div>
        </>
    )
}