import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            currentPage: 1,
            usersPerPage: 10
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    };

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    };

    // Tính toán chỉ số đầu và cuối của dữ liệu trong mỗi trang
    paginate = (users, currentPage, usersPerPage) => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        return users.slice(indexOfFirstUser, indexOfLastUser);
    };

    // Chuyển đến trang tiếp theo
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    render() {
        const { usersRedux, currentPage, usersPerPage } = this.state;
        const currentUsers = this.paginate(usersRedux, currentPage, usersPerPage);

        const totalPages = Math.ceil(usersRedux.length / usersPerPage);

        return (
            <>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            {/* <th>PhoneNumber</th> */}
                            <th>Actions</th>
                        </tr>
                        {currentUsers && currentUsers.length > 0 &&
                            currentUsers.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    {/* <td>{item.phoneNumber}</td> */}
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)}>
                                            <i className="fas fa-user-edit"></i>
                                        </button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => this.handlePageChange(currentPage - 1)}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => this.handlePageChange(pageNumber + 1)}
                            className={currentPage === pageNumber + 1 ? 'active' : ''}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => this.handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    listUsers: state.admin.users
});

const mapDispatchToProps = dispatch => ({
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
