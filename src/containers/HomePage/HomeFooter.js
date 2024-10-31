import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class HomeFooter extends Component {

    render() {

        return (
            <>
                <div className='home-footer'>
                    <div className='footer-content'>
                        <div className='col-4 content-info1'>
                            <div className='header-logo'></div>
                        </div>
                        <div className='col-2 content-info2'></div>
                        <div className='col-4 content-info3'>
                            <span>Đối tác bảo trợ nội dung</span>
                            <ul>
                                <li>
                                    <a href="https://hellodoctors.vn" ><span>Hello Doctor</span><span>Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"</span></a>
                                </li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div className='footer-copyright'>
                        <p>&copy; 2024 TakeCare. More information, &#128073;<a href='#'> Click here</a></p>
                    </div>
                </div >
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
