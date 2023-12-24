import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ConfigProvider } from "antd";
import ruRU from 'antd/locale/ru_RU';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
       <ConfigProvider locale={ruRU}>
      <Component {...pageProps} />
      </ConfigProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
