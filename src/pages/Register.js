import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';

const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState("false");


  const registerUser = (e) => {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        mobileNo
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.error !== "") {
          Swal.fire({
            title: 'Error!',
            text: `${data.error}`,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        } else if (data.message ===  "User has been registered successfully. Please check your email for confirmation."){
          Swal.fire({
            title: 'Success!',
            text: `${data.message}`,
            icon: 'success',
            confirmButtonText: 'Close'
          })
        }

      })
  }


  useEffect(() => {
    if (firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [confirmPassword, email, firstName, lastName, mobileNo, password])

  return (
    <>
      <h3 className='my-3 text-center'>Register</h3>
      <Card className='p-5'>
        <Form onSubmit={e => registerUser(e)}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  required
                  value={email}
                  onChange={e =>
                    setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Number"
                  required
                  value={mobileNo}
                  onChange={e => setMobileNo(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password" placeholder="Enter Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Button id="btn-main" type="submit" disabled={!isActive}>
            Submit
          </Button>

        </Form>
      </Card>
    </>
  )
}

export default Register