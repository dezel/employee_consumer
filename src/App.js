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

const cors = require('cors')

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

// const client = axios.create({
//   baseURL: "http://127.0.0.1:8000",
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
// }
// });


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
    axios.get('https://job-application-wjg8.onrender.com/get/')    //()'https://emp-app-8gqr.onrender.com/get/'
      .then((response) => {
        setAPIData(response.data.concat([{ "applicant_number": "", "name": "", "phone": "" }]))
        // setAPIData([{ "applicant_id": 0, "name": "", "phone": "" }])
        // setAPIData([{ "first_name": "add", "last_name": "add" }])
        // console.log(APIData)
      }).catch((response) => {
        // console.log(response)
        setAPIData([{ "applicant_number": "", "name": "", "phone": "" }])
      })
  }, [])

  const [user, setUser] = useState(false)

  const [search, setSearch] = useState('')

  const [applicant_number, setApplicantNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cvStart, setCvStart] = useState()
  const [checkbox, setCheckbox] = useState(false)
  const [active, setActive] = useState(false);

  function handleDelete(data) {
    // console.log(data)
    axios.delete('https://job-application-wjg8.onrender.com/delete/' + String(data.id))
  }


  function handleSearch() {
    axios.get('https://job-application-wjg8.onrender.com/get/' + search)    //()'https://emp-app-8gqr.onrender.com/get/'
      .then((response) => {
        // console.log(response.data)
        const object_data = []
        object_data.push(response.data)

        setAPIData(object_data.concat([{ "applicant_number": "", "name": "", "phone": "" }]))
        // setAPIData([{ "applicant_number": "", "name": "", "phone": "" }].push())
        // setAPIData([{ "applicant_id": 0, "name": "", "phone": "" }])
        // setAPIData([{ "first_name": "add", "last_name": "add" }])
        // console.log(APIData)
      }).catch((response) => {
        // console.log(response)
        setAPIData([{ "applicant_number": "", "name": "", "phone": "" }])
      })
  }
  function handleUpdate(data) {
    // console.log(first_name, last_name, department)

    data.applicant_number = applicant_number ? applicant_number : data.applicant_number
    data.name = name ? name : data.name
    data.email = email ? email : data.email
    data.phone = phone ? phone : data.phone

    // console.log(data)

    axios.put('https://job-application-wjg8.onrender.com/update/', data)
  }

  const setData = (data) => {
    // console.log(data)
  }

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  function handleLogin() {
    axios.post(
      'https://job-application-wjg8.onrender.com/login/',
      {
        password,
        username
      }
    ).then(response => {
      // console.log(response.status)
      if (response.status = 202) {
        setUser(true)
      }
    })

    // console.log(username, password)
  }

  function handleDownload(data) {
    // // console.log(data['cv'].replace('/music', ''))
    try {
      // console.log(data['cv'])
      const bare_file = data['cv'].replace('\/media\/', '')

      // axios.post('https://job-application-wjg8.onrender.com/download/' + bare_file, )
      axios({
        method: 'post',
        url:'https://job-application-wjg8.onrender.com/download/'+ bare_file,
        responseType: 'arraybuffer'
    })
      .then(response => {
        // console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        // link.setAttribute('download', 'file' + '.docx')
        link.setAttribute('download', bare_file)
        document.body.appendChild(link)
        link.click()
      })
    }
    catch {
      console.log('client has no attachment')
    }

  }
  function handleLogout() {
    axios.post(
      'https://job-application-wjg8.onrender.com/logout/'
    ).then(response => {
      // console.log(response)
      setUser(false)
      setPassword('')
      setUsername('')
    }).catch(response => {
      // console.log(response)
      setUser(false)
      setPassword('')
      setUsername('')
    })
  }

  function handleAdd(data) {
    // console.log(name, applicant_number, phone, email, active, cv)
    // console.log(data)

    const formData = new FormData();
    // formData.append("name", name);
    // cv.append("cv", cvStart);

    formData.append("applicant_number", applicant_number)
    formData.append("name", name)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('cv', cvStart)
    // console.log(formData)

 
    // axios.post('http://localhost:8000/add/',               //'https://emp-app-8gqr.onrender.com/add/',
    //   {
    //     body: formData
    //   }
    // )

    fetch('https://job-application-wjg8.onrender.com/add/', {
      method: 'POST',
      body: formData
    }).catch(response=>{
      console.log(response)
    })
  }


  const handleActiveChange = e => {
    console.log(e.target)
    // console.log(e.target.value)
    // console.log(e.target.checked)
  }

  if (user) {
    return (
      <div>
        <Form>
          <Input onChange={(e) => setSearch(e.target.value)} placeholder="search with id..." type='text' ></Input>
          <Button onClick={() => handleSearch()}><i className='ui search icon'></i></Button>
          <Button className="ui logout icon ui right floated clearing segment" onClick={() => handleLogout()}>Logout</Button>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                {/* <Table.HeaderCell>id</Table.HeaderCell> */}
                <Table.HeaderCell>Applicant Number</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                {/* <Table.HeaderCell>Hire Date</Table.HeaderCell> */}
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>CV</Table.HeaderCell>
                {/* <Table.HeaderCell>Active</Table.HeaderCell> */}
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Add</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                APIData.map((data) => {
                  // console.log(APIData)
                  return (
                    <Table.Row>
                      {/* <Table.Cell>{data.id}</Table.Cell> */}
                      <Table.Cell><Input type='text' defaultValue={data.applicant_number} onChange={(e) => (setApplicantNumber(e.target.value))}></Input></Table.Cell>
                      <Table.Cell><Input type='text' defaultValue={data.name} onChange={(e) => (setName(e.target.value))}></Input></Table.Cell>
                      <Table.Cell><Input type='text' defaultValue={data.email} onChange={(e) => (setEmail(e.target.value))} /></Table.Cell>
                      <Table.Cell><Input type='text' defaultValue={data.phone} onChange={(e) => (setPhone(e.target.value))} /></Table.Cell>
                      {/* <Table.Cell>{new Date(data.created).toDateString()}</Table.Cell> */}
                      {/* <Table.Cell><input type='checkbox' value={data.active} onChange={(e)=>handleActiveChange(e)}/></Table.Cell> */}
                      <Table.Cell>
                        {/* <Button as="label" type="button" htmlFor="file" data-tooltip="Upload CV"><i className='ui upload icon'></i></Button> */}
                        <Button data-tooltip="Download CV" onClick={() => handleDownload(data)} type='button' as="label"><i className="ui download icon"></i></Button>
                        <Input type="file" hidden onChange={(e) => (setCvStart(e.target.files[0]))} id="file"></Input>
                      </Table.Cell>
                      <Table.Cell>
                        <Button onClick={(e) => handleUpdate(data)}><i className="ui refresh icon"></i>Update</Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button onClick={(e) => handleAdd(data)}><i className="ui plus icon"></i>Add</Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button onClick={(e) => handleDelete(data)}><i className="ui minus icon"></i>Delete</Button>
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
  } else {
    return (
      // <div>
      //   <Form className="create-form">
      //     <Form.Group>
      //       <Form.Field>
      //         <label>Username</label>
      //         <Input onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
      //       </Form.Field>
      //       <br/>
      //         <Form.Field>
      //           <label>Password</label>
      //           <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} type='password' />
      //         </Form.Field>
      //         <Form.Field>
      //           <Button type='submit' onClick={() => handleLogin()}>Login</Button>
      //         </Form.Field>
      //     </Form.Group>
      //   </Form>

      // </div>

      <div className="page-login">
        <div className="ui centered grid container">
          <div className="nine wide column">
            <div className="ui icon warning message">
              <i className="lock icon"></i>
              <div className="content">
                <div className="header">
                  Login
                </div>
               
              </div>
            </div>
            <div className="ui fluid card">
              <div className="content">
                <Form className="ui form" method="POST">
                  <div className="field">
                    <label>User</label>
                    <Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="User" />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                  </div>
                  <Button type='submit' onClick={() => handleLogin()} className="ui primary labeled icon button">
                    <i className="unlock alternate icon"></i>
                    Login
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
