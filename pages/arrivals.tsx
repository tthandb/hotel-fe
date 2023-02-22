import React, { ReactElement, useState } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import { Button, DatePicker, DatePickerProps, Select, Space, Table, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { getArrivalsNew, updateRoomCheckin } from '../apis';
import PendingDeparturesTable from '../components/PendingDeparturesTable';

const { Option } = Select;

const today = dayjs().format('YYYY-MM-DD');

interface DataType {
  key: string;
  reservation_id: number;
  res_room_id: number
  first_name: string;
  selectedRoom: string;
  last_name: string;
  room_num: string;
  check_in_date: string;
  check_out_date: string;
  type: string;
  active: number;
}

let columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Check in date',
    dataIndex: 'check_in_date',
    key: 'check_in_date',
  },
  {
    title: 'Check-out date',
    dataIndex: 'check_out_date',
    key: 'check_out_date',
  },
  {
    title: 'Room Type',
    key: 'type',
    dataIndex: 'type',
    render: (_, { type }) => (
      <Tag color="geekblue">
        {type?.toUpperCase()}
      </Tag>
    ),
  },
];

const Arrivals = () => {
  const [criteria, setCriteria] = useState({
    firstname: '',
    lastname: '',
    sdate: '2020-10-20',
    edate: '2020-10-21',
    resRooms: [],
    reservationChosen: false,
    startDateRange: '2020-10-22',
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

  const onCheckin = async (id: number, roomId: string) => {
    const data = await updateRoomCheckin(id, roomId);
    if (data) {
      await onSubmit();
    }
  }

  columns[4] = {
    title: 'Room Number',
    key: 'room_num',
    dataIndex: 'room_num',
    render: (value: any, record: DataType) => {
      if (criteria.startDateRange !== today) return <div>Not set</div>
      if (record.room_num !== 'Not Set') return <div>{record.room_num}</div>
      return (
        <Select defaultValue={record['room_num']} onChange={value => onSelectChange(value, record)}>
          {rooms.filter((roomType: any) => roomType?.occupied === 0
            && roomType?.room_type_id === record.res_room_id,
            ).map((room: any) => (
            <Option key={room.room_id} value={room.room_id}>
          {room.room_num}{' '} {room.clean === 0 && ' (dirty)'}
            </Option>
            ))}
        </Select>
      )
    },
  };

  columns[5] = {
    key: 'checkin',
    render: (_, record) => criteria.startDateRange === today ? (
      <Button onClick={() => onCheckin(record.res_room_id, record.selectedRoom)}>
        Check In
      </Button>
    ) : 'Checked In',
  }

  const onSubmit = async () => {
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
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setCriteria({ ...criteria, startDateRange: dateString });
  };

  return (
    <Space direction="vertical">
      <Typography.Title>Arrivals</Typography.Title>
      <span><a>Pending departures</a> by room type:</span>
      {pendingDepartures.length === 0 ? ' None' : <PendingDeparturesTable dataSource={pendingDepartures} />}
      <DatePicker
        defaultValue={dayjs(criteria.startDateRange)}
        format={'YYYY-MM-DD'}
        onChange={onChange}
      />
      <Button icon={<SearchOutlined />} onClick={onSubmit}>
        Search
      </Button>
      <Table columns={columns} dataSource={arrivals} />
    </Space>
  );
};

Arrivals.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default Arrivals;
