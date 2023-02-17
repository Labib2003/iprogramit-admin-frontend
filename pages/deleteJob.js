import React, { useEffect, useState } from "react";

export default function DeleteJob() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("https://iprogramit.vercel.app/api/v1/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.data));
  }, []);

  const handleDeleteJob = (job) => {
    if (confirm(`Are you sure you want to delete ${job.title}`))
      fetch(`https://iprogramit.vercel.app/api/v1/jobs/${job._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) return alert("Job deleted.");
          alert("Failed to delete job.");
        });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>_id</th>
          <th>Position Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job._id}>
            <th>{job._id}</th>
            <th>{job.title}</th>
            <th>
              <button onClick={() => handleDeleteJob(job)}>delete</button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
