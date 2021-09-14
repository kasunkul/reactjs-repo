import React from "react";
import { Container, Row, Col, Card, CardBody, Form, FormInput, Button, FormSelect } from "shards-react";
import axios from "axios";
import PageTitle from "../components/common/PageTitle";


class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: '', 
      selectValue:'In Progress' 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let thePath = window.location.pathname;
    const getLastItem = thePath.substring(thePath.lastIndexOf('/') + 1);
    axios
    .post(`http://localhost:5000/task/getTaskDetail`, {id: getLastItem}, {
      cachePolicy: "no-cache",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      const { data } = res;
      this.setState({value: data.name});
      this.setState({selectValue: data.status});
    })
    .catch((err) => {
      if (err.response) {
        console.log("request", err.response);
      } else if (err.request) {
        console.log("request", err.message);
      } else {
        console.log("err", err.message);
      }
    });

   
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSelectChange(event) {
    this.setState({ selectValue: event.target.value });
  }

  handleSubmit(event) {
    let thePath = window.location.pathname;
    const getLastItem = thePath.substring(thePath.lastIndexOf('/') + 1);
    axios
    .post(`http://localhost:5000/task/update`, {name:this.state.value, id: getLastItem, status: this.state.selectValue}, {
      cachePolicy: "no-cache",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      const { data } = res;
      this.setState({tasks: data});
    })
    .catch((err) => {
      if (err.response) {
        console.log("request", err.response);
      } else if (err.request) {
        console.log("request", err.message);
      } else {
        console.log("err", err.message);
      }
    });
    setTimeout(function() {
        window.open("/task-list", "_self");
    }.bind(this), 2000)
    event.preventDefault();
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
    <PageTitle sm="4" title="Edit Task" subtitle="Task List" className="text-sm-left" />
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="12" md="12">
      <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post" onSubmit={this.handleSubmit}>
            <FormInput size="lg" className="mb-3" placeholder="Task Name" value={this.state.value} onChange={this.handleChange} />
            <FormSelect id="feInputState" className="mb-3" value={this.state.selectValue}  onChange={this.handleSelectChange}>
              <option value="To Do">To Do</option>
              <option value="Complete">Complete</option>
              <option selected value="In Progress">In Progress</option>
             </FormSelect>
            <br></br>
            <input type="submit" value="Submit" />
          </Form>          
        </CardBody>
      </Card>
      </Col>
    </Row>
  </Container>
    );
  }
}

export default EditPost;

