import logo from './logo.svg';
import './App.css';
import Create from './components/create'
import Read from './components/read';
import Update from './components/update';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table, Input, Form, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function App() {
  // return (
  //   <Router>

  //     <div className='main'>
  //       <h2 className='main-header'>React Crud Operations</h2>
  //       <div>
  //         <Routes>
  //           <Route exact path='/create' Component={Create} />
  //           <Route exact path='/update' Component={Update} />
  //           <Route exact path='/read' Component={Read}/>
  //         </Routes>
  //       </div>
  //     </div>

  //   </Router>
  // );



  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
      axios.get ('https://emp-app-8gqr.onrender.com/get/')//('http://localhost:8000/get/')
          .then((response) => {
              setAPIData(response.data)
              APIData.push({"first_name":"add", "last_name":"add"})
              console.log(APIData)
          })
  }, [])


  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [department, setDepartment] = useState('')
  const [checkbox, setCheckbox] = useState(false);

  function handleDelete(data) {
      console.log(data)
      axios.delete('http://localhost:8000/delete/'+String(data.id))
  }

  function handleUpdate(data){
      console.log(data)
      axios.put('http://localhost:8000/update/', data)
  }
  
  const setData = (data) => {
      console.log(data)
  }

  const handleActiveChange = e=>{
      console.log(e.target)
      // console.log(e.target.value)
      // console.log(e.target.checked)
  }
  return (
      <div>
          <Form>
              <Table singleLine>
                  <Table.Header>
                      <Table.Row>
                          {/* <Table.HeaderCell>id</Table.HeaderCell> */}
                          <Table.HeaderCell>First Name</Table.HeaderCell>
                          <Table.HeaderCell>Last Name</Table.HeaderCell>
                          <Table.HeaderCell>Department</Table.HeaderCell>
                          <Table.HeaderCell>Hire Date</Table.HeaderCell>
                          <Table.HeaderCell>Email</Table.HeaderCell>
                          {/* <Table.HeaderCell>Active</Table.HeaderCell> */}
                          <Table.HeaderCell>Update</Table.HeaderCell>
                          <Table.HeaderCell>Add</Table.HeaderCell>
                          <Table.HeaderCell>Delete</Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>
                  <Table.Body>
                      {APIData.map((data) => {
                          return (
                              <Table.Row>
                                  {/* <Table.Cell>{data.id}</Table.Cell> */}
                                  <Table.Cell><Input type='text' defaultValue={data.first_name} onChange={(e) => (data.first_name=e.target.value)}></Input></Table.Cell>
                                  <Table.Cell><Input type='text' defaultValue={data.last_name} onChange={(e) => (data.last_name=e.target.value)}></Input></Table.Cell>
                                  <Table.Cell><Input type = 'text' defaultValue ={data.department} onChange={(e) => (data.department=e.target.value)}/></Table.Cell>
                                  <Table.Cell>{new Date(data.created).toDateString()}</Table.Cell>
                                  <Table.Cell><Input type = 'text' defaultValue ={data.email} onChange={(e) => (data.email=e.target.value)}/></Table.Cell>
                                  {/* <Table.Cell><input type='checkbox' value={data.active} onChange={(e)=>handleActiveChange(e)}/></Table.Cell> */}
                                  <Table.Cell>
                                      <Button onClick={(e) => handleUpdate(data)}>Update</Button>
                                  </Table.Cell>
                                  <Table.Cell>
                                      <Button onClick={(e) => handleDelete(data)}>Delete</Button>
                                  </Table.Cell>
                              </Table.Row>
                          )
                      })
                      }
                  </Table.Body>
              </Table>
          </Form>
      </div>
  )
}

export default App;
