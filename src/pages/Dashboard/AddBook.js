import axios from 'axios';
import React, { useState } from 'react';
import './Dashboard.css';
import { useAuth } from '../../contexts/AuthContext';
import image from '../../images/image.png';
import { useBooks } from '../../contexts/BookContext';
import { TeamOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Upload, TreeSelect, message } from 'antd';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const genreSelect = [
    {
        title: 'Fiction',
        value: 'fiction',
        children: [
            { title: 'Adventure', value: 'adventure' },
            { title: 'Mystery', value: 'mystery' },
        ],
    },
    {
        title: 'Non-fiction',
        value: 'non-fiction',
        children: [
            { title: 'Biography', value: 'biography' },
            { title: 'Self-Help', value: 'self-help' },
        ],
    },
];

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddBook = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logout } = useAuth();
    const { books, newestBooks } = useBooks();
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        title: '',
        authors: [],
        tags: [],
        description: '',
        file: null,
    });

    const onGenreChange = (value) => {
        setFormData((prev) => ({ ...prev, tags: value }));
    };

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

    const handleCreate = async (values) => {
        const { title, description, authors, file, tags } = formData;
        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('file', file);
        data.append('authors', JSON.stringify(authors));
        data.append('tags', JSON.stringify(tags));

        try {
            await axios.post('http://localhost:8080/api/books', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            message.success('Thêm sách thành công!');
        } catch (error) {
            message.error('Lỗi khi thêm sách:', error);
        } finally {
            handleCancel();
        }
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, file: e.file }));
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFormData({
            title: '',
            authors: [],
            tags: [],
            description: '',
            file: null,
        });
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
                        <a href="/users">
                            <span className="material-symbols-outlined">person</span>
                            <h3>Thành viên</h3>
                        </a>
                        <a href="/addbook" className="active">
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
                            <div className='btn add-book'>
                                <a onClick={() => setIsModalOpen(true)}>&#43; Thêm sách</a></div>
                            <div>
                                <h1>Sách Mới Cập Nhật</h1>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tiêu đề</th>
                                        <th>Tác giả</th>
                                        <th>Thể loại</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newestBooks.map((book, index) => (
                                        <tr key={index}>
                                            <td>{book.id}</td>
                                            <td>{book.title}</td>
                                            <td>{Array.isArray(book.authorNames) ? book.authorNames.join(", ") : book.authorNames}</td>
                                            <td>{Array.isArray(book.tagNames) ? book.tagNames.join(", ") : book.tagNames}</td>
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
                onOk={() => form.submit()}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Huỷ bỏ"
            >
                <Form
                    form={form}
                    {...formItemLayout}
                    onFinish={handleCreate}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Nhập tiêu đề của sách"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tác giả"
                        name="authors"
                    >
                        <Input
                            type="text"
                            value={formData.authors.join(', ')}
                            onChange={(e) => setFormData((prev) => ({ ...prev, authors: e.target.value.split(',') }))}
                            placeholder="Nhập tên tác giả"
                            prefix={<TeamOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Thể loại"
                        name="tags"
                    >
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={formData.tags}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Nhập thể loại của sách"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={onGenreChange}
                            treeData={genreSelect}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                    >
                        <Input.TextArea
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Nhập mô tả hoặc giới thiệu sách"
                            allowClear
                            showCount
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh bìa"
                        name="cover"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải lên</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddBook;
