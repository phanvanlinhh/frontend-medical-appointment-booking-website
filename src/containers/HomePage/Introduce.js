import React, { Component } from "react";
import './Introduce.scss'
import imgIntro from '../../assets/images/introduce.webp'
import contact from '../../assets/images/contact-us-banner.jpg'

class Introduce extends Component {
    render() {
        return (
            <div className="introduction">
                <div className="intro-container">
                    <div className="intro-text">
                        <h1>Giới thiệu về TakeCare</h1>
                        <p>
                            Ứng dụng này giúp người bệnh và thân nhân người bệnh có thể thực
                            hiện trực tuyến quá trình đăng ký khám bệnh tại bệnh viện ở mọi
                            lúc mọi nơi mà không cần phải đến trực tiếp bệnh viện.
                        </p>
                        <div className="features">
                            <div className="feature">
                                <span>1</span>
                                <p><strong>Đăng ký và chọn ngày,</strong> giờ khám bệnh</p>
                            </div>
                            <div className="feature">
                                <span>2</span>
                                <p>
                                    <strong>Thanh toán chi phí</strong> không dùng tiền mặt
                                </p>
                            </div>
                            <div className="feature">
                                <span>3</span>
                                <p>
                                    <strong>Quản lý cuộc hẹn</strong> khám bệnh và tái khám
                                </p>
                            </div>
                            <div className="feature">
                                <span>4</span>
                                <p><strong>Quản lý thông tin,</strong> dữ liệu của người bệnh</p>
                            </div>
                        </div>
                    </div>
                    <div className="intro-image">
                        <img
                            src={imgIntro}
                            alt="Introduce TakeCare"
                        />
                    </div>
                </div>
                <div className="contact mt-5">
                    <div className="background" style={{
                        backgroundImage: `url(${contact})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "250px",
                        width: "100%"
                    }} >
                        <div className="social-media">
                            <div className="zalo">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=I'm%20Phan%20Văn%20Linh%F0%9F%98%89%0A" alt="qr code" />
                                <span>Zalo</span>
                            </div>
                            <div className="facebook">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=Không%20có%20Zalo%20và%20Facebook%F0%9F%98%84" alt="qr code" />
                                <span>Facebook</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Introduce;
