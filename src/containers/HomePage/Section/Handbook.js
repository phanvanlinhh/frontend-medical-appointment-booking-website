import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class Handbook extends Component {

    render() {
        return (
            <>
                <div className='section-share section-handbook'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id={"homepage.handbook"} /></span>
                            <button className='btn-section'><FormattedMessage id={"homepage.see-more"} /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-handbook'></div>
                                        <div className='title-section'>3 Bệnh viện, phòng khám nhi uy tín tại quận 10</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-handbook'></div>
                                        <div className='title-section'>3 Bệnh viện, phòng khám nhi uy tín tại quận 10</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-handbook'></div>
                                        <div className='title-section'>3 Bệnh viện, phòng khám nhi uy tín tại quận 10</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-handbook'></div>
                                        <div className='title-section'>3 Bệnh viện, phòng khám nhi uy tín tại quận 10</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-handbook'></div>
                                        <div className='title-section'>3 Bệnh viện, phòng khám nhi uy tín tại quận 10</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-handbook'></div>
                                        <div className='title-section'>3 Bệnh viện, phòng khám nhi uy tín tại quận 10</div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
