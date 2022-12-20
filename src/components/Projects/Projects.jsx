import { useEffect, useState } from "react"
import DataTable, { defaultThemes } from 'react-data-table-component'
import React from 'react'
import Select from 'react-select'
import Modal from '../Modal/Modal';
import "./projects.scss"

const Projects = () => {
    let [modalOpen, setModalOpen] = useState(false)
    let [projects, setProjects] = useState([])
    let [projectName,setProjectName] = useState([])
    let [epicName,setEpicName] = useState([])
    let [pbiName,setPbiName] = useState([])
    let [taskName,setTaskName] = useState([])

    let [epics,setEpics] = useState([])
    let [featureName,setFeatureName] = useState([])
    let [feature,setFeature] = useState([])
    let [pbi,setPbi] = useState([])
    let [tasks,setTasks] = useState([])

    let [flag, setFlag] = useState(false)

    useEffect(()=>{
        console.log(featureName)
    }, [featureName])
    
    function changeProjectName(e){
        setProjectName(e.value) 
    }

    function changeEpicName(e){
        
        setEpicName(e.value)  
        
    }

    function changeFeatureName(e){
        console.log(e)
        setFeatureName(e.value)
    }
    function changePbiName(e){
        console.log(e)
        setPbiName(e.value)
    }
    function changeTasksName(e){
        console.log(e)
        setTaskName(e.value)
    }

    useEffect(()=>{
        fetch('http://localhost:8000/projects')
        .then(response => response.json())
        .then((res) => {
            setProjects(res)
        });
    },[])

    useEffect(() => {
        fetch(`http://localhost:8000/projects/${projectName}`)
      .then((res) => res.json())
      .then((res) => {
        setEpics(res.epics)
      })
    }, [projectName])


    useEffect(() => {
        fetch(`http://localhost:8000/epics/${epicName}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.features)
        setFeature(res.features)
      })
    }, [epicName])

    useEffect(() => {
        fetch(`http://localhost:8000/features/${featureName}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.pbis)
        setPbi(res.pbis)
      })
    }, [featureName])

    useEffect(() => {
        fetch(`http://localhost:8000/pbis/${pbiName}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.pbis)
        setTasks(res.tasks)
      })
    }, [pbiName])

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
           
            <div id="selects">
                <Select className="item"
                        onChange={changeProjectName} options={projects.length!=undefined && projects.length>0? projects.map(element => {
                            return { value: element.projectname, label: element.projectname }}):""} />

                <Select onChange={changeEpicName} options={
                    epics != undefined && epics.length != undefined && epics.length > 0 ?
                    epics.map(element => {
                            return { value: element, label: element }})
                    : ''
                }/>

                <Select onChange={changeFeatureName} options={
                    feature != undefined && feature.length != undefined && feature.length > 0 ? feature.map(element => {
                            return { value:element,label: element }})
                    : ""
                }/>

                <Select onChange={changePbiName} options={
                    pbi != undefined && pbi.length != undefined && pbi.length > 0 ? pbi.map(element => {
                            return { value:element,label: element }})
                    : ""
                }/>
                <Select onChange={changeTasksName} options={
                    tasks != undefined && tasks.length != undefined && tasks.length > 0 ? tasks.map(element => {
                            return { value:element,label: element }})
                    : ""
                }/>
                
                </div>
                     
            
            
        </>
    )
}
export default Projects;



