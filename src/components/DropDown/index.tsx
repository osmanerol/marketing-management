import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import './index.scss';
import cx from 'classnames';

interface IDefaultProps{
    className? : string,
    id? : string,
    defaultValue? : any,
    accessor : string,
    value : string,
    data? : any,
    text? : string,
    errors? : any,
    register? : any,
    onChange? : any
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { className, id, data, defaultValue = '', accessor, value, text, errors, register, onChange } = props;
    
    return (
        <div className={cx(className)}>
            { text && <p className='sub-text mb-2'>{text}</p> }
                <Form.Control id={id} name={id} as='select' custom  ref={register} onChange={onChange} defaultValue={defaultValue}>
                    <option disabled selected></option>
                    {
                        data.map((item : any) => (
                            <option key={item.id} value={item[value]}>{item[accessor]}</option>
                        ))
                    }
                </Form.Control>
            {
                errors  && <small className='error text-danger'>{errors[id!]?.message}</small>
            }
        </div> 
    );
};

export default Index;