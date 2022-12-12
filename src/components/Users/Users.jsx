import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'

const Users = () => {
    let [users, setUsers] = useState()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await fetch('http://localhost:3000/users')
            .then((res) => res.json())
            .then((res) => {
                setUsers(res)
            })
    }


    const columns = [
        {
            name: 'NAME',
            selector: row => row.name
        },
        {
            name: 'SURNAME',
            selector: row => row.surname
        },
        {
            name: 'EMAIL',
            selector: row => row.email
        }
    ]


    return (
        <>
            <div className='content'>
                <h2>Users</h2>

                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                />
            </div>
        </>
    )

}
export default Users