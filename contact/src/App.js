import React from 'react';
import List from "./List"
import axios from "axios"

import { Container, Row, Col, Badge, InputGroup, InputGroupAddon, Input, Button } from "reactstrap";

const App = () => {
  const [check, setcheck] = React.useState("False")
  const [name, setname] = React.useState("")
  const [num, setnum] = React.useState("")
  const [list, setlist] = React.useState([])
  const [count, setcount] = React.useState(1)
  const fetch = () => {
    axios.get("http://localhost:3001/con").then(res => {
      setlist(res.data);
    });
  }

  React.useEffect(fetch, []);

  const add = (name, num) => {
    axios.post("http://localhost:3001/add", { name: name, phone: num })
      .then(success => {
        fetch();
        setname("")
        setnum("")
      }).catch(err => { console.log(err) })
  }

  const Delete = (id) => {

    axios.delete("http://localhost:3001/del/" + id).then(success => {
      if (success.status === 200 && success.statusText === "OK") {
        setlist(list.filter(i => i.id !== id));
        fetch();
      }
    }).catch(err => console.log(err))
  };

  const upd = (name, num, id) => {
    axios.put("http://localhost:3001/update/" + id, { name: name, phone: num })
      .then(success => {
        fetch();
        setname("")
        setnum("")
      }).catch(err => console.log(err))
  };


  return (
    <Container>
      <Row>
        <Col xs="6">
          <h1><Badge color="secondary">Contact Form</Badge></h1>
          <Col xs="auto">
            <InputGroup>
              <InputGroupAddon addonType="prepend">Contact Name:</InputGroupAddon>
              <Input placeholder="For.eg:Ria" onChange={e => setname(e.target.value)}
                value={name} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Phone Number:</InputGroupAddon>
              <Input placeholder="For.eg:9820938902" min={0} max={9999999999} type="number" step="1" onChange={e => setnum(e.target.value)}
                value={num} />
            </InputGroup>
            <Button color="primary" onClick={() => {
              add(name, num);

            }}>Add</Button>{"  "}
            {
              count % 2 !== 0 ? <Button color="primary" onClick={() => {
                setcount(count + 1)
                setcheck("true")
              }}>Show list</Button> : <Button color="primary" onClick={() => {
                setcount(count + 1)
                setcheck("false")
              }}>Hide list</Button>
            }

            {
              check === 'true' ? (<List list={list} Delete={Delete} upd={upd} />) : null
            }
          </Col>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
