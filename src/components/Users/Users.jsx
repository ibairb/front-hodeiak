import { useEffect, useState } from "react"
import DataTable, { defaultThemes } from 'react-data-table-component'
import Modal from '../Modal/Modal'

const Users = () => {
    let [users, setUsers] = useState()
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState();


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
            name: 'PROJECTS',
            selector: row => row.projects,
            sortable: true
        },
        {
            name: 'Delete User',
            cell: row => <button
                style={{
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    border: 'none'
                }}
                className="material-symbols-outlined"
                onClick={() => deleteSelectedUser(row.email)}
            >
                Delete
            </button>
        }
    ]

    const deleteSelectedUser = (user) => {
        setSelectedUser(user);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user })
          };
          fetch(`http://localhost:8000/users/${user}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    };

    return (
        <>
            <div className='modal' style={{
                display: 'flex',
                justifyContent: 'center',
                zIndex: '999',
                position: 'absolute',
                width: '100%',
                paddingTop: '50px',
            }}>
                <button
                    style={{
                        position: 'absolute',
                        marginLeft: '90%',
                        marginTop: '-10%',
                        background: 'salmon',
                        border: 'none',
                        color: 'white',
                        width: '80px',
                        height: '30px',
                        borderRadius: '8px',
                        fontSize: '15px',
                        cursor: 'pointer',
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