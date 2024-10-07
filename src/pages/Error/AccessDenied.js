import { Button, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Title level={2}>Access Denied</Title>
            <p>You do not have permission to view this page.</p>
            <Button type="primary" onClick={() => navigate('/')}>Go to Home</Button>
        </div>
    );
};

export default AccessDenied;
