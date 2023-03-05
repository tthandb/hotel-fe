import LayoutWithSidebar from '../components/layouts/LayoutWithSidebar';
import { ReactElement } from 'react';
import { getHotelInfo } from '../apis';
import { Card, Descriptions, Typography } from 'antd';
import { NextPageWithLayout } from './_app';

const { Title } = Typography;

const Home: NextPageWithLayout = ({ info }: any) => {
  return (
    <Card>
      {info.map((e: any, i: number) => (
        <Descriptions title={<Title level={2}>Thông tin khách sạn</Title>} key={i}>
          <Descriptions.Item label="Tên khách sạn">{e?.hotel_name}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{e?.address}</Descriptions.Item>
          <Descriptions.Item label="Thành phố"> {e?.city}</Descriptions.Item>
          <Descriptions.Item label="Email">{e?.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại"> {e?.phone} </Descriptions.Item>
        </Descriptions>
      ))}

    </Card>
  )
};

export async function getStaticProps() {
  const info = await getHotelInfo(1);
  return {
    props: {
      info,
    },
  }
}

Home.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default Home;
