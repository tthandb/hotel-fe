import Link from 'next/link';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: '',
    label: <a>Reservation</a>,
    children: [
      {
        key: '2',
        icon: '',
        label: <Link href="/reservations">All reservations</Link>,
      },
      {
        key: '3',
        icon: '',
        label: <Link href="/reservations/0">New reservations</Link>,
      },
    ],
  },
  {
    key: '4',
    icon: '',
    label: 'Front desk',
    children: [
      {
        key: '5',
        icon: '',
        label: <Link href="/arrivals">Arrivals</Link>,
      },
      {
        key: '6',
        icon: '',
        label: <Link href="/in-house">In-house guests</Link>,
      },
      {
        key: '7',
        icon: '',
        label: <Link href="/maintenance">Maintenance</Link>,
      },
    ],
  },
  {
    key: '8',
    icon: '',
    label: 'Payment',
    children: [
      {
        key: '9',
        icon: '',
        label: <Link href="/billing">Billing</Link>,
      },
    ],
  },
  {
    key: '10',
    icon: '',
    label: 'Reports',
    children: [
      {
        key: '11',
        icon: '',
        label: <Link href="/housekeeping">Housekeeping Report</Link>,
      },
      {
        key: '12',
        icon: '',
        label: <Link href="/house-status">House status</Link>,
      },
    ],
  },
];
export default function Navigation() {
  return (
    <>
      <Sider>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </>
  );
}

