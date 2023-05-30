import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function Create() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [department, setDepartment] = useState('')
    const [email, setEmail] = useState('')
    const [active, setActive] = useState(false);

    const postData = () => {
        console.log(first_name);
        console.log(last_name);
        console.log(active);

        axios.post('http://localhost:8000/add/',
            {
                first_name,
                last_name,
                department,
                email,
                active

            }
        )

}           
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Deparment</label>
                    <input placeholder='Department' onChange={(e) => setDepartment(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                <Checkbox label='Active' onChange={(e) => setActive(!active)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
// export default function Create(){
    
    
//     return(
//     <div><Form className='create-form'>
//         <Form.Field>
//             <label>First Name</label>
//             <input placeholder='First Name' />
//         </Form.Field>
//         <Form.Field>
//             <label>Last Name</label>
//             <input placeholder='Last Name' />
//         </Form.Field>
//         <Form.Field>
//             <Checkbox label='I agree to the Terms and Conditions' />
//         </Form.Field>
//         <Button type='submit'>Submit</Button>
//     </Form>
//     </div>)
// }

