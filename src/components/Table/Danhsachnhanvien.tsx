import { useState } from "react";
import { Table, Input, Select, Button } from "antd";
import { Employee } from "@/models/Nhanvien/Nhanvien";
import { positions, departments } from "@/services/Nhanvien";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export const EmployeeList = ({ employees, onEdit, onDelete }: EmployeeListProps) => {
  const [searchText, setSearchText] = useState("");
  const [filterPosition, setFilterPosition] = useState<string | undefined>(undefined);
  const [filterDepartment, setFilterDepartment] = useState<string | undefined>(undefined);

  const filteredEmployees = employees
    .filter(
      (employee) =>
        employee.id.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.fullName.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((employee) => (filterPosition ? employee.position === filterPosition : true))
    .filter((employee) => (filterDepartment ? employee.department === filterDepartment : true))
    .sort((a, b) => b.salary - a.salary); // Sắp xếp theo lương giảm dần

  const columns = [
    { title: "Mã nhân viên", dataIndex: "id", key: "id" },
    { title: "Họ tên", dataIndex: "fullName", key: "fullName" },
    { title: "Chức vụ", dataIndex: "position", key: "position" },
    { title: "Phòng ban", dataIndex: "department", key: "department" },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
      render: (salary: number) => salary.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Employee) => (
        <>
          <Button onClick={() => onEdit(record)}>Sửa</Button>
          <Button
            danger
            onClick={() => onDelete(record.id)}
            style={{ marginLeft: 8 }}
            disabled={record.status === "Đã ký hợp đồng"}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Tìm kiếm theo mã hoặc họ tên nhân viên"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <Select
        placeholder="Lọc theo chức vụ"
        onChange={setFilterPosition}
        allowClear
        style={{ width: 200, marginLeft: 16 }}
      >
        {positions.map((position) => (
          <Select.Option key={position} value={position}>
            {position}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="Lọc theo phòng ban"
        onChange={setFilterDepartment}
        allowClear
        style={{ width: 200, marginLeft: 16 }}
      >
        {departments.map((department) => (
          <Select.Option key={department} value={department}>
            {department}
          </Select.Option>
        ))}
      </Select>
      <Table dataSource={filteredEmployees} columns={columns} rowKey="id" />
    </div>
  );
};