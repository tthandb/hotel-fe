import Link from 'next/link';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, Typography } from 'antd';
import { useAuth } from '../context/Authentication';

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: '',
    label: <strong>Đặt phòng</strong>,
    children: [
      {
        key: '2',
        icon: '',
        label: <Link href="/reservations">Danh sách đặt phòng</Link>,
      },
      {
        key: '3',
        icon: '',
        label: <Link href="/reservations/0">Tạo thông tin đặt phòng</Link>,
      },
    ],
  },
  {
    key: '4',
    icon: '',
    label: <strong>Lễ tân</strong>,
    children: [
      {
        key: '5',
        icon: '',
        label: <Link href="/arrivals">Khách đến</Link>,
      },
      {
        key: '6',
        icon: '',
        label: <Link href="/in-house">Khách đang ở</Link>,
      },
      {
        key: '7',
        icon: '',
        label: <Link href="/maintenance">Bảo trì phòng</Link>,
      },
    ],
  },
  {
    key: '8',
    icon: '',
    label: <strong>Tài chính</strong>,
    children: [
      {
        key: '9',
        icon: '',
        label: <Link href="/billing">Hóa đơn</Link>,
      },
    ],
  },
  {
    key: '10',
    icon: '',
    label: <strong>Báo cáo</strong>,
    children: [
      {
        key: '11',
        icon: '',
        label: <Link href="/housekeeping">Báo cáo phòng ốc</Link>,
      },
      {
        key: '12',
        icon: '',
        label: <Link href="/house-status">Số liệu chung</Link>,
      },
    ],
  },
];
export default function Navigation() {
  const { logout } = useAuth();
  return (
    <Sider width={250}>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
      <Menu theme="dark" mode="inline" items={items} />
      <Button onClick={logout} style={{ margin: 16 }} type="primary">Đăng xuất</Button>
    </Sider>
  );
}

