import { Employee } from "@/models/Nhanvien/Nhanvien";
import { message } from "antd";

const LOCAL_STORAGE_KEY = "employees";
// Danh sách chức vụ và phòng ban giả định
export const positions = ["Nhân viên", "Trưởng phòng", "Giám đốc", "Quản lý"];
export const departments = [
  "Phòng IT",
  "Phòng HR",
  "Phòng Marketing",
  "Phòng Kinh doanh",
  "Phòng Tài chính",
  "Phòng kế toán",
  "Phòng Hỗ trợ khách hàng",
];

export const getEmployees = (): Employee[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees: Employee[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
};

export const addEmployee = (employee: Omit<Employee, "id">) => {
  const employees = getEmployees();
  // Kiểm tra họ tên
  if (!/^[^\@\#\$\%\^\&\*\(\)\!\+\=]+$/.test(employee.fullName)) {
    message.error("Họ tên không được chứa ký tự đặc biệt như @, !, ...!");
    return false;
  }
  if (employee.fullName.length > 50) {
    message.error("Họ tên tối đa 50 ký tự!");
    return false;
  }
  const newEmployee: Employee = { ...employee, id: `NV${Date.now()}` }; // Tự động sinh mã nhân viên
  employees.push(newEmployee);
  saveEmployees(employees);
  message.success("Thêm nhân viên thành công!");
  return true;
};

export const updateEmployee = (id: string, updatedEmployee: Omit<Employee, "id">) => {
  const employees = getEmployees();
  const employeeIndex = employees.findIndex((e) => e.id === id);
  if (employeeIndex === -1) return false;
  // Kiểm tra họ tên
  if (!/^[^\@\#\$\%\^\&\*\(\)\!\+\=]+$/.test(updatedEmployee.fullName)) {
    message.error("Họ tên không được chứa ký tự đặc biệt như @, !, ...!");
    return false;
  }
  if (updatedEmployee.fullName.length > 50) {
    message.error("Họ tên tối đa 50 ký tự!");
    return false;
  }
  employees[employeeIndex] = { ...updatedEmployee, id };
  saveEmployees(employees);
  message.success("Cập nhật nhân viên thành công!");
  return true;
};

export const deleteEmployee = (id: string) => {
  const employees = getEmployees();
  const employee = employees.find((e) => e.id === id);
  if (!employee) return false;
  if (employee.status === "Đã ký hợp đồng") {
    message.error("Không thể xóa nhân viên đã ký hợp đồng!");
    return false;
  }
  const updatedEmployees = employees.filter((e) => e.id !== id);
  saveEmployees(updatedEmployees);
  message.success("Xóa nhân viên thành công!");
  return true;
};
