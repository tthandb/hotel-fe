import axios from 'axios'

// axios.defaults.baseURL = 'https://hotel-be-production.up.railway.app'
axios.defaults.baseURL = 'http://localhost:2000'

export const getReservation = (id: string) => {
  return axios
    .all([
      axios.get('/reservation/' + id),
      axios.get('/reservationRoom/' + id),
    ])
    .then(
      axios.spread((resCust, resRooms) => ({
        resCust: resCust.data,
        resRooms: resRooms.data,
      })),
    )
}
export const createReservation = (data: any) => {
  return axios
    .post('/reservation', {
      cust: [
        data.firstname,
        data.lastname,
        data.address,
        data.city,
        data.country,
        data.email,
        data.phone,
      ],
      reserve: [data.user_id, ''],
      rooms: [
        [
          data.roomtype,
          data.arrivaldate,
          data.departuredate,
          data.adults,
          data.rate,
          data.comments,
        ],
      ],
    })
    .then(res => res)
    .catch((error) => {
      console.log(error)
    })
}
export const updateReservation = (data: any) => {
  return axios
    .put('/reservation', {
      cust: [
        data.firstname,
        data.lastname,
        data.address,
        data.city,
        data.country,
        data.email,
        data.phone,
        data.customerId,
      ],
      reserve: [data.user_id, '', data.reservation_id],
      rooms: [
        [
          data.roomtype,
          data.arrivaldate,
          data.departuredate,
          data.adults,
          data.rate,
          data.comments,
          data.resRoomId,
        ],
      ],
    })
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}
export const cancelReservation = (id: any) => {
  return axios
    .put(`/reservation/cancel/${id}`)
    .then(res => res)
    .catch(error =>
      console.log(error),
    )
}
export const getReservations = () => {
  return axios
    .get('/reservation')
    .then(res => res.data)
    .catch(error =>
      console.log(error),
    )
}
export const getSomeReservations = (data: any) => {
  const fname = data.firstname === '' ? 'undefined' : data.firstname
  const lname = data.lastname === '' ? 'undefined' : data.lastname
  const sdate = data.sdate === '' ? 'undefined' : data.sdate
  const edate = data.edate === '' ? 'undefined' : data.edate
  return axios
    .get(
      `/reservation/reservationList/${fname}/${lname}/${sdate}/${edate}`,
    )
    .then(res => res.data)
    .catch((error) =>
      console.log(error),
    )
}
export const getRoomTypes = () => {
  return axios
    .get('/roomType')
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}
export const getArrivalsNew = (data: any, date: any) => {
  const sdate =
          data.startDateRange === '' ? 'undefined' : data.startDateRange
  const fname = data.firstname === '' ? 'undefined' : data.firstname
  const lname = data.lastname === '' ? 'undefined' : data.lastname
  return axios
    .all([
      axios.get(`/reservationRoom/arrivals/${sdate}/${fname}/${lname}`),
      axios.get(`/room/arrivals/${date}`),
      axios.get(`/reservationRoom/pendingDepartures/${date}`),
    ])
    .then(
      axios.spread((arrivals, rooms_arrivals, pending_departures) => ({
        arrivals: arrivals.data,
        rooms_arrivals: rooms_arrivals.data,
        pending_departures: pending_departures.data,
      })),
    )
}
export const getArrivals = (data: any) => {
  const sdate =
          data.startDateRange === '' ? 'undefined' : data.startDateRange
  const fname = data.firstname === '' ? 'undefined' : data.firstname
  const lname = data.lastname === '' ? 'undefined' : data.lastname
  return axios
    .get(`/reservationRoom/arrivals/${sdate}/${fname}/${lname}`)
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}

