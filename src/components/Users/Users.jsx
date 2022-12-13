import { useEffect, useState } from "react"
import DataTable, { defaultThemes } from 'react-data-table-component'
import Modal from '../Modal/Modal';

const Users = () => {
    let [users, setUsers] = useState()
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await fetch('http://localhost:8000/users')
            .then((res) => res.json())
            .then((res) => {
                setUsers(res)
            })
    }

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: defaultThemes.default.divider.default,
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
    };


    const columns = [
        {
            name: 'USERNAME',
            selector: row => row.username,
            sortable: true
        },
        {
            name: 'STATUS',
            selector: row => row.status,
            sortable: true
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
            sortable: true
        },
        
        {
            name: 'PHONE',
            selector: row => row.phone,
            sortable: true
        },
        {
            name: 'HOUR COST',
            selector: row => row.hourCost,
            sortable: true
        }
    ]


    return (
        <>
            <div className='openModal'>
                <button
                    style={{
                        marginLeft: '90%',
                        background: 'salmon',
                        border: 'none',
                        color: 'white',
                        width: '80px',
                        height: '30px',
                        borderRadius: '8px',
                        fontSize:'15px'
                    }}
                    onClick={() => {
                        setModalOpen(true);
                    }}
                >
                    New User
                </button>

                {modalOpen && <Modal setOpenModal={setModalOpen} />}
            </div>
            <div className='content'>
                <DataTable
                    title='Users'
                    customStyles={customStyles}
                    columns={columns}
                    data={users}
                    pagination
                    selectableRows
                    selectableRowsHighlight
                    dense
                    subHeader
                    subHeaderComponent={
                        <input type='text'
                            placeholder='Search a User'
                            className="w-25 from-control" />
                    }
                    subHeaderAlign='left'
                />
            </div>
        </>
    )

}
export default Users