"use client";
import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import AddJobModal from "../components/AddJobModal";
import Pagination from "../components/Pagination";
import { JobGet } from "../type/const";
import { fetchJobPosts } from "../api";

const JobPostsPage = () => {
  const [jobPosts, setJobPosts] = useState<JobGet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const getJobPosts = async () => {
    try {
      const data = await fetchJobPosts();
      const sortedData = data.sort(
        (a: { id: number }, b: { id: number }) => b.id - a.id
      );
      setJobPosts(sortedData);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    }
  };

  useEffect(() => {
    getJobPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jobPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col">
      <div className="text-3xl font-bold mb-6 text-center text-blue-600">
        일본 IT 채용공고
      </div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded shadow-md transition duration-300"
        >
          공고 추가
        </button>
      </div>
      <div className="flex-grow grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentPosts.map((job) => (
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
      {isModalOpen && (
        <AddJobModal
          onClose={(refresh) => {
            setIsModalOpen(false);
            if (refresh) {
              getJobPosts();
            }
          }}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(jobPosts.length / postsPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default JobPostsPage;
