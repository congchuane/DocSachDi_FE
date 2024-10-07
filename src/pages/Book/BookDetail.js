import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import image from '../../images/image.png';
import './BookDetail.css';
import { BookOutlined, ReadOutlined, HomeOutlined, TeamOutlined, HeartFilled, LikeOutlined, MessageOutlined, StarOutlined, CheckOutlined } from '@ant-design/icons';
import { Breadcrumb, Flex, Rate, Avatar, List, Space, Dropdown, Button, message } from 'antd';
import BookCard from '../../components/BookCard';
import { useNavigate } from "react-router-dom";
import { useBooks } from '../../contexts/BookContext';
import { useAuth } from '../../contexts/AuthContext';

const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
};

const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const items = [
    {
        label: 'MUỐN ĐỌC',
        key: '1',
        icon: <BookOutlined />,
    },
    {
        label: 'ĐANG ĐỌC',
        key: '2',
        icon: <ReadOutlined />,
    },
    {
        label: 'ĐÃ ĐỌC',
        key: '3',
        icon: <CheckOutlined />,
    },
];

const menuProps = {
    items,
    onClick: handleMenuClick,
};

const data = Array.from({
    length: 5,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `user ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    rating: 3,
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const BookDetail = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const { books } = useBooks();
    const { username, logout } = useAuth();
    const [relatedBooks, setRelatedBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/books/${bookId}`);
                const book = response.data;
                const newCoverPath = book.coverPath.replace(/^\/Users\/vinguyen\/OneDrive\/GitHub\/docsachdi\/public/, '');

                setBook({
                    ...book,
                    coverPath: newCoverPath,
                });

                // Cập nhật danh sách sách liên quan
                updateRelatedBooks(book.tagNames);
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết sách:', error);
            }
        };

        getBook();
    }, [bookId]);

    const updateRelatedBooks = (tags) => {
        // Lọc sách có cùng tag
        const filteredBooks = books.filter((b) =>
            b.tagNames.some((tag) => tags.includes(tag)) && b.id !== bookId // Không bao gồm cuốn sách hiện tại
        );

        // Ngẫu nhiên chọn 10 cuốn sách
        const randomBooks = filteredBooks.sort(() => 0.5 - Math.random()).slice(0, 10);

        setRelatedBooks(randomBooks);
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='glass-container'>
                <nav className="navbar">
                    <div className="home-logo">
                        <img src={image} alt={"book cover"} />
                        <a href='/'>Đọc<span className='emphasized-text'>Sách</span>Đi</a>
                    </div>
                    <div className="searchbar">
                        <input className="search" placeholder=" " spellCheck="false" />
                    </div>
                    <ul className="nav-links">
                        <li className="nav-link"><a href='/library'>Hướng dẫn</a></li>
                        <li className="nav-link"><a href='/library'>Blog</a></li>
                        <li className="nav-link"><a href='/' onClick={handleLogout} className='active'>Đăng xuất</a></li>
                        <li className="nav-link">Xin chào, <strong>{username}</strong>!</li>
                    </ul>
                </nav>
                <div className="home-content book-detail">
                    <div className='breadcrumb'>
                        <Breadcrumb
                            items={[
                                {
                                    href: '/library',
                                    title: <HomeOutlined />,
                                },
                                {
                                    title: book.tagNames[0],
                                },
                                {
                                    title: book.title,
                                },
                            ]}
                        />
                    </div>
                    <div className='row'>
                        <div className='col-2'>
                            <img src={book.coverPath} alt={book.title} />
                        </div>
                        <div className='col-2'>
                            <h1>{book.title}</h1>

                            <h3><TeamOutlined style={{ marginRight: '5px' }} />
                                <a href=''>{book.authorNames.join(', ')}</a>
                            </h3>

                            <div className="rating">
                                <Flex horizontal>
                                    <Rate
                                        value={book.rating}
                                        character={<HeartFilled />}
                                        className="custom-rate"
                                        allowHalf
                                    />
                                    <span className='book-rating'>{book.rating}</span>
                                    <span>/5</span>
                                </Flex>
                            </div>

                            <div className='tags'>
                                {book.tagNames.map((tag, index) => (
                                    <a key={index} href=''>{tag}</a>
                                ))}
                            </div>

                            <div className='desc'>
                                <p>{book.description}</p>
                            </div>

                            <div className='user-actions'>
                                <Dropdown menu={menuProps}>
                                    <Button>
                                        <Space>
                                            Muốn đọc
                                            <BookOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-content reviews'>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            align: 'center',
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                ]}
                                extra={
                                    <Rate
                                        value={item.rating}
                                        character={<HeartFilled />}
                                        className="custom-rate"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </div>
                <div className='page-title'>
                    <h2 style={{ marginTop: '15px', fontSize: '1.8rem' }}>&diams; Sách liên quan &diams;</h2>
                </div>
                <div className="wrapper">
                    {relatedBooks.map((relatedBook, index) => (
                        <BookCard key={index} book={relatedBook} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
