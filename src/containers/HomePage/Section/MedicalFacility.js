import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class MedicalFacility extends Component {

    render() {

        return (
            <>
                <div className='section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id={"homepage.medical-facility"} /></span>
                            <button className='btn-section'><FormattedMessage id={"homepage.see-more"} /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-medical-facility'></div>
                                        <div className='title-section'>Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-medical-facility'></div>
                                        <div className='title-section'>Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-medical-facility'></div>
                                        <div className='title-section'>Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-medical-facility'></div>
                                        <div className='title-section'>Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-medical-facility'></div>
                                        <div className='title-section'>Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='section-customize-border'>
                                        <div className='img-section img-medical-facility'></div>
                                        <div className='title-section'>Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className='between-distance-doctor'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
