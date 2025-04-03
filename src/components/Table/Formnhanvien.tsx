import { Form, Input, Select, Button, Modal, InputNumber } from "antd";
import { Employee } from "@/models/Nhanvien/Nhanvien";
import { positions, departments } from "@/services/Nhanvien";
import { useEffect } from "react"; // Thêm import này

interface EmployeeFormProps {
  visible: boolean;
  employee?: Employee;
  onSave: (values: Omit<Employee, "id">) => void;
  onCancel: () => void;
}

export const EmployeeForm = ({ visible, employee, onSave, onCancel }: EmployeeFormProps) => {
  const [form] = Form.useForm();

  // Cập nhật form khi employee thay đổi
  useEffect(() => {
    if (visible) {
      if (employee) {
        form.setFieldsValue(employee); // Điền dữ liệu nhân viên vào form
      } else {
        form.resetFields(); // Reset form nếu không có employee (thêm mới)
      }
    }
  }, [employee, visible, form]);

  const onFinish = (values: any) => {
    onSave(values);
    form.resetFields(); // Reset sau khi lưu
  };

  return (
    <Modal
      visible={visible}
      title={employee ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="fullName"
          label="Họ tên"
          rules={[
            { required: true, message: "Vui lòng nhập họ tên!" },
            { max: 50, message: "Họ tên tối đa 50 ký tự!" },
            { pattern: /^[a-zA-Z\s]+$/, message: "Họ tên không được chứa ký tự đặc biệt!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="position"
          label="Chức vụ"
          rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
        >
          <Select>
            {positions.map((position: string) => (
              <Select.Option key={position} value={position}>
              {position}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="department"
          label="Phòng ban"
          rules={[{ required: true, message: "Vui lòng chọn phòng ban!" }]}
        >
          <Select>
            {departments.map((department: string) => (
              <Select.Option key={department} value={department}>
              {department}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="salary"
          label="Lương"
          rules={[
            { required: true, message: "Vui lòng nhập lương!" },
            { type: "number", min: 0, message: "Lương phải lớn hơn hoặc bằng 0!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select>
            <Select.Option value="Đã ký hợp đồng">Đã ký hợp đồng</Select.Option>
            <Select.Option value="Thử việc">Thử việc</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
          <Button onClick={onCancel} style={{ marginLeft: 8 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};