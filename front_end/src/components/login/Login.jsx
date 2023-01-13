import React from "react";
import { Form, Layout, Typography, Input, Button, message } from "antd";
import LoginBg from "../../resources/LoginBg.jpg";

const { Footer } = Layout;
const { Title } = Typography;

export default function Login() {

  const [form] = Form.useForm();
  // Notification Api from antd
  const [messageApi, contextHolder] = message.useMessage();

  //====================================
  // Function to handle the form submit
  const onFinish = (values) => {
    if (values.email === "juana@gmail.com" && values.password === "12345") {

      // Redirect to the movies page 
      messageApi.success("Inicio de sesión exitoso",1.5)
      .then(() => {
        window.location.href = "/myMovies";
      });

    } else {
      messageApi.error("Correo o contraseña incorrectos");
    }
  };
  //====================================

  return (<>
    {contextHolder}
    <div
      style={{
        backgroundImage: `url(${LoginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Layout
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          maxWidth: "450px",
          width: "100%",
          padding: "50px",
          margin: "0 20px",
          borderRadius: "10px",
        }}
      >
        <Title style={{ textAlign: "center", color:"white" }}> Inicia Sesión </Title>
        <Form
        form={form}
        size="large"
        onFinish={onFinish}
        onFinishFailed={(e)=>{form.scrollToField(e.errorFields[0].name)}}>

          <Form.Item
          name="email"
          label="Correo"
          rules={[{required: true, message: "Por favor ingrese su correo"}]}
          >
            <Input
            type="email" 
            placeholder="Correo" />
          </Form.Item>

          <Form.Item
          name="password"
          label="Contraseña"
          rules={[{required: true, message: "Por favor ingrese su contraseña"}]}
          >
            <Input.Password
            type="password"
            placeholder="Contraseña" />
          </Form.Item>

          <Button
          type="primary"
          size="large" 
          htmlType="submit" 
          style={{ width: "100%" }}>
            Iniciar Sesión
          </Button>
        </Form>

      </Layout>
    </div>
    <Footer style={{ textAlign: "center" }}>
      Diseñado y desarrollado por Werlyn Rodriguez 2023 ©
    </Footer>
    </>);
}