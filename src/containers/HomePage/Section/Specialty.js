import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class Specialty extends Component {

    render() {
        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id={"homepage.specialty"} /></span>
                            <button className='btn-section'><FormattedMessage id={"homepage.see-more"} /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-specialty'></div>
                                        <div className='title-section'>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-specialty'></div>
                                        <div className='title-section'>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-specialty'></div>
                                        <div className='title-section'>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-specialty'></div>
                                        <div className='title-section'>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-specialty'></div>
                                        <div className='title-section'>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    {/* <img className='img-section' src={specialtyImg} /> */}
                                    <div className='section-customize-border'>
                                        <div className='img-section img-specialty'></div>
                                        <div className='title-section'>Cơ xương khớp</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
