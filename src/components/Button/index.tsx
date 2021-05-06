import React, { FC } from 'react';
import './index.scss';
import { Button } from "@chakra-ui/react";
import cx from 'classnames';

interface IDefaultProps{
    text : string,
    className? : string,
    size? : string,
    type? : any,
    onClick? : any
}

const index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, text, size='md', type='button', onClick } = props;
    
    return (
        <div className={cx(className)}>
            <Button type={type} size={size} onClick={onClick}>{ text }</Button>
        </div>
    );
};

export default index;