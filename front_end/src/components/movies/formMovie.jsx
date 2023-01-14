import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';

export default function FormMovie (props) {
    // mode is used to know if the modal is going to be used to add a movie or to edit one
    // mode = 0 -> Add movie
    // mode = 1 -> Edit movie
    const { mode, open, onOk, onCancel, movie } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        // If the modal is going to be used to edit a movie, the form is filled with the movie data
        if (mode === 1) {
            form.setFieldsValue(movie);
        }
    }, [movie, mode, form]);

    const onFinish = (values) => {
        onOk(values);
    }

    return (
        <Modal
        title={mode === 0 ? "Agregar Película" : "Editar Película"}
        open={open}
        okButtonProps={{style:{display:"none"}}}
        onCancel={onCancel}
        >
            <Form
            form={form}
            size="large"
            onFinish={onFinish}
            onFinishFailed={(e)=>{form.scrollToField(e.errorFields[0].name)}}>
                <Form.Item
                label="Título"
                name="title"
                rules={[{ required: true, message: 'Por favor ingrese el título de la película' }]}
                >
                    <Input
                    placeholder="Título"
                    maxLength={40} />
                </Form.Item>

                <Form.Item
                label="Descripción"
                name="description"
                rules={[{ required: true, message: 'Por favor ingrese la descripción de la película' }]}
                >
                    <Input.TextArea
                    placeholder="Descripción"
                    maxLength={100}
                    autoSize={{minRows: 3, maxRows: 5}}/>
                </Form.Item>

                <Form.Item
                label="URL"
                name="url"
                >
                    <Input
                    placeholder="URL"/>
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    {(mode === 0 ? "Agregar" : "Editar") + " Película"}
                </Button>
            </Form>
        </Modal>
    )
}