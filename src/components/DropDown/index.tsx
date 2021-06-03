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
                    <option disabled></option>
                    {
                        data.map((item : any, index : number) => (
                            <option key={index} value={item[value]}>{item[accessor]}</option>
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