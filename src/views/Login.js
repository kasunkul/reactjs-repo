import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from '../utils/auth';
import { Container, Row, Col } from "shards-react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput } from "shards-react";
import "react-quill/dist/quill.snow.css";
import "../assets/quill.css";



function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:5000/auth/login', { email: username.value, password: password.value })
    .then(response => {
      setLoading(false);
      setUserSession(response.data.access_token, response.data.user.data);
      props.history.push('/task-list');
    }).catch(error => {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    });
  }
 
  return (

<Container fluid className="main-content-container px-4 pb-4">
     {/* Page Header */}
     <Row noGutters className="page-header py-4">
    </Row>
     <Row>
      {/* Editor */}
      <Col lg="9" md="12">
        <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <h4 className="mb-0 text-center">Login</h4>
        <span className="text-muted d-block mb-2">Email*</span>
        <FormInput size="lg" className="mb-3" {...username} placeholder="Email" />
        <span className="text-muted d-block mb-2">Password*</span>
        <FormInput size="lg" className="mb-3" {...password} placeholder="Password" />
        <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />

        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      </Form>
    </CardBody>
  </Card>
       </Col>

    </Row>
       </Container>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;
