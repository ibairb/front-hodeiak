import { Button, MenuItem, Select } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import "./Modal.css";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
export const UserModal = ({ setOpen, setUser, user }) => {
    const [state, setState] = useState({
        modalIsOpen: true,
        comments: []
    })
    const [projects, setProjects] = useState(null);
    const [value, setValue] = useState(null);
    const [projectDeleted, setProjectDeleted] = useState(null);
    useEffect(() => {
        if (value) {
            if (!user.projects.includes(value)) {
                user.projects = [...user.projects, value]
            }
        }
    }, [value])
    useEffect(() => {
        if (projectDeleted) {
            if (user.projects.includes(projectDeleted)) {
                var index = user.projects.indexOf(projectDeleted);

                if (index !== -1) {
                    user.projects.splice(index, 1);
                }
            }
            setUser(user)
            console.log(user.projects);
        }
    }, [projectDeleted])

    const closeModal = () => {
        setState({ modalIsOpen: false });
        setOpen(false)
        setUser(null)
    }

    const showProjectsList = async () => {
        const respProjects = await fetch("http://localhost:8000/projects")
        const projects = await respProjects.json()
        setProjects(projects);
    }

    const handleSubmit = event => {
        addUser()
        setOpen(false)
    };

    function addUser() {
        console.log(user);
        const putTaskInPbi = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch(`http://localhost:8000/users/updateUserProject/${user.email}/`, putTaskInPbi)
            .then(response => response.json())
            .then(data => console.log(data));
    }



    return (
        <>
            {user && <Modal
                appElement={document.getElementById('root')}
                isOpen={state.modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Ejemplo de modal anidado"
                className="modalUsersClass"

            >
                <div className="contenedorPrincipal" >
                    <div style={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        align: "center",
                        marginTop: "1.2em",
                        justifyContent: 'center',
                        zIndex: "1000",
                        textAlign: "center",
                        margin: "0 auto",
                        maxWidth: "600px"
                    }}>

                        <h2>User:  {user.username}</h2>
                        <div className="line-width"></div>
                        <h2>Status:  {user.status}</h2>
                        <div className="line-width"></div>
                        <div className='projects-title'>
                            <h2>Projects   :</h2>
                            <Stack direction="row" spacing={2}>
                                <Button style={{backgroundColor: "rgba(241, 171, 32, 0.853)"}}
                                    variant="contained" startIcon={<LibraryAddIcon />} onClick={() => showProjectsList()} >
                                    Add
                                </Button>
                                {projects &&
                                    <Select
                                        onChange={e => setValue(e.target.value)}
                                        required
                                        className="dropdownlist"
                                        sx={{ m: 1, minWidth: 120 }}
                                        defaultOpen={true}
                                    >
                                        {projects.map(collection => <MenuItem key={collection.projectname} value={collection.projectname}>{collection.projectname}</MenuItem>)}
                                    </Select>}
                            </Stack>
                        </div>
                        <div className="line-width"></div>
                        {user.projects && user.projects.map(p => 
                        <div className='project'>
                            <h2>{p}</h2>
                            <Stack direction="row" spacing={1} display={"flex"}
                            >
                                <Button 
                                    style={{
                                            color: "rgba(241, 171, 32, 0.853)",
                                            borderColor: "rgba(241, 171, 32, 0.853)",
                                            height: "40px",
                                            width: "40px",
                                             border: "0"

                                            }} 
                                    value={p}   
                                    variant="outlined" 
                                    startIcon={<CancelIcon />} 
                                    onClick={(e) => setProjectDeleted(e.target.value)}
                                        >
                                </Button>
                            </Stack>
                        </div>)}
                        <Stack direction="row" spacing={4} mt={2}>
                        <Button style={{
                            backgroundColor: "rgba(241, 171, 32, 0.853)"
                        }}
                            variant="contained" startIcon={<CheckBoxIcon />} onClick={() => handleSubmit()} >
                            Confirm
                        </Button>
                        <Button style={{
                            color: "rgba(241, 171, 32, 0.853)",
                            borderColor: "rgba(241, 171, 32, 0.853)"
                        }}
                            variant="outlined" startIcon={<CancelIcon />} onClick={() => { setOpen(false) }}>
                            Cancel
                        </Button>
                    </Stack>
                    </div>

                </div>
            </Modal>}
        </>)
}

