"use client";
import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import AddJobModal from "../components/AddJobModal";
import { JobGet } from "../type/const";

const JobPostsPage = () => {
  const [jobPosts, setJobPosts] = useState<JobGet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobPosts = async () => {
      const response = await fetch("/api/job-posts");
      const data = await response.json();
      console.log("JobPostsPage: data", data);
      setJobPosts(data);
    };

    fetchJobPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-4">일본 IT 채용공고</div>
      <div className="flex justify-end mr-6 m-2 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          공고 추가
        </button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {jobPosts.map((job) => (
          <JobCard
            key={job.id}
            companyName={job.companyName}
            title={job.title}
            areaTag={job.areaTag}
            positionTag={job.positionTag}
            salaryMin={job.salaryMin}
            salaryMax={job.salaryMax}
            dDay={job.dDay}
          />
        ))}
      </div>
      {isModalOpen && <AddJobModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default JobPostsPage;
