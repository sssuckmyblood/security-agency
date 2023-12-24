import { Button, Layout, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import Head from "next/head";
import { useEffect, useState } from "react";
import MainHeader from "~/components/header/mainheader";
const { Content } = Layout;
import { api } from "~/utils/api";
import { v4 as uuid } from 'uuid';
import moment from "moment";
import router from "next/router";

export default function Timetable() {
    const getData = api.timetable.getTimetable.useQuery();
    const [tableData, setTableData] = useState<AnyObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const setData = () => {
        if (!getData.isLoading) {
            setLoading(false)
        }

        if (getData.data) {
            setTableData([]);

            for (const el of getData.data) {

                const tmp: AnyObject = {
                    ...el,
                    key: uuid(),
                    securityFIO: el.security.FIO,
                    securityPhone: el.security.phone,
                    objectName: el.object.name,
                    objectAddress: el.object.address

                }

                setTableData(oldArray => [...oldArray, tmp]);

            }

        }


    }

    useEffect(() => {
        setData();
    }, [getData.data]);

    const columns: ColumnsType<AnyObject> = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'ФИО охранника',
            dataIndex: 'securityFIO',
            key: 'securityFIO',

        },
        {
            title: 'Телефон охранника',
            dataIndex: 'securityPhone',
            key: 'securityPhone',

        },
        {
            title: 'Название объекта',
            dataIndex: 'objectName',
            key: 'objectName',

        },
        {
            title: 'Адрес объекта',
            dataIndex: 'objectAddress',
            key: 'objectAddress',

        },
        {
            title: 'Дата начала работы',
            dataIndex: 'startWorkDate',
            key: 'endWorkDate',
            render: (value:string)=>(moment(value).format("DD.MM.YY")),

        },
        {
            title: 'Смена ч.',
            dataIndex: 'countHour',
            key: 'countHour',


        },


    ];
    return (
        <>
            <Head>
                <title>База данных</title>
                
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className=" flex min-h-screen flex-col items-center justify-center">
                <Layout className="h-full w-full pl-2 pr-2  rounded-md block-bg text-slate">
                    <MainHeader />
                    <Content className="mt-2 h-max inline-block content">
                    <h1 className="text-center">Расписание работы охранников</h1>
                    <Button type="primary" onClick={()=>router.push("/")}>Добавить запись</Button>
                        <Table
                            bordered
                            className="mt-1"
                            columns={columns}
                            dataSource={tableData}
                            loading={loading}
                        >
                        </Table>
                    </Content>
                </Layout>
            </main>
        </>
    );
}

