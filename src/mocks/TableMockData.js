import ProjectStatus from "../constants/ProjectStatus";

export const TableMockData = [
  {
    title: "پیاده سازی سامانه پروژه های کارشناسی",
    supervisor: "دکتر بیگی",
    capacity: 2,
    status: ProjectStatus.free,
    id: 1,
  },
  {
    title: "پیاده سازی سامانه حضور غیاب با qrcode",
    supervisor: "دکتر بیگی",
    capacity: 2,
    status: ProjectStatus.free,
    id: 2,
  },
  {
    title: "پیاده سازی مدل های آماری در spss",
    supervisor: "دکتر شیر محمدی",
    capacity: 1,
    status: ProjectStatus.free,
    id: 3,
  },
  {
    title: "پیاده سازی سامانه کاراموزی دانشکده",
    supervisor: "دکتر ترابی",
    capacity: 4,
    status: ProjectStatus.free,
    id: 4,
  },
  {
    title: "پیاده سازی روشی برای تخصیص بهینه منبع برای بدن",
    supervisor: "دکتر شیر محمدی",
    capacity: 2,
    status: ProjectStatus.full,
    id: 5,
  },
  {
    title:
      "پیاده سازی روشی برای نوین سازی و افزایش محصولات کشاورزی با استفاده از هوش مصنوعی",
    supervisor: "دکتر پازوکی",
    capacity: 3,
    status: ProjectStatus.full,
    id: 6,
  },
];

export default TableMockData;
