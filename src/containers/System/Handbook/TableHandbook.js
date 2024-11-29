import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getManageHandbook, deleteHandbook } from '../../../services/userService';
import './TableHandbook.scss';

class TableHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handbooks: [],
            error: null,
            currentPage: 1,
            handbooksPerPage: 10, // Mỗi trang hiển thị 10 cẩm nang
        };
    }

    fetchHandbooks = async () => {
        try {
            let res = await getManageHandbook();
            if (res && res.errCode === 0) {
                this.setState({
                    handbooks: res.data,
                });
            } else {
                this.setState({
                    error: res.errMessage || 'Không tìm thấy danh sách cẩm nang.',
                });
            }
        } catch (error) {
            console.error('Error fetching handbooks:', error);
            this.setState({
                error: 'Có lỗi xảy ra khi tải dữ liệu.',
            });
        }
    };

    async componentDidMount() {
        await this.fetchHandbooks();
    }

    handleDeleteHandbook = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa cẩm nang này?')) return;

        try {
            let res = await deleteHandbook(id);
            if (res && res.errCode === 0) {
                toast.success('Xóa cẩm nang thành công!');
                await this.fetchHandbooks();
            } else {
                toast.error(res.errMessage || 'Xóa cẩm nang thất bại.');
            }
        } catch (error) {
            console.error('Error deleting handbook:', error);
            toast.error('Có lỗi xảy ra khi xóa cẩm nang.');
        }
    }

    // Phân trang
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    handleNextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.handbooks.length / this.state.handbooksPerPage)) {
            this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
        }
    }

    handlePrevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
        }
    }

    render() {
        let { handbooks, error, currentPage, handbooksPerPage } = this.state;

        // Tính toán các cẩm nang cần hiển thị cho trang hiện tại
        const indexOfLastHandbook = currentPage * handbooksPerPage;
        const indexOfFirstHandbook = indexOfLastHandbook - handbooksPerPage;
        const currentHandbooks = handbooks.slice(indexOfFirstHandbook, indexOfLastHandbook);

        // Tính toán tổng số trang
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(handbooks.length / handbooksPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <table id="TableHandbook">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentHandbooks.length > 0 ? (
                            currentHandbooks.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => this.props.handleEditHandbook(item)}
                                        >
                                            <i className="fas fa-user-edit"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => this.handleDeleteHandbook(item.id)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">{error || 'Không có dữ liệu'}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={this.handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        &#60; Prev
                    </button>
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => this.handlePageChange(number)}
                            className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        className="pagination-btn"
                        onClick={this.handleNextPage}
                        disabled={currentPage === pageNumbers.length}
                    >
                        Next &#62;
                    </button>
                </div>
            </div>
        );
    }
}

export default TableHandbook;
