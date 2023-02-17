import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [positionName, setPositionName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [isFullTime, setIsFullTime] = useState(false);
  const [experienceRequired, setExperienceRequired] = useState(0);
  const [icon, setIcon] = useState(null);

  const handlePostNewJob = (e) => {
    e.preventDefault();

    // image upload
    const IMG_BB_KEY = "5a4eb1ee63d962e1a439c22cbda3f289";
    const formData = new FormData();
    formData.append("image", icon);

    fetch(`https://api.imgbb.com/1/upload?key=${IMG_BB_KEY}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return alert("Image upload failed");
        const jobData = {
          title: positionName,
          company: companyName,
          description: description,
          isFullTime: isFullTime,
          experienceRequired: experienceRequired,
          imageUrl: data.data.thumb.url,
        };
        console.log(jobData);
        fetch("https://iprogramit.vercel.app/api/v1/jobs", {
          method: "POST",
          body: JSON.stringify(jobData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) return alert(data.message);
            console.log(data);
            alert("Job posted successfully.");
          });
      });
  };

  return (
    <form onSubmit={handlePostNewJob}>
      <label htmlFor="position-name">Position Name</label>
      <br />
      <input
        type="text"
        id="position-name"
        onChange={(e) => setPositionName(e.target.value)}
        required
      />
      <br />
      <br />
      <label htmlFor="company-name">Company Name</label>
      <br />
      <input
        type="text"
        id="company-name"
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <br />
      <br />
      <label htmlFor="job-description">Description</label>
      <br />
      <textarea
        type="text"
        id="job-description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <br />
      <input
        type="checkbox"
        id="is-full-time"
        onChange={(e) => setIsFullTime(e.target.checked)}
      />
      <label htmlFor="is-full-time">Is full time</label>
      <br />
      <br />
      <label htmlFor="experience-required">Experience Required</label>
      <br />
      <input
        type="number"
        min="0"
        defaultValue="0"
        id="experience-required"
        onChange={(e) => setExperienceRequired(e.target.value)}
        required
      />
      <br />
      <br />
      <label htmlFor="icon">Job Icon</label>
      <br />
      <input
        type="file"
        accept=".png, .jpg"
        id="icon"
        onChange={(e) => setIcon(e.target.files[0])}
        required
      />
      <br />
      <br />
      <input type="submit" />
      <br />
      <Link href="/deleteJob">Delete Job</Link>
    </form>
  );
}
