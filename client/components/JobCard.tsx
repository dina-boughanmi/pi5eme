import { Button } from "@/components/ui/button";
import { Job } from "@/data/jobs";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <span className="text-xs font-semibold text-success bg-success/10 px-3 py-1 rounded-full">
          Active
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-foreground mb-1">{job.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{job.company}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-primary font-semibold">{job.salary}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="inline-block bg-primary/15 text-primary text-xs font-medium px-2.5 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="inline-block bg-border text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-md">
              +{job.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      <Button
        onClick={() => onApply(job)}
        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-10"
      >
        Apply Now
      </Button>
    </div>
  );
}
