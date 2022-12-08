import './Clients.scss'
import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'

const Clients = () => {
    let [clients, setClients] = useState()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await fetch('http://localhost:3000/clients')
            .then((res) => res.json())
            .then((res) => {
                setClients(res)
            })
    }


    const columns = [
        {
            name: 'CLIENT',
            selector: row => row.client
        },
        {
            name: 'PROJECTS',
            selector: row => row.projects
        },
        {
            name: 'REF NUMBER',
            selector: row => row.ref
        }
    ]


    return (
        <>
            <div className='content'>
                <h2>Clients</h2>

                <DataTable
                    columns={columns}
                    data={clients}
                    pagination
                />
            </div>
        </>
    )

}
export default Clients;