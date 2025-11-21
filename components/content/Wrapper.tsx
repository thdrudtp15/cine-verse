import React from 'react';

type WrapperProps = {
    children: React.ReactNode;
    className?: string;
};

const Wrapper = React.memo(({ children, className }: WrapperProps) => {
    return <div className={`content-container ${className}`}>{children}</div>;
});

Wrapper.displayName = 'Wrapper';

export default Wrapper;
