"use client";
import { css } from "@emotion/react";

type JobCardProps = {
  companyName: string;
  title: string;
  areaTag: string;
  positionTag: string;
  salaryMin: number;
  salaryMax: number;
  dDay: number;
};

const cardStyle = css`
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin: 16px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const titleStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333333;
`;

const companyStyle = css`
  font-size: 1.1rem;
  color: #777777;
  margin-bottom: 8px;
`;

const tagStyle = css`
  font-size: 1rem;
  color: #555555;
  margin-bottom: 8px;
`;

const salaryStyle = css`
  font-size: 1.2rem;
  color: #444444;
  margin-bottom: 8px;
`;

const dDayStyle = css`
  font-size: 1rem;
  color: #e53e3e;
`;

const JobCard: React.FC<JobCardProps> = ({
  companyName,
  title,
  areaTag,
  positionTag,
  salaryMin,
  salaryMax,
  dDay,
}) => {
  const displayDDay = dDay === -1 ? 0 : dDay;
  return (
    <div css={cardStyle}>
      <h2 css={titleStyle}>{companyName}</h2>
      <p css={companyStyle}>{title}</p>
      <p css={tagStyle}>
        {areaTag} / {positionTag}
      </p>
      <p css={salaryStyle}>
        {salaryMin} ~ {salaryMax} 万円
      </p>
      <p css={dDayStyle}>D-{displayDDay}</p>
    </div>
  );
};

export default JobCard;
