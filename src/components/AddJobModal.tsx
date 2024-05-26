"use client";
import { useRef, useState } from "react";
import DateRangePicker from "./DateRangePicker";
import { JobPost } from "../type/const";
import { addJobPost } from "../api";

type AddJobModalProps = {
  onClose: (refresh?: boolean) => void;
};

const AddJobModal: React.FC<AddJobModalProps> = ({ onClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [position, setPosition] = useState("");
  const [salaryMin, setSalaryMin] = useState<number | string>(0);
  const [salaryMax, setSalaryMax] = useState<number | string>(0);
  const [endDate, setEndDate] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const modalRef = useRef<HTMLDivElement>(null);

  const handleDateSelect = (startDate: string, endDate: string) => {
    const isoEndDate = new Date(endDate).toISOString();
    setEndDate(isoEndDate);
  };

  const handleSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setSalary: React.Dispatch<React.SetStateAction<number | string>>
  ) => {
    const value = event.target.value.replace(/^0+/, "");
    setSalary(value ? Number(value) : "");
  };

  const handleSalaryFocus = (
    setSalary: React.Dispatch<React.SetStateAction<number | string>>
  ) => {
    setSalary("");
  };

  const handleSubmit = async () => {
    const newJob: JobPost = {
      companyName,
      title,
      area,
      position,
      salaryMin: typeof salaryMin === "string" ? 0 : salaryMin,
      salaryMax: typeof salaryMax === "string" ? 0 : salaryMax,
      endDate,
    };

    const validationErrors: Record<string, string> = {};
    if (!newJob.companyName)
      validationErrors.companyName = "가고싶은 회사명을 입력하세요.";
    if (!newJob.title) validationErrors.title = "희망 포지션을 입력하세요.";
    if (!newJob.area) validationErrors.area = "근무지를 입력하세요.";
    if (!newJob.position) validationErrors.position = "채용방식을 입력하세요.";
    if (!newJob.salaryMin)
      validationErrors.salaryMin = "최저 연봉을 입력하세요.";
    if (!newJob.salaryMax)
      validationErrors.salaryMax = "최대 연봉을 입력하세요.";
    if (!newJob.endDate)
      validationErrors.endDate = "입사 희망마감 날짜를 선택하세요.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("newJob", newJob);
    try {
      await addJobPost(newJob);
      onClose(true);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg lg:w-2/5 w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4">희망 채용공고 작성폼</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">회사명</label>
          <input
            type="text"
            placeholder="Teamlab,Google,Mercari,야후..."
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              setErrors((prev) => ({ ...prev, companyName: "" }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">희망 포지션</label>
          <input
            type="모집 공고 제목"
            value={title}
            placeholder="프론트엔드 개발자, 백엔드, 인프라,풀스택 개발자.."
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: "" }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">근무지</label>
          <input
            type="text"
            value={area}
            placeholder="도쿄, 오사카, 후쿠오카.."
            onChange={(e) => {
              setArea(e.target.value);
              setErrors((prev) => ({ ...prev, area: "" }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.area && (
            <p className="text-red-500 text-sm mt-1">{errors.area}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">채용방식</label>
          <input
            type="text"
            value={position}
            placeholder="정규직, 계약직, 인턴,.."
            onChange={(e) => {
              setPosition(e.target.value);
              setErrors((prev) => ({ ...prev, position: "" }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.position && (
            <p className="text-red-500 text-sm mt-1">{errors.position}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">최저 연봉</label>
          <input
            type="number"
            value={salaryMin}
            placeholder="300"
            onFocus={() => handleSalaryFocus(setSalaryMin)}
            onChange={(e) => {
              handleSalaryChange(e, setSalaryMin);
              setErrors((prev) => ({ ...prev, salaryMin: "" }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.salaryMin && (
            <p className="text-red-500 text-sm mt-1">{errors.salaryMin}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">최대 연봉</label>
          <input
            type="number"
            value={salaryMax}
            placeholder="1200"
            onFocus={() => handleSalaryFocus(setSalaryMax)}
            onChange={(e) => {
              handleSalaryChange(e, setSalaryMax);
              setErrors((prev) => ({ ...prev, salaryMax: "" }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.salaryMax && (
            <p className="text-red-500 text-sm mt-1">{errors.salaryMax}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">마감 날짜</label>
          <div className="flex justify-center">
            <DateRangePicker
              onDateSelect={(startDate, endDate) => {
                handleDateSelect(startDate, endDate);
                setErrors((prev) => ({ ...prev, endDate: "" }));
              }}
            />
          </div>
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>
        <div className="flex justify-end mb-5 pb-3">
          <button
            onClick={() => onClose(false)}
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
