import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import { getAllHandbook } from '../../../services/userService'
import { withRouter } from 'react-router';
import './Handbook.scss'

class Handbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: []
        }
    }
    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }
    }
    handleViewDetailHandbook = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}`)
        }
    }
    render() {
        let { dataHandbook } = this.state
        return (
            <>
                <div className='section-share section-handbook my-4'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id={"homepage.handbook"} /></span>
                            <button className='btn-section'><FormattedMessage id={"homepage.see-more"} /></button>
                        </div>
                        <div className='section-body'>
                            <Carousel responsive={this.props.responsive}>
                                {dataHandbook && dataHandbook.length > 0 &&
                                    dataHandbook.map((item, index) => {
                                        return (
                                            <div className='section-customize handbook-child' key={index}
                                                onClick={() => this.handleViewDetailHandbook(item)}
                                            >
                                                <div className='section-customize-border section-customize-border-handbook'>
                                                    <div className='img-section img-handbook'
                                                        style={{ backgroundImage: `url(${item.image})` }}></div>
                                                    <div className='title-section handbook-name'>{item.name}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
