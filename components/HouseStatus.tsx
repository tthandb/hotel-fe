import { useEffect, useState } from 'react';
import { Card, Col, DatePicker, DatePickerProps, Descriptions, Row, Table, Typography } from 'antd';
import { getHouseStatus } from '../apis';
import dayjs, { Dayjs } from 'dayjs';

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Bỏ không',
    dataIndex: 'vacant',
    key: 'vacant',
  },
  {
    title: 'Có khách',
    dataIndex: 'occupied',
    key: 'occupied',
  },
];

export default function HouseStatus() {
  const [date, setDate] = useState(dayjs());
  const [state, setState] = useState({
    roomsToSell: '',
    minAvailableTonight: '',
    maxOccupiedTonight: 0,
    stayovers: '',
    departuresPending: '',
    departuresActual: '',
    arrivalsPending: '',
    arrivalsActual: '',
    cleanVacant: '',
    cleanOccupied: '',
    dirtyVacant: '',
    dirtyOccupied: '',
  });
  const [roomStatus, setRoomStatus] = useState<any>([]);

  const makeAxiosCall = async () => {
    const { reservationRooms, rooms } = await getHouseStatus(date.format('YYYY-MM-DD'));
    setState({
      roomsToSell: rooms[0].roomsToSell,
      cleanVacant: rooms[0].cleanVacant,
      cleanOccupied: rooms[0].cleanOccupied,
      dirtyVacant: rooms[0].dirtyVacant,
      dirtyOccupied: rooms[0].dirtyOccupied,
      stayovers: reservationRooms[0].stayovers,
      departuresPending: reservationRooms[0].departuresPending,
      departuresActual: reservationRooms[0].departuresActual,
      arrivalsPending: reservationRooms[0].arrivalsPending,
      arrivalsActual: reservationRooms[0].arrivalsActual,
      minAvailableTonight:
        String(Number(rooms[0].roomsToSell) -
          Number(reservationRooms[0].stayovers) -
          Number(reservationRooms[0].arrivalsPending) -
          Number(reservationRooms[0].arrivalsActual)),
      maxOccupiedTonight:
        Number(reservationRooms[0].stayovers) +
        Number(reservationRooms[0].arrivalsPending) +
        Number(reservationRooms[0].arrivalsActual),
    })
    setRoomStatus([
      {
        key: '1',
        name: 'Sạch',
        vacant: rooms[0].cleanVacant,
        occupied: rooms[0].cleanOccupied,
      },
      {
        key: '2',
        name: 'Bẩn',
        vacant: rooms[0].dirtyVacant,
        occupied: rooms[0].dirtyOccupied,
      },
    ])
  }

  const handleChange: DatePickerProps['onChange'] = (date) => {
    setDate(date as Dayjs)
  }

  useEffect(() => {
    if (date) {
      makeAxiosCall();
    }
  }, [date])
  return (
    <Card
      style={{ width: '100%' }}
      title="Số liệu chung"
      extra={<DatePicker defaultValue={date} onChange={handleChange} />}
    >
      <Row gutter={20}>
        <Col span={8}>
          <Descriptions title="Tổng số phòng" bordered>
            <Descriptions.Item span={6} label="Tổng số phòng để cho thuê">{state.roomsToSell}</Descriptions.Item>
            <Descriptions.Item span={6} label="Số phòng có sẵn tối thiểu"> {state.minAvailableTonight}</Descriptions.Item>
            <Descriptions.Item span={6} label="Số phòng đã cho thuê tối đa">  {state.maxOccupiedTonight}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={8}>
          <Descriptions title="Hoạt động" bordered>
            <Descriptions.Item span={6} label="Số lượng ở lại thêm">{state.stayovers}</Descriptions.Item>
            <Descriptions.Item span={6} label="Khách hàng sắp rời khách sạn"> {state.departuresPending}</Descriptions.Item>
            <Descriptions.Item span={6} label="Khách hàng đã rời khách sạn">  {state.departuresActual}</Descriptions.Item>
            <Descriptions.Item span={6} label="Khách hàng sắp đến khách sạn"> {state.arrivalsPending}</Descriptions.Item>
            <Descriptions.Item span={6} label="Khách hàng đã đến khách sạn">{state.arrivalsActual}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Table
            bordered
            caption={<Typography.Title level={5}>Bảng số liệu phòng</Typography.Title>}
            columns={columns}
            dataSource={roomStatus}
            pagination={false}
          />
        </Col>
      </Row>
    </Card>
  )
}
