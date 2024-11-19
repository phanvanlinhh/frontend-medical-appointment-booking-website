import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
import logo from "../../assets/logo-removebg.png";
import boCongThuong from "../../assets/imgFooter/bo-cong-thuong.svg";
import doctorCheck from "../../assets/imgFooter/doctor-check.png";
import helloDoctorLogo from "../../assets/imgFooter/hellodoctorlogo.png";
import logoBernard from "../../assets/imgFooter/logo-bernard.png";

class HomeFooter extends Component {

    render() {

        return (
            <>
                <div className="footer">
                    <div className="footer-container">
                        {/* Thông tin công ty */}
                        <div className="company-info">
                            <img src={logo} alt="TakeCare" />
                            <p className='mt-2'>
                                📍 Thành phố Đà Nẵng, Việt Nam
                            </p>
                            <p>📞 0999 999 999 (7h30 - 18h)</p>
                            <p>📧 support@takecare.vn (7h30 - 18h)</p>
                            <div className="certificates">
                                <img src={boCongThuong} alt="Đã đăng ký 1" />
                                <img src={boCongThuong} alt="Đã đăng ký 2" />
                            </div>
                        </div>

                        {/* Liên kết */}
                        <div className="links">
                            <h3 className='mt-3'>TakeCare</h3>
                            <ul>
                                <li>Liên hệ hợp tác</li>
                                <li>Chuyển đổi số</li>
                                <li>Chính sách bảo mật</li>
                                <li>Quy chế hoạt động</li>
                                <li>Tuyển dụng</li>
                                <li>Điều khoản sử dụng</li>
                                <li>Câu hỏi thường gặp</li>
                                <li>Sức khỏe doanh nghiệp</li>
                            </ul>
                        </div>

                        {/* Đối tác */}
                        <div className="partners">
                            <h3 className='mt-3'>Đối tác bảo trợ nội dung</h3>
                            <ul>
                                <li>
                                    <img src={helloDoctorLogo} alt="Hello Doctor" width='70' height='auto' />
                                    <div style={{ marginLeft: '10px' }}>
                                        <div><strong>Hello Doctor</strong></div>
                                        <span>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</span>
                                    </div>
                                </li>
                                <li>
                                    <img src={logoBernard} alt="Bernard" width='70' height='auto' />
                                    <div style={{ marginLeft: '10px' }}>
                                        <div><strong>Hệ thống y khoa chuyên sâu quốc tế Bernard</strong></div>
                                        <span>Bảo trợ chuyên mục nội dung "y khoa chuyên sâu"</span>
                                    </div>
                                </li>
                                <li>
                                    <img src={doctorCheck} alt="Doctor Check" width='70' height='auto' />
                                    <div style={{ marginLeft: '10px' }}>
                                        <div><strong>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn</strong></div>
                                        <span>Bảo trợ chuyên mục nội dung "sức khỏe tổng quát"</span>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='footer-copyright'>
                        <p>&copy; 2024 TakeCare. More information, &#128073;<a href='#'> Click here</a></p>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
