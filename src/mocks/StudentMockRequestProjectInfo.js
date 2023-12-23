import ProjectRequestStatus from "../constants/ProjectRequestStatus";

export const StudentMockRequestProjectInfo = [
  {
    date: "1402/10/10",
    title: "پیاده سازی سامانه پروژه های کارشناسی",
    supervisor: "دکتر بیگی",
    capacity: 2,
    status: ProjectRequestStatus.pending,
    id: 1011,
  },
  {
    date: "1402/10/11",
    title: "پیاده سازی سامانه حضور غیاب با qrcode",
    supervisor: "دکتر بیگی",
    capacity: 2,
    status: ProjectRequestStatus.rejected,
    id: 2011,
  },
];

export default StudentMockRequestProjectInfo;
