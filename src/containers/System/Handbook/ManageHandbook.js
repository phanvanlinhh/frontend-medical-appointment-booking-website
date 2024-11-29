import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import './ManageHandbook.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { createHandbook, updateHandbook } from '../../../services/userService'
import TableHandbook from './TableHandbook';

const mdParser = new MarkdownIt();

class ManageHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewHandbook = async () => {
        let res = await createHandbook(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new handbook succeed!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        }
        else {
            toast.error('Something wrong...')
        }
    }
    handleEditHandbook = (handbook) => {
        this.setState({
            id: handbook.id,
            name: handbook.name,
            imageBase64: handbook.image,
            descriptionHTML: handbook.descriptionHTML,
            descriptionMarkdown: handbook.descriptionMarkdown,
        });
    }
    handleSaveHandbook = async () => {
        let { id, name, imageBase64, descriptionHTML, descriptionMarkdown } = this.state;
        if (!name || !descriptionHTML || !descriptionMarkdown) {
            toast.error('All fields are required except the image!');
            return;
        }
        if (!imageBase64 && !id) {
            toast.error('Image is required for new handbook!');
            return;
        }
        let data = {
            id,
            name,
            imageBase64,
            descriptionHTML,
            descriptionMarkdown,
        };
        let res = id ? await updateHandbook(data) : await createHandbook(data);

        if (res && res.errCode === 0) {
            toast.success(id ? 'Update handbook succeed!' : 'Add new handbook succeed!');
            this.setState({
                id: null,
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });

            if (this.props.fetchHandbooks) {
                this.props.fetchHandbooks();
            }
        } else {
            toast.error(res.errMessage || 'Something went wrong...');
        }
    }

    render() {
        return (
            <div className='manage-handbook-container'>
                <div className='title'>
                    <FormattedMessage id='admin.manage-handbook.title' />
                </div>
                <div className='add-new-handbook row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='admin.manage-handbook.name-handbook' /></label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='admin.manage-handbook.image-handbook' /></label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                        {this.state.imageBase64 && (
                            <img
                                src={this.state.imageBase64}
                                alt="Handbook"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '450px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12 mt-3'>
                        <button
                            className='btn btn-primary'
                            onClick={this.handleSaveHandbook}
                        >
                            {this.state.id ? 'Update' : 'Save'}
                        </button>
                    </div>
                    <div className='col-12 mt-3 mb-3'>
                        <TableHandbook
                            handleEditHandbook={this.handleEditHandbook}
                            fetchHandbooks={this.fetchHandbooks}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
