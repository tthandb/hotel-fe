import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
  key: string;
  room_type_id: string;
  type: string;
  pending_departures: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Room Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Pending Departures',
    dataIndex: 'pending_departures',
    key: 'pending_departures',
  },
];
const PendingDeparturesTable = ({ dataSource }: { dataSource: any }) => {
  return (
    <Table columns={columns} dataSource={dataSource} pagination={false}/>
  )
}

export default PendingDeparturesTable;
