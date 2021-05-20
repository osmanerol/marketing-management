import React, { FC } from 'react';
import { Input } from '@chakra-ui/react';
import './index.scss';
import cx from 'classnames';

interface IDefaultProps{
    className? : string,
    id? : string,
    placeholder? : string,
    defaultValue? : string,
    type? : string,
    text? : string,
    variant? : any,
    errors? : any,
    register? : any,
    size? : string,
    onChange? : any
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, id, type, placeholder = '', defaultValue = '', text, variant='outline', errors, register, size, onChange } = props;
    return (
        <>
            <div className={cx(className)}>
                { text && <p className='sub-text mb-2'>{text}</p> }
                <Input id={id} name={id} type={type} placeholder={placeholder} defaultValue={defaultValue} variant={variant} size={size} onChange={onChange} ref={register} /> 
                {
                    errors  && <small className='error text-danger'>{errors[id!]?.message}</small>
                }
            </div>
        </>
    );
};

export default Index;