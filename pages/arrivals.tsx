import React, { ReactElement, useState } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import { Button, Card, DatePicker, DatePickerProps, message, Select, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { getArrivalsNew, updateRoomCheckin } from '../apis';
import PendingDeparturesTable from '../components/PendingDeparturesTable';
import Link from 'next/link';
import { Simulate } from 'react-dom/test-utils';
import select = Simulate.select;

const { Option } = Select;

const today = dayjs().format('YYYY-MM-DD');

interface DataType {
  key: string;
  reservation_id: number;
  res_room_id: number;
  room_type_id: number;
  first_name: string;
  selectedRoom: string;
  last_name: string;
  room_num: string;
  check_in_date: string;
  check_out_date: string;
  type: string;
  active: number;
}

;

const Arrivals = () => {
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState({
    firstname: '',
    lastname: '',
    resRooms: [],
    reservationChosen: false,
    startDateRange: dayjs().format('YYYY-MM-DD'),
    chosenReservationId: '',
    arrivalsArray: [],
    roomsArray: [],
    pendingArray: [],
  })
  const [arrivals, setArrivals] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [pendingDepartures, setPendingDepartures] = useState([]);

  const onSelectChange = (value: string, record: any) => {
    const index = arrivals.findIndex((e: any) => e.res_room_id === record.res_room_id)
    let arrivalsArr = [...arrivals];
    (arrivalsArr[index] as DataType).selectedRoom = value;
    setArrivals(arrivalsArr);
  }

  const onCheckin = async (resRoomId: number, roomId: string) => {
    try {
      setLoading(true);
      const data = await updateRoomCheckin(resRoomId, roomId);
      if (data) {
        await onSubmit();
      }
    } catch (e: any) {
      message.error(e.message)
    } finally {
      setLoading(false);
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày check-in',
      dataIndex: 'check_in_date',
      key: 'check_in_date',
      sorter: {
        compare: (a, b) => dayjs(a.check_in_date).diff(dayjs(b.check_in_date)),
        multiple: 1,
      },
    },
    {
      title: 'Ngày check-out',
      dataIndex: 'check_out_date',
      key: 'check_out_date',
    },
    {
      title: 'Kiểu phòng',
      key: 'type',
      dataIndex: 'type',
      render: (_, { type }) => (
        <Tag color="geekblue">
          {type?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Số phòng',
      key: 'room_num',
      dataIndex: 'room_num',
      render: (value: any, record: DataType) => {
        console.log(record)
        if (record.room_num !== 'Not Set') return <div>{record.room_num}</div>
        return (
          <Select defaultValue={record['room_num']} onChange={value => onSelectChange(value, record)}>
            {rooms.filter((roomType: any) => roomType?.occupied == 0
              && roomType?.room_type_id === record.room_type_id,
            ).map((room: any) => (
              <Option key={room.room_id} value={room.room_id}>
                {room.room_num}{' '} {room.clean === 0 && ' (bẩn)'}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      key: 'checkin',
      render: (record) => {
        const selectedRoom: any = rooms.find((r: any) => r.room_id == record.selectedRoom);
        return (criteria.startDateRange === today && record.checked_in === 0) ? (
          <Button type="link" onClick={() => onCheckin(record.res_room_id, selectedRoom.room_id)}>
            Check-in
          </Button>
        ) : <Tag color="green"> Đã check-in </Tag>
      },
    },
  ]

  const onSubmit = async () => {
    try {
      setLoading(true);
      const data = await getArrivalsNew({
        firstname: criteria.firstname,
        lastname: criteria.lastname,
        startDateRange: criteria.startDateRange,
      }, criteria.startDateRange)
      if (data) {
        setArrivals(data.arrivals);
        setRooms(data.rooms_arrivals);
        setPendingDepartures(data.pending_departures);
      }
    } catch (e: any) {
      message.error(e.message)
    } finally {
      setLoading(false);
    }
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setCriteria({ ...criteria, startDateRange: dateString });
  };

  return (
    <Card title="Danh sách khách đến">
      <Space direction="vertical">
        <Space>
          <DatePicker
            defaultValue={dayjs(criteria.startDateRange)}
            format={'YYYY-MM-DD'}
            onChange={onChange}
          />
          <Button icon={<SearchOutlined />} onClick={onSubmit}>
            Tìm kiếm
          </Button>
        </Space>
        <Space size="large">
          <Table columns={columns} dataSource={arrivals} bordered loading={loading} rowKey="res_room_id">
            <Table.Column title="Age" dataIndex="age" key="age" />
          </Table>
          <div>
            <span><Link href="/billing">Lượng khách hàng sắp rời đi</Link> trong từng loại phòng:</span>
            {pendingDepartures.length === 0 ? ' Không có' : <PendingDeparturesTable dataSource={pendingDepartures} />}
          </div>
        </Space>
      </Space>
    </Card>
  );
};

Arrivals.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default Arrivals;
