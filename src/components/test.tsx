import React from 'react';

interface MyComponentProps {
    name: string;
}

const MyComponent: React.FC<MyComponentProps> = React.memo(({ name }) => {
    console.log('MyComponent rendered');
    return <div>{name}</div>;
});

export default MyComponent;