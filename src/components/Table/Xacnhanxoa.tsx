//Modal xác nhận trước khi xóa nhân viên.

import { Modal, Button } from "antd";

interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({ visible, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <Modal
      visible={visible}
      title="Xác nhận xóa nhân viên"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Xác nhận
        </Button>,
      ]}
    >
      <p>Bạn có chắc muốn xóa nhân viên này?</p>
    </Modal>
  );
};