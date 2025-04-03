//Trang chính quản lý nhân viên
import { useState, useEffect } from "react";
import { Button } from "antd";
import { EmployeeList } from "@/components/Table/Danhsachnhanvien";
import { EmployeeForm } from "@/components/Table/Formnhanvien";
import { ConfirmModal } from "@/components/Table/Xacnhanxoa";
import { Employee } from "@/models/Nhanvien/Nhanvien";
import { addEmployee, updateEmployee, deleteEmployee, getEmployees } from "@/services/Nhanvien";
import "antd/dist/antd.css";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | undefined>(undefined);

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const handleAddEdit = (values: Omit<Employee, "id">) => {
    if (selectedEmployee) {
      if (updateEmployee(selectedEmployee.id, values)) {
        setEmployees(getEmployees());
        setIsFormModalVisible(false);
        setSelectedEmployee(undefined);
      }
    } else {
      if (addEmployee(values)) {
        setEmployees(getEmployees());
        setIsFormModalVisible(false);
      }
    }
  };

  const handleDelete = (id: string) => {
    setEmployeeToDelete(id);
    setIsConfirmModalVisible(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete && deleteEmployee(employeeToDelete)) {
      setEmployees(getEmployees());
    }
    setIsConfirmModalVisible(false);
    setEmployeeToDelete(undefined);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Quản lý nhân viên</h1>
      <Button type="primary" onClick={() => setIsFormModalVisible(true)} style={{ marginBottom: 16 }}>
        Thêm nhân viên
      </Button>
      <EmployeeList
        employees={employees}
        onEdit={(employee) => {
          setSelectedEmployee(employee);
          setIsFormModalVisible(true);
        }}
        onDelete={handleDelete}
      />
      <EmployeeForm
        visible={isFormModalVisible}
        employee={selectedEmployee}
        onSave={handleAddEdit}
        onCancel={() => {
          setIsFormModalVisible(false);
          setSelectedEmployee(undefined);
        }}
      />
      <ConfirmModal
        visible={isConfirmModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsConfirmModalVisible(false);
          setEmployeeToDelete(undefined);
        }}
      />
    </div>
  );
}