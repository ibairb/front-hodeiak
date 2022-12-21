import { TextField } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import "../Modal.css";
import { DropDownList } from './DropDownList';
import { DropDownListUser } from './DropDownListUser'

export const SecondModal = ({ setPbi }) => {

    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState(null);
    const [stringProject, setStringProject] = useState(null);

    const [epic, setEpic] = useState(null);
    const [epics, setEpics] = useState(null);
    const [stringEpic, setStringEpics] = useState(null);
    const [projectEpics, setProjectEpics] = useState(null);
    const [selectedEpics, setSelectedEpics] = useState(null);

    const [feature, setFeature] = useState(null);
    const [features, setFeatures] = useState();
    const [selectedFeatures, setSelectedFeatures] = useState(null);
    const [stringFeature, setStringFeatures] = useState(null);

    const [pbis, setPbis] = useState();
    const [selectedPbis, setSelectedPbis] = useState(null);
    const [stringPbi, setStringPbi] = useState(null);

    const [tasks, setTasks] = useState()
    const [data, setData] = useState({})
    const loggedUser = localStorage.getItem('email')
    const status = localStorage.getItem('status')

    useEffect(() => {
        fetchAllTasks()

    }, [])

    useEffect(() => {
        if (stringProject) {
            if (status != "user") {

                setProject(projects.filter(e => e.projectname === stringProject)[0])
            } else {
                setProject(projects.projects.filter(e => e.projectname === stringProject)[0])
            }
        }
    }, [stringProject])

    useEffect(() => {
        console.log(epics);
        if (stringEpic) {
            setEpic(epics.filter(e => e.epicname === stringEpic)[0])
            console.log(epic);
        }
    }, [stringEpic])

    useEffect(() => {
        if (stringFeature) {
            setFeature(features.filter(e => e.featurename === stringFeature)[0])
        }
        console.log(feature);
    }, [stringFeature])

    useEffect(() => {
        if (stringPbi) {
            setPbi(pbis.filter(e => e.pbiname === stringPbi)[0])
        }

    }, [stringPbi])

    useEffect(() => {
        if (project) {
            const epicsArray = epics.filter(e => {
                if (project.epics.includes(e.id)) {
                    return e.epicname
                }
            })
            setSelectedEpics(epicsArray)
        }//project

    }, [project])

    useEffect(() => {

        if (epic) {
            const featuresArray = features.filter(e => {
                if (epic.features.includes(e.id)) {
                    return e.featurename
                }
            })
            setSelectedFeatures(featuresArray)

        }//epic

    }, [epic])

    useEffect(() => {

        if (feature) {
            const pbisArray = pbis.filter(e => {

                if (feature.pbis.includes(e.id)) {
                    return e.pbiname
                }
            })
            setSelectedPbis(pbisArray)
        }//feature

    }, [feature])

    // useEffect(() => {

    //     if (stringPbi){
    //         console.log(stringPbi);
    //         const pbisArray = pbis.filter(e=>{
    //             console.log(e);
    //             if (feature.pbis.includes(e.id)){
    //                 return e
    //             }
    //             })
    //         console.log(pbisArray);
    //         setSelectedPbis(pbisArray)

    //     }//feature

    // }, [stringPbi])  

    const fetchAllTasks = async () => {
        if (status != 'user') {
            const respProjects = await fetch("http://localhost:8000/projects")
            const projects = await respProjects.json()
            setProjects(projects);
            const respEpics = await fetch("http://localhost:8000/epics")
            const epics = await respEpics.json()
            setEpics(epics);
            const respFeatures = await fetch("http://localhost:8000/features")
            const features = await respFeatures.json()
            setFeatures(features);
            const respPbis = await fetch("http://localhost:8000/pbis")
            const pbis = await respPbis.json()
            setPbis(pbis);
            const respTasks = await fetch("http://localhost:8000/tasks")
            const tasks = await respTasks.json()
            setTasks(tasks);
        } else {
            const respProjects = await fetch(`http://localhost:8000/users/${loggedUser}`)
            console.log(loggedUser)
            const projects = await respProjects.json()
            setProjects(projects);
            projects.projects.map(element => {
                console.log(element)
                fetch(`http://localhost:8000/projects/${element}`)
                .then((res) => res.json())
                .then((res) => console.log(res))
            })
        }
    }

    return (
        <>
            <div className="contenedorPrincipal" >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    align: "center",
                    marginTop: "1.2em",
                    justifyContent: 'center',
                    zIndex: "1000",
                    textAlign: "center"
                }}>


                    {status != "user" && projects != null ? <DropDownList list={projects} setValue={setStringProject} string={"projects"} /> : projects != null ? <DropDownListUser list={projects.projects} setValue={setStringProject} string={"projects"} /> : <></>}
                    {status != "user" && selectedEpics != null ? <DropDownList list={selectedEpics} setValue={setStringEpics} string={"epics"} /> : selectedEpics != null ? <DropDownListUser list={selectedEpics} setValue={setStringEpics} string={"epics"} /> : <></>}
                    {status != "user" && selectedFeatures != null ? <DropDownList list={selectedFeatures} setValue={setStringFeatures} string={"features"} /> : selectedFeatures != null ? <DropDownListUser list={selectedFeatures} setValue={setStringFeatures} string={"features"} /> : <></>}
                    {status != "user" && selectedPbis != null ? <DropDownList list={selectedPbis} setValue={setStringPbi} string={"pbis"} /> : selectedPbis != null ? <DropDownListUser list={selectedPbis} setValue={setStringPbi} string={"pbis"} /> : <></>}
                </div>
            </div>
        </>)
}

