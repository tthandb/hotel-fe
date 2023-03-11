import { Spin } from 'antd';
import React from 'react';

const loadingStyle: React.CSSProperties = {
    position: 'absolute',
    top: -24,
    left: -266,
    background: 'white',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const Loading = () => {
    return (
        <div style={loadingStyle}>
            <Spin size='large' />
        </div>
    )
}

export default Loading;