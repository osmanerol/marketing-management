import React, { FC } from 'react';
import { Input } from '@chakra-ui/react';
import './index.scss';
import cx from 'classnames';

interface IDefaultProps{
    className? : string,
    id? : string,
    placeholder? : string,
    type? : string,
    text? : string,
    variant? : any,
    errors? : any,
    register? : any,
    size? : string,
    onChange? : any
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, id, type, placeholder = '', text, variant='outline', errors, register, size, onChange } = props;
    return (
        <>
            <div className={cx(className)}>
                { text && <small>{text}</small> }
                <Input id={id} type={type} placeholder={placeholder} variant={variant} size={size} onChange={onChange} ref={register} />
            </div> 
            {
                errors  && <small className='error'>{errors[id!]?.message}</small>
            }
        </>
    );
};

export default Index;