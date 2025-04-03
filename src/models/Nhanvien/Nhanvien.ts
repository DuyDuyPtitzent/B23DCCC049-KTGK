export interface Employee {
    id: string; //Mã nhân viên
    fullName: string; //Họ tên
    position: string; //Chức vụ
    department: string; //Phòng ban
    salary: number; //Lương
    status: "Đã ký hợp đồng" | "Thử việc"; //Trạng thái
}