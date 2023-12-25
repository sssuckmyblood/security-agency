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
import { ColumnFilterItem } from "antd/es/table/interface";

export default function Equipment() {
    const getData = api.equipment.getEquipment.useQuery();
    const [tableData, setTableData] = useState<AnyObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filterData, setFilterData] = useState<ColumnFilterItem[]>([])

    const setData = () => {
        if (!getData.isLoading) {
            setLoading(false)
        }

        if (getData.data) {
            setTableData([]);
            setFilterData([])

            for (const el of getData.data) {
                for (const ob of el.object) {
                const tmp: AnyObject = {
                    ...el,
                    key: uuid(),
                    object: ob.object.name,
                    placement: ob.placement,
                    status: ob.status,
                    checkDate: ob.checkData

                  }
                  
                  setTableData(oldArray => [...oldArray, tmp]);
                }
                const tmpFilter: ColumnFilterItem = {
                    text: el.type,
                    value: el.type
          
                  }
                  setFilterData(oldArray => [...oldArray, tmpFilter]);
             
            }

        }


    }

    useEffect(() => {
        setData();
    }, [getData.data]);

    const columns: ColumnsType<AnyObject> = [
        
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
            filters: filterData,
            onFilter: (value, record) => record.type.startsWith(value),
            filterSearch: true, 

        },
        {
            title: 'Объект',
            dataIndex: 'object',
            key: 'object',
           
        },
        {
            title: 'Место установки',
            dataIndex: 'placement',
            key: 'placement',
           
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
           
        },
        {
            title: 'Дата последней проверки',
            dataIndex: 'checkDate',
            key: 'checkDate',
            render: (value:string)=>(moment(value).format("DD.MM.YY")),
           
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
                    <h1 className="text-center">Таблица проишествий</h1>
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

