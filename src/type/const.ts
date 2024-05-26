export type JobGet = {
  id: number;
  companyName: string;
  title: string;
  areaTag: string;
  positionTag: string;
  salaryMin: number;
  salaryMax: number;
  dDay: number;
};

export type JobPost = {
  companyName: string;
  title: string;
  area: string;
  position: string;
  salaryMin: number;
  salaryMax: number;
  endDate: string;
};
