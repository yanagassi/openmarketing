import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Card,
  CardBody,
  Alert,
} from "reactstrap";
import loginModel from "../../models/login";
import { ApiContext } from "../../context/ApiContext";
import comum from "../../helpers/comum";

const LoginScreen = () => {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin123");
  const { isLoggedIn, login } = useContext(ApiContext);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginModel.Login(email, password);
    if (data.status) {
      login(data.token);
      comum.Redirect("/");
      setError(null);
    } else {
      setError(data.msg);
    }
  };

  return (
    <Container>
      <Col md={{ size: 6, offset: 3 }} style={{ marginTop: 50 }}>
        <Card>
          <CardBody>
            <h3 className="text-center">ENTRAR</h3>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Senha</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              {error != null ? <Alert color="danger">{error}</Alert> : null}
              <Button color="primary" type="submit">
                Entrar
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Container>
  );
};

export default LoginScreen;
