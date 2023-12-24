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
import { ColumnFilterItem, SorterResult } from "antd/es/table/interface";
import router from "next/router";

export default function Security() {
    const getData = api.security.getSecurity.useQuery();
    const [tableData, setTableData] = useState<AnyObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>("");
    const [filtered, setFiltered] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<ColumnFilterItem[]>([])
    const utilsForSearch = api.useUtils();
    

    const setData = () => {
        if (!getData.isLoading) {
            setLoading(false)
        }

        if (getData.data) {
            setTableData([]);
            setFilterData([]);
            for (const el of getData.data) {

                const tmp: AnyObject = {
                    ...el,
                    key: uuid(),
                    rank: el.rank.rankName

                }
                const tmpFilter: ColumnFilterItem = {
                    text: el.rank.rankName,
                    value: el.rank.rankName
          
                  }
                setTableData(oldArray => [...oldArray, tmp]);
                setFilterData(oldArray => [...oldArray, tmpFilter]);

            }

        }


    }

    useEffect(() => {
        setData();
    }, [getData.data]);

    const handleSearch = async (column: string) => {
        setFiltered(true);
        setLoading(true);
        if (column == "FIO") {
          await utilsForSearch.security.searchByFIO.fetch({ value: searchText }).then(
            (result) => {
              if (result) {
                setFilterData([]);
                setTableData([]);
                for (const el of result) {
    
                  const tmp: AnyObject = {
                    ...el,
                    key: uuid(),
                    rank: el.rank.rankName
    
                  }
               
                  const tmpFilter: ColumnFilterItem = {
                    text: el.rank.rankName,
                    value: el.rank.rankName
          
                  }
                setTableData(oldArray => [...oldArray, tmp]);
                setFilterData(oldArray => [...oldArray, tmpFilter]);
    
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
            title: 'ФИО',
            dataIndex: 'FIO',
            key: 'FIO',
            ...getColumnSearchProps('FIO'),
            

        },
        {
            title: 'Возраст',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,

        },
        {
            title: 'Разряд',
            dataIndex: 'rank',
            key: 'rank',
            filters: filterData,
            onFilter: (value, record) => record.rank.startsWith(value),
            filterSearch: true,

        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',

        },
        {
            title: 'Дата устройства',
            dataIndex: 'employmentDate',
            key: 'employmentDate',
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
                    <h1 className="text-center">Таблица охранников</h1>
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

