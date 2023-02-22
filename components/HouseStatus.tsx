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
    title: 'Vacant',
    dataIndex: 'vacant',
    key: 'vacant',
  },
  {
    title: 'Occupied',
    dataIndex: 'occupied',
    key: 'occupied',
  },
];

const data = [
  {
    key: '1',
    name: 'Clean',
    vacant: 3,
    occupied: 1,
  },
  {
    key: '1',
    name: 'Dirty',
    vacant: 33,
    occupied: 1,
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
        name: 'Clean',
        vacant: rooms[0].cleanVacant,
        occupied: rooms[0].cleanOccupied,
      },
      {
        key: '2',
        name: 'Dirty',
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
      title="House status"
      extra={<DatePicker defaultValue={date} onChange={handleChange} />}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Descriptions title="Room Summary" bordered>
            <Descriptions.Item span={6} label="Total Rooms to Sell">{state.roomsToSell}</Descriptions.Item>
            <Descriptions.Item span={6} label="Min. Available Tonight"> {state.minAvailableTonight}</Descriptions.Item>
            <Descriptions.Item span={6} label="Max. Occupied Tonight">  {state.maxOccupiedTonight}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={8}>
          <Descriptions title="Activity" bordered>
            <Descriptions.Item span={6} label="Stayovers">{state.stayovers}</Descriptions.Item>
            <Descriptions.Item span={6} label="Departures Pending"> {state.departuresPending}</Descriptions.Item>
            <Descriptions.Item span={6} label="Departures Actual">  {state.departuresActual}</Descriptions.Item>
            <Descriptions.Item span={6} label="Arrivals Pending"> {state.arrivalsPending}</Descriptions.Item>
            <Descriptions.Item span={6} label="Arrivals Actual">{state.arrivalsActual}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Table
            caption={<Typography.Title level={5}>Room Status-Housekeeping</Typography.Title>}
            columns={columns}
            dataSource={roomStatus} pagination={false}
          />
        </Col>
      </Row>

    </Card>

  )
}
