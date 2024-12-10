import React from 'react';
import classNames from '@/utils/classNames';

const WrapperMenu = ({ className, children }: any) => {
    return (
        <div
            className={classNames(
                'dark:border-grayScale-c3 dark:bg-grayScale-c2 flex w-full flex-col rounded-lg border border-[#E7ECF3] bg-white py-2 shadow-[0px_6px_30px_rgba(37,_37,_37,_0.16)] dark:border',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default WrapperMenu;
