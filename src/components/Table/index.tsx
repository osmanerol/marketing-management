import React, { FC, useState, useEffect } from 'react';
import './index.scss';
import { ConfirmModal, Spinner } from '../../components';
import { Table, Pagination } from 'react-bootstrap';
import { MdLoop } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { CgReadme } from 'react-icons/cg';

interface IDefaultProps{
    headers : any;
    items : any;
    clickUpdate? : any;
    clickDelete? : any;
    clickInspect? : any;
    isLoading : boolean;
    fetchData : any;
}

const Index : FC<IDefaultProps> = (props : IDefaultProps) => {
    const { headers, items, clickUpdate, clickDelete, clickInspect, isLoading, fetchData } = props;
    const [page, setPage] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    
    useEffect(() => {
        fetchData(page);
    }, [page])

    const handleDelete = (id : number) => {
        setDeleteId(id);
        setShowConfirm(true);
    }

    const handleCloseConfirm = () => {
        setShowConfirm(false);
    }

    const handleConfirm = () => {
        clickDelete(deleteId);
        setShowConfirm(false);
    }

    return (
        <> 
            {
                isLoading ? 
                <Spinner /> :
                <div className='table-container'>
                    <div className="table-overflow-container">
                        <Table hover>
                            <thead>
                                <tr>
                                    {
                                        headers.map((item : any, index : number) => <th key={index}>{item.name}</th>)
                                    }
                                    {
                                        clickUpdate && 
                                        <>
                                            <th>Güncelle</th>
                                            <th>Sil</th>
                                        </>
                                    }
                                    {
                                        clickInspect &&
                                        <th>İncele</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item : any, index : number) =>(
                                        <tr key={index}>
                                            {
                                                headers.map((data : any, dataIndex : number) => {
                                                    if(data['accessor'] === 'type'){
                                                        return <td key={dataIndex}>{item[data['accessor']] === '1' ? 'Ürün' : 'Hizmet'}</td>
                                                    }
                                                    return <td key={dataIndex}>{item[data['accessor']]}</td>
                                                })
                                            }
                                            {
                                                clickUpdate && 
                                                <>
                                                    <td>
                                                        <span className='action-button update' onClick={() => clickUpdate(item.id)}><MdLoop className='icon' /><span className='text'>Güncelle</span></span>
                                                    </td>
                                                    <td>
                                                        <span className='action-button delete' onClick={() => handleDelete(item.id)}><AiFillDelete className='icon' /><span className='text'>Sil</span></span>
                                                    </td>
                                                </>
                                            }
                                            {
                                                clickInspect &&
                                                <td>
                                                    <span className='action-button inspect' onClick={() => clickInspect(item.id)}><CgReadme className='icon' /><span className='text'>İncele</span></span>
                                                </td>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                            { showConfirm && <ConfirmModal show={showConfirm} handleClose={handleCloseConfirm} handleConfirm={handleConfirm} />}
                        </Table>
                    </div>
                    {
                        /*
                            <Pagination>
                                <Pagination.First onClick={() => setPage(0)} />
                                <Pagination.Prev onClick={() => setPage(page-1)}  />
                                <Pagination.Item>{page+1}</Pagination.Item>
                                <Pagination.Next onClick={() => setPage(page+1)}/>
                                <Pagination.Last onClick={() => setPage(page+1)} />
                            </Pagination>
                        */
                    }
                </div>
            }
        </>
    );
};

export default Index;