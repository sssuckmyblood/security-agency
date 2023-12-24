import { Layout, Table } from "antd";
import Head from "next/head";
import { useEffect, useState } from "react";
import MainHeader from "~/components/header/mainheader";
import { api } from "~/utils/api";
const { Content } = Layout;
import { v4 as uuid } from 'uuid';
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend,  Line, LineChart } from 'recharts';
export default function Report() {
    const getData = api.object.getObjects.useQuery();
    const [loading, setLoading] = useState<boolean>(true);
    const [tableBySecurityData, setTableBySecurityData] = useState<AnyObject[]>([]);
    const [tableByEquipmentsData, setTableByEquipmentsData] = useState<AnyObject[]>([]);
    const [tableByIncidentData, setTableByIncidentData] = useState<AnyObject[]>([]);
    const setData = () => {
        if (!getData.isLoading) {
          setLoading(false)
        }
        if (getData.data) {
        setTableBySecurityData([]);
        setTableByEquipmentsData([]);
        setTableByIncidentData([]);
          for (const el of getData.data) {
    
            const tmpS: AnyObject = {
              id: el.id,
              name: el.name,
              key: uuid(),
              count: el.timetable.length
    
    
            }

            const tmpE: AnyObject = {
                id: el.id,
                name: el.name,
                key: uuid(),
                count: el.equipment.length
      
      
              }

              const tmpI: AnyObject = {
                id: el.id,
                name: el.name,
                key: uuid(),
                count: el.incident.length
      
      
              }
    
            setTableBySecurityData(oldArray => [...oldArray, tmpS]);
            setTableByEquipmentsData(oldArray => [...oldArray, tmpE]);
            setTableByIncidentData(oldArray => [...oldArray, tmpI]);
    
          }
    
        }
    
    
      }
    
      useEffect(() => {
        setData();
    
      }, [getData.data]);

      const columnsSecurity: ColumnsType<AnyObject> = [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
    
        },
        {
          title: 'Название объекта',
          dataIndex: 'name',
          key: 'name',
         
    
        },
        {
            title: 'Количество охранников',
            dataIndex: 'count',
            key: 'count',
        
          },
       
    
    
      ];
      const columnsEquipment: ColumnsType<AnyObject> = [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
    
        },
        {
          title: 'Название объекта',
          dataIndex: 'name',
          key: 'name',
         
    
        },
        {
            title: 'Количество оборудования',
            dataIndex: 'count',
            key: 'count',
        
          },
       
    
    
      ];
      const columnsIncident: ColumnsType<AnyObject> = [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
    
        },
        {
          title: 'Название объекта',
          dataIndex: 'name',
          key: 'name',
         
    
        },
        {
            title: 'Количество инцидентов',
            dataIndex: 'count',
            key: 'count',
        
          },
       
    
    
      ];
        return(
            <>
      <Head>
        <title>База данных</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center">
        <Layout className="h-full w-full pl-2 pr-2  rounded-md block-bg text-slate">
          <MainHeader />
          <Content className="mt-2 h-max inline-block content">
           <h1 className="text-center" >Отчеты по состоянию объектов охраны</h1>
           <h4 className="text-center">По этим данным можно выявлять зависимость между количеством охранников, оборудования  и проишествий</h4>
            <Table
              bordered
              className="mt-1"
              columns={columnsSecurity}
              dataSource={tableBySecurityData}
       
             
            />
             <div className="flex justify-center bg-slate-100 pt-2">
            <BarChart width={600} height={500} data={tableBySecurityData}>
              <XAxis dataKey="name" />
              <YAxis dataKey="count" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Количество охранников" fill="#82ca9d" />


            </BarChart>
          </div>
            <Table
              bordered
              className="mt-10"
              columns={columnsEquipment}
              dataSource={tableByEquipmentsData}
       
             
            />
               <div className="flex justify-center bg-slate-100 pt-2">
            <BarChart width={600} height={500} data={tableByEquipmentsData}>
              <XAxis dataKey="name" />
              <YAxis dataKey="count" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Количество оборудования" fill="#ffc658" />


            </BarChart>
          </div>
            <Table
              bordered
              className="mt-10"
              columns={columnsIncident}
              dataSource={tableByIncidentData}
       
             
            />
              <div className="flex justify-center bg-slate-100 pt-2">
            <LineChart
              width={1700}
              height={300}
              data={tableByIncidentData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" name="Количество проишествий" dataKey="count" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={3} />

            </LineChart>

          </div>
           
          </Content>
        </Layout>
      </main>
    </>
        )

}