export const getRoomsArrivals = (date: any) => {
  axios
    .get(`/room/arrivals/${date}`)
    .then(res => res.data)
    .catch((error) => console.log(error))
}
export const getDepartures = (data: any) => {
  const fname = data.firstname === '' ? 'undefined' : data.firstname
  const lname = data.lastname === '' ? 'undefined' : data.lastname
  const rnum = data.roomNumber === '' ? 'undefined' : data.roomNumber
  const sover = data.stayOver
  const dout = data.dueOut
  const dpart = data.checkedOut
  return axios
    .get(
      `/reservationRoom/departures/${fname}/${lname}/${rnum}/${sover}/${dout}/${dpart}`,
    )
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}
export const getGuests = (data: any) => {
  const fname = data.firstname === '' ? 'undefined' : data.firstname
  const lname = data.lastname === '' ? 'undefined' : data.lastname
  const rnum = data.roomNumber === '' ? 'undefined' : data.roomNumber
  return axios
    .get(`/reservationRoom/guests/${fname}/${lname}/${rnum}`)
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}
export const updateRoomCheckin = (id: any, room_id: any) => {
  return axios
    .put(`/reservationRoom/checkinRoom/${id}/${room_id}`)
    .then(res => res)
    .catch((error) => {
      console.log(error)
    })
}
export const updateRoomCheckout = (id: any, room_num: any, payment_type: any) => {
  return axios
    .all([
      axios.put(`/reservationRoom/checkoutRoom/${id}/${room_num}`),
      axios.post('/invoice', { id: id, payment_type: payment_type }),
    ])
    .then(axios.spread((res1, res2) => [res1, res2]))
}
export const getPreInvoice = (id: any) => {
  return axios
    .get(`/invoice/preInvoice/${id}`)
    .then(res => {
      return res.data
    })
    .catch((error) => {
      console.log(error)
    })
}
export const getInvoice = (id: any) => {
  return axios
    .get(`/invoice/${id}`)
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}
export const getInvoiceId = (id: any) => {
  return axios
    .get(`/invoice/invoice_id/${id}`)
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}
export const updateCleanStatus = (room_id: any, status: any) => {
  return axios
    .put(`/room/updateCleanStatus/${status}/${room_id}`)
    .then(res => res)
    .catch((error) => {
      console.log(error)
    })
}
export const getAvailableRooms = (date: any) => {
  return axios
    .all([
      axios.get('/roomType'),
      axios.get(`/roomType/available/${date}`),
    ])
    .then(
      axios.spread((roomTypes, typeData) => ({
        roomTypes: roomTypes.data,
        typeData: typeData.data[1],
      })),
    )
}
export const getHouseKeepingStatus = (checked: any) => {
  return axios
    .get(
      `/room/housekeepingStatus/${checked.clean}/${checked.dirty}/${checked.vacant}/${checked.occupied}/${checked.arrived}/${checked.stayOver}/${checked.dueOut}/${checked.departed}/${checked.notReserved}`,
    )
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}

export const getHotelInfo = (id: any) => {
  return axios
    .get(`/hotelInformation/${id}`)
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}
export const getRoomsIdNum = () => {
  return axios
    .get('/room/id')
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}
export const getRoomIssues = () => {
  return axios
    .get('/roomIssue')
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    })
}
export const updateRoomIssues = (id: any, vals: any) => {
  return axios
    .put(`/roomIssue/${id}`, { vals })
    .then(res => res)
    .catch((error) => {
      console.log(error)
    })
}
export const updateRoomIssuesFixed = (id: any) => {
  return axios
    .put(`/roomIssue/fixed/${id}`)
    .then(res => res)
    .catch((error) => {
      console.log(error)
    })
}
export const createRoomIssue = (vals: any) => {
  return axios
    .post('/roomIssue', { vals })
    .then(res => res)
    .catch((error) => {
      console.log(error)
    })
}
export const getHouseStatus = (date: any) => {
  return axios
    .all([
      axios.get('/room/houseStatusRooms'),
      axios.get(`/reservationRoom/houseStatusReservationRooms/${date}`),
    ])
    .then(
      axios.spread((rooms, reservationRooms) => ({
        rooms: rooms.data,
        reservationRooms: reservationRooms.data,
      })),
    )
}
