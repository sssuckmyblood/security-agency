import { Button, Form, Input, Layout, Spin, notification } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { api } from "~/utils/api";
import Head from "next/head";
import MainHeader from "~/components/header/mainheader";
const { Content } = Layout;

interface FormData {
    name: string,
    address: string,
    description: string,


}

export default function Create() {
    const [messageApi, contextHolder] = notification.useNotification();

    const key = 'updatable';

    const loading = () => {
        messageApi.open({
            key,
            message: 'Сохранение...',
            icon: <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        });
    };

    const createObject = api.object.create.useMutation();
    const onFinish = (values: FormData) => {
                createObject.mutate({
                    name: values.name,
                    address: values.address,
                    description: values.description
                },{
                    onSuccess: ()=> messageApi.success({
                      key,
                      message: 'Данные успешно сохранены!',
                      duration: 3,
      
                  })
                  })
    }

    return (
        <>
        {contextHolder}
        <Head>
                <title>ПАНЕЛЬ УПРАВЛЕНИЯ</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center">
                <Layout className="h-full w-full pl-2 pr-2  rounded-md bg-stone-900">
                    <MainHeader />
                    <Content className="mt-2 h-max inline-block content">
                        <div className="bg-white items-center w-[1000px] margin-0 m-auto rounded-xl">
                            <h2 className="text-center text-black">Добавить объект</h2>
                            <Form<FormData>
                                name="basic"
                                className="margin-0 m-auto ml-[30%]"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                                layout="vertical"
                            >
                                <Form.Item
                                    label="Название"
                                    name="name"
                                    rules={[{ required: true, message: 'Заполните название тренировки!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Адрес"
                                    name="address"
                                    rules={[{ required: true, message: 'Заполните адрес тренировки!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Описание"
                                    name="description"
                                    rules={[{ required: false }]}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                               

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="pb-5 mr-[20%]">
                                    <Button type="primary" htmlType="submit">
                                        Сохранить
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                </Layout>

            </main>
        </>
    )
}