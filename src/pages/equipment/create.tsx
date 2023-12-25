import { Button, DatePicker, Form, Input, Layout, Select, Space, Spin, notification } from "antd";
import Head from "next/head";
import MainHeader from "~/components/header/mainheader";
const { Content } = Layout;
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

interface ObjectType {
    objectId: number;
    placement: string;
    status: string;


}

interface FormData {
    type: string;
    object: ObjectType[];
}
interface SelectType {
    label: string,
    value: number,
}

export default function Create() {
    const [messageApi, contextHolder] = notification.useNotification();
    const getObjects = api.object.getObjects.useQuery();
    const [objectsSelect, SetObjectsSelect] = useState<SelectType[]>([]);
 
    useEffect(() => {
        if (getObjects.data) {
            SetObjectsSelect([])
            for (const el of getObjects.data) {

                const tmp: SelectType = {
                    label: el.name,
                    value: el.id,

                }
                SetObjectsSelect(oldArray => [...oldArray, tmp]);
            }
        }


    }, [getObjects.data]);
    
    const key = "loading"
    const loading = () => {
        messageApi.open({
            key,
            message: 'Сохранение...',
            icon: <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        });
    };
    const createEquipment = api.equipment.create.useMutation();
    const createObject = api.equipment.createObject.useMutation();
    const onFinish = (values: FormData) => {
             loading()

             createEquipment.mutate({
                type: values.type,
             }, {
                onSuccess: (result)=> {
                    if (values.object) {
                        const link = [];
                        for (const el of values.object) {
                            const tmp = {
                                equipmentId: result.id,
                                objectId: el.objectId,
                                placement: el.placement,
                                status:  el.status
                            }
                           link.push(tmp)
                        }  
                        createObject.mutate({
                            object: link
                        });    
                    }
                    messageApi.success({
                        key,
                        message: 'Данные успешно сохранены!',
                        duration: 3,
    
                    });
                }

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
                <Layout className="h-full w-full pl-2 pr-2  rounded-md">
                    <MainHeader />
                    <Content className="mt-2 h-max inline-block content">
                        <div className="bg-white items-center w-[1000px] margin-0 m-auto rounded-xl">
                            <h2 className="text-center text-black">Добавить Оборудование</h2>
                            <Form<FormData>
                                name="basic"
                                className="margin-0 m-auto ml-[30%]"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                initialValues={{ remember: true }}
                                autoComplete="off"
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Тип оборудования"
                                    name="type"
                                    rules={[{ required: true, message: 'Заполните тип оборудования!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.List name="object">
                                    {(fields, { add, remove }) => (
                                        <>
                                            <label>Информация о объектах</label>

                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'objectId']}
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Select
                                                           
                                                            allowClear
                                                            style={{ width: '180px' }}
                                                            placeholder="Выберите объект"
                                                            options={objectsSelect}
                                                        />
                                                    </Form.Item>
                                                   
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'placement']}
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input style={{ width: '180px' }} placeholder="Место установки" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'status']}
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Input style={{ width: '180px' }} placeholder="Статус" />
                                                    </Form.Item>
                                                    <CloseOutlined onClick={() => remove(name)} />
                                                </Space>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()} block>
                                                    + Добавить объект
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
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