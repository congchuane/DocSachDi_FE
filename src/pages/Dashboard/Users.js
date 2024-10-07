import React, { useState } from 'react';
import './Dashboard.css';
import { useAuth } from '../../contexts/AuthContext';
import image from '../../images/image.png';
import { useBooks } from '../../contexts/BookContext';
import BookCard from '../../components/BookCard';
import { TeamOutlined, CarryOutOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Modal,
    Form,
    Input,
    Switch,
    Upload,
    TreeSelect,
} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

const genreSelect = [
    {
        value: 'Fiction',
        title: 'Fiction',
        icon: <CarryOutOutlined />,
        children: [
            {
                value: 'Literary',
                title: 'Literary',
                icon: <CarryOutOutlined />,
            },
            {
                value: 'Historical Fiction',
                title: 'Historical Fiction',
                icon: <CarryOutOutlined />,
            },
            {
                value: 'Fantasy',
                title: 'Fantasy',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        value: 'Epic Fantasy',
                        title: 'Epic Fantasy',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        value: 'Urban Fantasy',
                        title: 'Urban Fantasy',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                value: 'Mystery',
                title: 'Mystery',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        value: 'Detective',
                        title: 'Detective',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        value: 'Cozy Mystery',
                        title: 'Cozy Mystery',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
        ],
    },
    {
        value: 'Non-Fiction',
        title: 'Non-Fiction',
        icon: <CarryOutOutlined />,
        children: [
            {
                value: 'Biography',
                title: 'Biography',
                icon: <CarryOutOutlined />,
            },
            {
                value: 'Self-Help',
                title: 'Self-Help',
                icon: <CarryOutOutlined />,
            },
            {
                value: 'Science',
                title: 'Science',
                icon: <CarryOutOutlined />,
                children: [
                    {
                        value: 'Physics',
                        title: 'Physics',
                        icon: <CarryOutOutlined />,
                    },
                    {
                        value: 'Biology',
                        title: 'Biology',
                        icon: <CarryOutOutlined />,
                    },
                ],
            },
            {
                value: 'History',
                title: 'History',
                icon: <CarryOutOutlined />,
            },
        ],
    },
    {
        value: 'Romance',
        title: 'Romance',
        icon: <CarryOutOutlined />,
        children: [
            {
                value: 'Contemporary Romance',
                title: 'Contemporary Romance',
                icon: <CarryOutOutlined />,
            },
            {
                value: 'Historical Romance',
                title: 'Historical Romance',
                icon: <CarryOutOutlined />,
            },
            {
                value: 'Paranormal Romance',
                title: 'Paranormal Romance',
                icon: <CarryOutOutlined />,
            },
        ],
    },
    {
        value: 'Science Fiction',
        title: 'Science Fiction',
        icon: <CarryOutOutlined />,
        children: [
            {
                value: 'Dystopian',
                title: 'Dystopian',
                icon: <CarryOutOutlined />,
            },
            {
                value: 'Space Opera',
                title: 'Space Opera',
                icon: <CarryOutOutlined />,
            },
        ],
    },
    {
        value: 'Horror',
        title: 'Horror',
        icon: <CarryOutOutlined />,
        children: [
            {
                value: 'Supernatural Horror',
                title: 'Supernatural Horror',
                icon: <CarryOutOutlined />,
            },
            {
                value: 'Psychological Horror',
                title: 'Psychological Horror',
                icon: <CarryOutOutlined />,
            },
        ],
    },
    {
        value: 'Thriller',
        title: 'Thriller',
        icon: <CarryOutOutlined />,
        children: [
            {
                value: 'Legal Thriller',
                title: 'Legal Thriller',
                icon: <CarryOutOutlined />,
            },
            {
                value: 'Spy Thriller',
                title: 'Spy Thriller',
                icon: <CarryOutOutlined />,
            },
        ],
    },
];

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const Users = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logout } = useAuth();

    const books = useBooks();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode-variables');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [genreValue, setGenreValue] = useState();
    const onGenreChange = (newGenreValue) => {
        console.log(newGenreValue);
        setGenreValue(newGenreValue);
    };

    return (
        <>
            <div className={`dashboard-container ${isDarkMode ? 'dark' : ''}`}>
                <nav>
                    <div className="toggle">
                        <div className="home-logo">
                            <img src={image} alt="image logo" />
                            <a href="#">Đọc<span className='emphasized-text'>Sách</span>Đi</a>
                        </div>
                        <div className="close" id="close-btn" onClick={toggleMenu}>
                            <span className="material-symbols-outlined">close</span>
                        </div>
                    </div>
                    <div className="nav">
                        <button id="menu-btn" onClick={toggleMenu}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="dark-mode" onClick={toggleDarkMode}>
                            <span className={`material-symbols-outlined ${!isDarkMode ? 'active' : ''}`}>light_mode</span>
                            <span className={`material-symbols-outlined ${isDarkMode ? 'active' : ''}`}>dark_mode</span>
                        </div>

                        <div className="profile">
                            <div className="info">
                                <p>Chào buổi sáng, <span className='emphasized-text'><strong>admin</strong></span>!</p>
                                <small className="text-muted">Admin</small>
                            </div>
                            <div className="profile-photo">
                                <img src={image} alt="profile" />
                            </div>
                        </div>
                    </div>
                </nav>
                {/* Sidebar Section */}
                <aside className={`sidebar-container ${isMenuOpen ? 'open' : ''}`}>
                    <div className="sidebar">
                        <a href="/dashboard">
                            <span className="material-symbols-outlined">dashboard</span>
                            <h3>Bảng điều khiển</h3>
                        </a>
                        <a href="#">
                            <span className="material-symbols-outlined">receipt</span>
                            <h3>Sách của tôi</h3>
                        </a>
                        <a href="#">
                            <span className="material-symbols-outlined">insights</span>
                            <h3>Tiến trình đọc</h3>
                        </a>
                        <a href="#">
                            <span className="material-symbols-outlined">bookmark</span>
                            <h3>Bộ sưu tập</h3>
                        </a>
                        <a href="#">
                            <span className="material-symbols-outlined">mail</span>
                            <h3>Cập nhật</h3>
                            <span className="message-count">28</span>
                        </a>
                        <a href="#">
                            <span className="material-symbols-outlined">report</span>
                            <h3>Báo cáo</h3>
                        </a>
                        <a href="/users" className="active">
                            <span className="material-symbols-outlined">person</span>
                            <h3>Thành viên</h3>
                        </a>
                        <a href="/addbook">
                            <span className="material-symbols-outlined">add</span>
                            <h3>Thêm sách</h3>
                        </a>
                        <a href="/" onClick={logout}>
                            <span className="material-symbols-outlined">logout</span>
                            <h3>Đăng xuất</h3>
                        </a>
                    </div>
                </aside>
                {/* End of Sidebar */}

                {/* Main Content */}
                <main className='add-book'>
                    <div className='main-content'>
                        <div className='add-book-container'>
                            <div className='btn add-book'><a onClick={showModal}>&#43; Thêm sách</a></div>
                            <div>
                                <h1>Quản Lý Thành Viên</h1>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên tài khoản</th>
                                        <th>Email</th>
                                        <th>Ngày tạo</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book, index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{book.title}</td>
                                            <td>{Array.isArray(book.author) ? book.author.join(", ") : book.author}</td>
                                            <td>{Array.isArray(book.tags) ? book.tags.join(", ") : book.tags}</td>
                                            <td><a>Chi tiết</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                {/* End of Main Content */}
            </div>

            <Modal
                className="custom-modal"
                title="Thêm Sách Mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Discard"
            >
                <Form
                    {...formItemLayout}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        label="Tiêu đề"
                    // validateStatus="error"
                    // help="Should be combination of numbers & alphabets"
                    >
                        <Input placeholder="Nhập tiêu đề của sách" id="error" />
                    </Form.Item>

                    <Form.Item
                        label="Tác giả"
                    // validateStatus="warning"
                    >
                        <Input placeholder="Nhập tên tác giả" id="warning" prefix={<TeamOutlined />} />
                    </Form.Item>

                    <Form.Item
                        label="Thể loại"
                        hasFeedback
                    // validateStatus="validating"
                    // help="The information is being validated..."
                    >
                        <TreeSelect
                            showSearch
                            style={{
                                width: '100%',
                            }}
                            value={genreValue}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            placeholder="Nhập thể loại của sách"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={onGenreChange}
                            treeData={genreSelect}
                        />
                    </Form.Item>

                    <Form.Item label="Mô tả">
                        <Input.TextArea placeholder="Nhập mô tả hoặc giới thiệu sách" allowClear showCount />
                    </Form.Item>
                    <Form.Item label="Đăng ngay" valuePropName="checked" help="Công khai sách đến toàn bộ thành viên">
                        <Switch defaultChecked />
                    </Form.Item>
                    <Form.Item label="Ảnh bìa" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action="/upload.do" listType="picture-card">
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Tải lên
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Users;
