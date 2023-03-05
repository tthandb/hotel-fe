import React, { useState } from 'react';
import { updateCleanStatus } from '../apis';
import { Button, message, Modal, Select } from 'antd';

const ModalCell = ({ record }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = async (val: string) => {
    try {
      const data = await updateCleanStatus(record.room_id, val);
      if (data) {
        message.success('Cập nhật trạng thái thành công');
      }
    } catch (e) {
      message.error('Lỗi cập nhật');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        {record.clean === 1 ? 'Sạch' : 'Bẩn'}
      </Button>
      <Modal
        title=""
        closable={false}
        footer={null}
        width={200}
        open={isModalOpen}
        onCancel={handleCancel}>
        <Select
          defaultValue={record.clean}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 1, label: 'Sạch' },
            { value: 0, label: 'Bẩn' },
          ]} />
      </Modal>
    </>
  );
}

export default ModalCell;
