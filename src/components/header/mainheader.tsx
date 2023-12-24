import Link from "next/link";
import { Layout, Menu } from "antd";
const { Header } = Layout;


export default function MainHeader() {
    const menuItems = [
        {
            key: 'objects',
            label: (
                <Link href={"/"}>Объекты</Link>
            ),
        },
        {
            key: 'security',
            label: (
                <Link href={"/security"}>Охранники</Link>
            ),
        },
        {
            key: 'timetable',
            label: (
                <Link href={"/timetable"}>Расписание</Link>
            ),
        },
       
        {
            key: 'incident',
            label: (
                <Link href={"/incident"}>Проишествия</Link>
            ),
        },



    ];

    return (
        <>
            <Header className="flex items-center color-theme-header-bg rounded-md ">
                <div className="text-slate text-xl">
                    <Link href="/">БАЗА ДАННЫХ ЧОП</Link>
                </div>

                <Menu
                    className="text-slate text-xl leading-tight color-theme-header-bg flex md:flex md:flex-grow flex-row justify-end space-x-1 border-none"
                    mode="horizontal"
                    items={menuItems}
                >

                </Menu>
            </Header>

        </>
    )
}