"use client";

import React from "react";
import { Stack } from "@mui/material";
import JobCard from "./JobCard";
const jobListings = [
  {
    title: "Gaming UI designer",
    company: "Rockstar Games",
    location: "ElMansours, Egypt",
    timeAgo: "10 days ago",
    experience: "0 - 3y of exp",
    type: "Full time",
    workType: "Remote",
    categories: ["Creative / Design", "IT / Software development", "Gaming"],
    logo: "/placeholder.svg",
  },
  {
    title: "Senior UX UI Designer",
    company: "Egabi",
    location: "Cairo, Egypt",
    timeAgo: "1 month ago",
    experience: "0 - 3y of exp",
    type: "Full time",
    workType: "Hybrid",
    categories: ["Creative / Design", "IT / Software development"],
    logo: "/placeholder.svg",
  },
  // Add more job listings as needed
];
export default function JobList() {
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
  return (
    <Stack spacing={2}>
      {jobListings.map((job, index) => (
        <JobCard
          key={index}
          data={job}
          index={index}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      ))}
    </Stack>
  );
}
