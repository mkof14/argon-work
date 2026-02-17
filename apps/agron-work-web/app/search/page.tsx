import { Suspense } from "react";
import { JobSearchExperience } from "../../components/search/JobSearchExperience";

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="page-subtitle">Loading search...</p>}>
      <JobSearchExperience />
    </Suspense>
  );
}
