import { Button, Input, Layout, Space, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnType, ColumnsType } from "antd/es/table";
import Head from "next/head";
import { useEffect, useState } from "react";
import MainHeader from "~/components/header/mainheader";
const { Content } = Layout;
import { api } from "~/utils/api";
import { v4 as uuid } from 'uuid';
import moment from "moment";
import { SearchOutlined } from '@ant-design/icons';
import router from "next/router";

export default function Home() {
  const getData = api.object.getObjects.useQuery();
  const [tableData, setTableData] = useState<AnyObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [filtered, setFiltered] = useState<boolean>(false);
  const utilsForSearch = api.useUtils();

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


        }

        setTableData(oldArray => [...oldArray, tmp]);

      }

    }


  }

  useEffect(() => {
    setData();

  }, [getData.data]);

  const handleSearch = async (column: string) => {
    setFiltered(true);
    setLoading(true)
    if (column == "name") {
      await utilsForSearch.object.searchByName.fetch({ value: searchText }).then(
        (result) => {
          if (result) {
            setTableData([]);
            for (const el of result) {

              const tmp: AnyObject = {
                ...el,
                key: uuid(),

              }
           
              setTableData(oldArray => [...oldArray, tmp]);

            }
          }

          setLoading(false);
        }).catch((error) => console.log(error));
    } else if (column == "address") {
      await utilsForSearch.object.searchByAddress.fetch({ value: searchText }).then(
        (result) => {
          if (result) {
            setTableData([]);
            for (const el of result) {

              const tmp: AnyObject = {
                ...el,
                key: uuid(),

              }
           
              setTableData(oldArray => [...oldArray, tmp]);

            }
          }

          setLoading(false);
        }).catch((error) => console.log(error));
    }
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
    setFiltered(false);
    setData();
  };

  const getColumnSearchProps = (dataIndex: string): ColumnType<AnyObject> => ({
    filterDropdown: ({ clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={`Поиск`}
          onPressEnter={() => handleSearch(dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            onClick={() => handleSearch(dataIndex)}
          >
            Поиск
          </Button>
          <Button
            size="small"
            style={{ width: 90 }}
            onClick={() => clearFilters && handleReset(clearFilters)}
          >
            Очистить
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),

    filterIcon: () => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
  })
  
  const columns: ColumnsType<AnyObject> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',

    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),

    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),

    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',

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
            <h1 className="text-center">Таблица объектов</h1>
            <Button type="primary" onClick={()=>router.push("/")}>Добавить запись</Button>
            <Table
              bordered
              className="mt-1"
              columns={columns}
              dataSource={tableData}
              loading={loading}
              expandable={{
                expandedRowRender: (record, _) => (
                  expandedSecurity(record)
                ), defaultExpandedRowKeys: ['0']
              }} 
            />
           
          </Content>
        </Layout>
      </main>
    </>
  );
}

function expandedSecurity(record_data: AnyObject) {
  const expandedData: AnyObject[] = [];
  for (const el of record_data.timetable) {

    const tmp: AnyObject = {
      id: el.security.id,
      key: uuid(),
      FIO: el.security.FIO,
      rank: el.security.rank.rankName,
      phone: el.security.phone,
      


    }

    expandedData.push(tmp);
  }

  const expandedEquipmentData: AnyObject[] = [];
  for (const el of record_data.equipment) {

    const tmp: AnyObject = {
      id: el.equipment.id,
      key: uuid(),
      type: el.equipment.type,
      placement: el.placement,
      status: el.status,
      checkData: el.checkData
    

    }

    expandedEquipmentData.push(tmp);
  }
  const columns: ColumnsType<AnyObject> = [
    {
      title: 'Охранники',
      children: [
        {
          title: "id",
          dataIndex: "id",
          key: "id"
        },
        {
          title: 'ФИО',
          dataIndex: 'FIO',
          key: 'FIO',
        },
        {
          title: 'Разряд',
          dataIndex: 'rank',
          key: 'rank',
        },
        {
          title: 'Телефон',
          dataIndex: 'phone',
          key: 'phone',
        },
        
      ]
    }

  ];
  const columnsEquipment: ColumnsType<AnyObject> = [
    {
      title: 'Оборудование',
      children: [
        {
          title: "id",
          dataIndex: "id",
          key: "id"
        },
        {
          title: 'Тип',
          dataIndex: 'type',
          key: 'type',
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
          title: 'Дата проверки',
          dataIndex: 'checkData',
          key: 'checkData',
          render: (value:string)=>(moment(value).format("DD.MM.YY")),
          
        },
       
        
      ]
    }

  ];
  return (
    <>
      <div>
        <Table bordered columns={columns} dataSource={expandedData} pagination={false} />
        <Table bordered columns={columnsEquipment} dataSource={expandedEquipmentData} pagination={false} />
      </div>
    </>
  )
}