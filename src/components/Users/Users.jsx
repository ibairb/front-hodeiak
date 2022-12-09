import { useEffect, useState } from "react"
import DataTable, { defaultThemes } from 'react-data-table-component'

const Users = () => {
    let [users, setUsers] = useState()
    let [search, setSearch] = useState('')
    let [filterUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const result = filterUsers.filter(user => {
            return user.name.toLowerCase().match(search.toLowerCase())
        })
        setFilteredUsers(result)
    }, [search])

    const getData = async () => {
        await fetch('http://localhost:3000/users')
            .then((res) => res.json())
            .then((res) => {
                setUsers(res)
                setFilteredUsers(res)
            })
    }

    const editUser = (e) => {
        console.log(users)
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
            name: 'NAME',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'SURNAME',
            selector: row => row.surname,
            sortable: true
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Action',
            cell: row => <button className="btn btn-primary" onClick={editUser} >Edit</button>
        }
    ]


    return (
        <>
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
                        className="w-25 from-control"/>
                    }
                    subHeaderAlign='left'
                />
            </div>
        </>
    )

}
export default Users