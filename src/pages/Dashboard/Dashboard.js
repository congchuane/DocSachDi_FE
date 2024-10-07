import React, { useState } from 'react';
import './Dashboard.css';
import { useAuth } from '../../contexts/AuthContext';
import image from '../../images/image.png';
import more from '../../images/plus-circle-svgrepo-com.png';
import user from '../../images/profile-picture.png';

const Dashboard = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout } = useAuth();

    const orders = [
        {
            productName: 'JavaScript Tutorial',
            productNumber: '123456',
            paymentStatus: 'Due',
            status: 'Review mới',
        },
        {
            productName: 'CSS Full Course',
            productNumber: '123457',
            paymentStatus: 'Refunded',
            status: 'Tạo mới',
        },
        {
            productName: 'JavaScript Tutorial',
            productNumber: '123458',
            paymentStatus: 'Paid',
            status: 'Chỉnh sửa',
        },
    ];

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode-variables');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
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
                    <a href="/dashboard" className="active">
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
            <main>
                <div className='main-content'>
                    <div className="analyse">
                        <div className="sales">
                            <div className="status">
                                <div className="info">
                                    <h3>Tổng số sách</h3>
                                    <h1>65,024</h1>
                                </div>
                                <div className="progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="percentage">
                                        <p>+81%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="visits">
                            <div className="status">
                                <div className="info">
                                    <h3>Lượt truy cập</h3>
                                    <h1>24,981</h1>
                                </div>
                                <div className="progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="percentage">
                                        <p>-48%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="searches">
                            <div className="status">
                                <div className="info">
                                    <h3>Thành viên</h3>
                                    <h1>14,147</h1>
                                </div>
                                <div className="progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="percentage">
                                        <p>+21%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="new-users">
                        <h2>Thành Viên Mới</h2>
                        <div className="user-list">
                            <div className="user">
                                <img src={user} alt="user profile" />
                                <h3>Jack</h3>
                                <p>54 phút trước</p>
                            </div>
                            <div className="user">
                                <img src={user} alt="user profile" />
                                <h3>Amin</h3>
                                <p>3 tiếng trước</p>
                            </div>
                            <div className="user">
                                <img src={user} alt="user profile" />
                                <h3>Ember</h3>
                                <p>6 tiếng trước</p>
                            </div>
                            <div className="user">
                                <img src={more} alt="user profile" />
                                <a href='/users'>Xem thêm</a>
                            </div>
                        </div>
                    </div>

                    <div className="recent-orders">
                        <h2>Cập Nhật Mới</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sách</th>
                                    <th>ID</th>
                                    <th>Payment</th>
                                    <th>Cập nhật</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.productName}</td>
                                        <td>{order.productNumber}</td>
                                        <td>{order.paymentStatus}</td>
                                        <td className={order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}>{order.status}</td>
                                        <td className="primary"><a>Chi tiết</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <a href="/addbook">Xem thêm</a>
                    </div>
                </div>

                {/* Right Section */}
                <div className="right-section">
                    <div className="user-profile">
                        <div className="logo">
                            <img src={image} alt="logo" />
                            <h1>Đọc<span className='emphasized-text'>Sách</span>Đi</h1>
                            <p>React Web App</p>
                        </div>
                    </div>

                    <div className="reminders">
                        <div className="header">
                            <h2>Nhắc nhở</h2>
                            <span className="material-symbols-outlined">notifications</span>
                        </div>
                        <div className="notification">
                            <div className="icon">
                                <span className="material-symbols-outlined">volume_up</span>
                            </div>
                            <div className="content">
                                <div className="info">
                                    <h3>Workshop</h3>
                                    <small className="text_muted">8:00 AM - 12:00 PM</small>
                                </div>
                                <span className="material-symbols-outlined">more_vert</span>
                            </div>
                        </div>

                        <div className="notification deactive">
                            <div className="icon">
                                <span className="material-symbols-outlined">edit</span>
                            </div>
                            <div className="content">
                                <div className="info">
                                    <h3>Workshop</h3>
                                    <small className="text_muted">8:00 AM - 12:00 PM</small>
                                </div>
                                <span className="material-symbols-outlined">more_vert</span>
                            </div>
                        </div>

                        <div className="notification add-reminder">
                            <div>
                                <span className="material-symbols-outlined">notification_add</span>
                                <h3>Add Reminder</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of Right Section */}
            </main>
            {/* End of Main Content */}
        </div>
    );
};

export default Dashboard;
