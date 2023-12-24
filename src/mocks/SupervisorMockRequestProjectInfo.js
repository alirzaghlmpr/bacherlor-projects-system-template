import ProjectRequestStatus from "../constants/ProjectRequestStatus";

export const SupervisorMockRequestProjectInfo = [
  {
    date: "1402/10/10",
    title: "پیاده سازی سامانه پروژه های کارشناسی",
    supervisor: "دکتر بیگی",
    capacity: 2,
    status: ProjectRequestStatus.pending,
    id: 1011,
    participants: [
      { name: "علی رضایی", suid: "123465798" },
      { name: "رضا علیپور", suid: "987654321" },
    ],
  },
  {
    date: "1402/10/11",
    title: "پیاده سازی سامانه حضور غیاب با qrcode",
    supervisor: "دکتر بیگی",
    capacity: 2,
    status: ProjectRequestStatus.rejected,
    id: 2011,
    participants: [
      { name: "علی رضایی", suid: "123465798" },
      { name: "رضا علیپور", suid: "987654321" },
    ],
  },
];

export default SupervisorMockRequestProjectInfo;
