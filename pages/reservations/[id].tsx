import React, { ReactElement } from 'react';
import ReservationForm from '../../components/ReservationForm';
import { Button, Form, Typography } from 'antd';
import InformationForm from '../../components/InformationForm';
import { getReservation, getRoomTypes, updateReservation } from '../../apis';
import LayoutWithSidebar from '../../components/layouts/LayoutWithSidebar';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const { Title } = Typography;


interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const ReservationFormPage = ({ roomTypes, formValues, isUpdate, customerId }: any) => {
  if (isUpdate) {
    formValues.dateRange = formValues.dateRange.map((e: string) => dayjs(e));
  }

  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: any) => {
    const payload = {
      address: values.address,
      adults: values.adults,
      city: values.city,
      country: values.country,
      arrivaldate: dayjs(values.dateRange[0]).format('YYYY-MM-DD'),
      departuredate: dayjs(values.dateRange[1]).format('YYYY-MM-DD'),
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      reservation_id: customerId,
      customerId: formValues.customerId,
      phone: values.phone,
      roomtype: values.roomtype,
      resRoomId: values.resRoomId,
      comments: values.comments,
      rate: values.rate,
      user_id: 1,
    }
    try {
      const data = await updateReservation(payload);
      if (data) {
        router.push('/reservations');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Title>Reservation Form</Title>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={formValues}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <ReservationForm roomTypes={roomTypes} />
        <InformationForm />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const isUpdate = id != 0;

  const roomTypes = await getRoomTypes();
  let formValues;
  if (isUpdate) {
    const reservation = await getReservation(id);
    if (reservation) {
      formValues = {
        nights: reservation.resRooms[0]?.check_out_date && dayjs(reservation.resRooms[0].check_out_date).diff(reservation.resRooms[0].check_in_date, 'day'),
        roomTypes: [],
        creditCard: '',
        expirationDate: '',
        res_comments: '',
        room_comments: '',
        reservationSuccess: false,
        newReservationId: '',

        numRooms: 1,
        customerId: reservation.resCust[0].customer_id,
        resRoomId: reservation.resRooms[0].res_room_id,
        departuredate: reservation.resRooms[0].check_out_date,
        arrivaldate: reservation.resRooms[0].check_in_date,
        dateRange: [reservation.resRooms[0].check_in_date, reservation.resRooms[0].check_out_date],
        adults: reservation.resRooms[0].adults,
        roomtype: reservation.resRooms[0].room_type_id,
        rate: reservation.resRooms[0].rate,
        roomNumber: reservation.resRooms[0].room_num,

        active: reservation.resCust[0].active,
        firstname: reservation.resCust[0].first_name,
        lastname: reservation.resCust[0].last_name,
        address: reservation.resCust[0].address,
        city: reservation.resCust[0].city,
        country: reservation.resCust[0].country,
        email: reservation.resCust[0].email,
        phone: reservation.resCust[0].phone,
        comments: reservation.resRooms[0].comments,
        checkedIn: reservation.resRooms[0].checked_in,
      }
    }
  } else {
    formValues = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      departuredate: '10-12-2020',
      arrivaldate: '10-12-2021',
      nights: '',
      adults: 1,
      numRooms: 1,
      roomTypes: [],
      roomtype: '',
      rate: '',
      creditCard: '',
      expirationDate: '',
      res_comments: '',
      room_comments: '',
      reservationSuccess: false,
      newReservationId: '',
    }
  }

  return {
    props: {
      roomTypes,
      formValues,
      isUpdate,
      customerId: id,
    },
  }
}

ReservationFormPage.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default ReservationFormPage;
