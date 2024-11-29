import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import { withRouter } from 'react-router';

class OutstandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors()
    }
    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors
        let { language } = this.props
        return (
            <>
                <div className='section-share section-outstanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id={"homepage.outstanding-doctor"} /></span>
                            <button className='btn-section'><FormattedMessage id={"homepage.see-more"} /></button>
                        </div>
                        <div className='section-body'>
                            <Carousel responsive={this.props.responsive}>

                                {arrDoctors && arrDoctors.length > 0
                                    && arrDoctors.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                        return (
                                            <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                                <div className='section-customize-border section-customize-border-doctors'>
                                                    <div className='outer-bg'>
                                                        <div className='img-section img-oustanding-doctor'
                                                            style={{ backgroundImage: `url(${imageBase64})` }}>
                                                        </div>
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div className='title-section'>
                                                            {language === LANGUAGES.VI ? nameVi : nameEn}
                                                        </div>
                                                        {/* <div>specialty</div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div >
                </div >
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
