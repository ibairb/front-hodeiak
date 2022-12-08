import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'

const Users = () => {
    let [users, setUsers] = useState()

    useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
       await fetch('http://localhost:3000/users')
        .then ((res) => res.json())
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
            name: 'AGE',
            selector: row => row.age
        }
    ]


    return (
        <>
            <DataTable
            columns= {columns}
            data={users}
            pagination
            />
        </>
    )

}
export default Users