import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'

const Projects = () => {
    let [projects, setProjects] = useState([Object])
    let [epics,setEpics]=useState([Object])
    let[features,setFeatures]=useState([Object])
    let[pbis,setPbis]=useState([Object]);
    useEffect(() => {
        getProjects()
    }, [])
    const getProjects = async () => {
        await fetch('http://localhost:8000/projects')
            .then((res) => res.json())
            .then((res) => {
                setProjects(res)
            })
    }
    // const getEpics=async () => {
    //     await fetch('http://localhost:8000/projects')
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setProjects(res)
    //         })
    // }

    const columns = [
        {
            name: 'PROJECT',
            selector: row => row.projectname
        },
        {
            name: 'STATUS',
            selector: row => row.status
        },
        
    ]
    return (
        <> 
        <div className='content'>
            <DataTable
                title='Projects'
                columns={columns}
                data={projects}
                pagination
                selectableRows
            />
        </div>
     </>
        
    )
}
export default Projects;



