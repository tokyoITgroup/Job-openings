"use client";
import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import { JobPost } from "../type/const";
import axios from "axios";

type AddJobModalProps = {
  onClose: () => void;
};

const AddJobModal: React.FC<AddJobModalProps> = ({ onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [position, setPosition] = useState("");
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(0);
  const [endDate, setEndDate] = useState("");

  const handleDateSelect = (startDate: string, endDate: string) => {
    setEndDate(endDate);
  };

  const handleSubmit = async () => {
    const newJob: JobPost = {
      companyName,
      title,
      area,
      position,
      salaryMin,
      salaryMax,
      endDate,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_ENDPOINT}/gamzaApi/v1/add`,
        newJob,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        onClose();
      } else {
        console.error("Failed to add job");
      }
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/3 w-full max-h-[90vh] overflow-auto">
        <h2 className="text-2xl mb-4">채용공고 작성</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">회사명</label>
          <input
            type="text"
            placeholder="Teamlab,Google,Mercari,야후..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">포지션</label>
          <input
            type="모집 공고 제목"
            value={title}
            placeholder="프론트엔드 개발자, 백엔드, 인프라,풀스택 개발자.."
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">근무지</label>
          <input
            type="text"
            value={area}
            placeholder="도쿄, 오사카, 후쿠오카.."
            onChange={(e) => setArea(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">채용형식</label>
          <input
            type="text"
            value={position}
            placeholder="정규직, 계약직, 인턴,.."
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">최저 연봉</label>
          <input
            type="number"
            value={salaryMin}
            placeholder="300"
            onChange={(e) => setSalaryMin(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">최대 연봉</label>
          <input
            type="number"
            value={salaryMax}
            placeholder="1200"
            onChange={(e) => setSalaryMax(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">마감 날짜</label>
          <div className="flex justify-center">
            <DateRangePicker onDateSelect={handleDateSelect} />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded mr-2"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;
