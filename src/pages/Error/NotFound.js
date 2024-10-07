import { Button, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Title level={2}>404 - Page Not Found</Title>
            <p>The page you are looking for does not exist.</p>
            <Button type="primary" onClick={() => navigate('/')}>Go to Home</Button>
        </div>
    );
};


export default NotFound;
