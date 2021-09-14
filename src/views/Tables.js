import React from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // First list of Tasks
      tasks: []
    };
  }

  componentDidMount() {
    this.loadTasks();
  }

  loadTasks(){
    axios
			.get(`http://localhost:5000/task/getAll`, {}, {
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
  }


  navigateToAddPost() {
    window.open("/add-new-task", "_self");
  }

  removeTask(postname, postId) {

    if (window.confirm(`Are you sure you want to delete the Task : ${postname}`)) {
      axios
			.post(`http://localhost:5000/task/remove`, {id:postId}, {
				cachePolicy: "no-cache",
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then((res) => {
        setTimeout(function() {
          this.loadTasks();
      }.bind(this), 2000)
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
    } else {
      
    }

    
    
  }

  navigateToEditTask(postName,postId) {
     window.open(`/edit-task/${postName}/${postId}`, "_self");
  }

  render() {
    const { tasks } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="To do Items" subtitle="Task List" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Items</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3  text-right">
                <br></br>
                <Button
                  outline
                  theme="accent"
                  size="md"
                  onClick={this.navigateToAddPost}
                >
                  Add Task
                </Button>
              </CardBody>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Task Name
                      </th>
                      <th scope="col" className="border-0">
                        Status
                      </th>
                      <th scope="col" className="border-0">
                        Edit
                      </th>
                      <th scope="col" className="border-0">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, idx) => (
                      <tr>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>
                          <Button outline theme={task.status == "To Do" ? "primary" : task.status == "Complete" ? "success" : "warning"} className="mb-2 mr-1">
                          {task.status}
                          </Button>
                        </td>
                        <td>
                          <Button
                            outline
                            theme="accent"
                            size="md"
                            onClick={() => this.navigateToEditTask(task.name,task.id)}
                          >
                            <i className="material-icons">edit</i>
                          </Button>
                        </td>
                        <td>
                          <Button
                            outline
                            theme="danger"
                            size="md"
                            onClick={() => this.removeTask(task.name,task.id)}
                          >
                            <i className="material-icons">delete</i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tables;
