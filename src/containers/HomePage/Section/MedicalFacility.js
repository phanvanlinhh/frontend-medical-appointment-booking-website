import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService'
import { withRouter } from 'react-router'
import Carousel from 'react-multi-carousel';
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 }, items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 }, items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 550 }, items: 2
    },
    mobile: {
        breakpoint: { max: 500, min: 0 }, items: 1
    }
};

class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinics: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let { dataClinics } = this.state
        console.log('check prop', this.props)
        return (
            <>
                <div className='section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id={"homepage.medical-facility"} /></span>
                            <button className='btn-section'><FormattedMessage id={"homepage.see-more"} /></button>
                        </div>
                        <div className='section-body'>

                            <Carousel responsive={responsive}>
                                {
                                    dataClinics && dataClinics.length > 0 &&
                                    dataClinics.map((item, index) => {
                                        return (
                                            <div className='section-customize clinic-child' key={index}
                                                onClick={() => this.handleViewDetailClinic(item)}
                                            >
                                                <div className='section-customize-border section-customize-border-clinic'>
                                                    <div className='img-section img-medical-facility'
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    >
                                                    </div>
                                                    <div className='title-section clinic-name'>{item.name}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
