import { useState } from "react";
import { Job } from "@/data/jobs";
import { mockCV, generateMockAIMatch, generateMockAISummary } from "@/data/mockCV";
import { Button } from "@/components/ui/button";

interface ApplicationModalProps {
  job: Job;
  onClose: () => void;
}

export default function ApplicationModal({ job, onClose }: ApplicationModalProps) {
  const [step, setStep] = useState(1);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload();
  };

  const handleFileUpload = () => {
    setCvUploaded(false);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCvUploaded(true);
          return 100;
        }
        return prev + Math.random() * 40;
      });
    }, 300);
  };

  const { score, matchedSkills } = generateMockAIMatch(job.requiredSkills, mockCV.skills);
  const aiSummary = generateMockAISummary(score);

  const getScoreColor = (scoreValue: number) => {
    if (scoreValue >= 75) return "text-success";
    if (scoreValue >= 50) return "text-warning";
    return "text-error";
  };

  const getScoreBgGradient = (scoreValue: number) => {
    if (scoreValue >= 75) return "from-success/20 to-success/5";
    if (scoreValue >= 50) return "from-warning/20 to-warning/5";
    return "from-error/20 to-error/5";
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{job.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  step >= 1 ? "bg-secondary text-secondary-foreground" : "bg-border text-muted-foreground"
                }`}
              >
                1
              </div>
              <div>
                <p
                  className={`font-semibold transition ${
                    step >= 1 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Upload CV
                </p>
              </div>
            </div>

            <div className={`flex-1 h-1 mx-4 rounded-full transition ${
              step >= 2 ? "bg-secondary" : "bg-border"
            }`}></div>

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                  step >= 2 ? "bg-secondary text-secondary-foreground" : "bg-border text-muted-foreground"
                }`}
              >
                2
              </div>
              <div>
                <p
                  className={`font-semibold transition ${
                    step >= 2 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Review Match
                </p>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleFileUpload}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
                  isDragging
                    ? "border-secondary bg-secondary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {!cvUploaded ? (
                  <>
                    <svg
                      className="w-12 h-12 text-muted-foreground mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-foreground font-semibold mb-1">Drag & drop your CV here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse (PDF, DOCX)</p>
                    <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      Browse Files
                    </Button>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-12 h-12 text-success mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-foreground font-semibold">CV uploaded successfully!</p>
                    <p className="text-sm text-muted-foreground mt-1">john_doe_cv.pdf</p>
                  </>
                )}
              </div>

              {!cvUploaded && uploadProgress > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">Uploading...</p>
                    <p className="text-sm text-muted-foreground">{Math.floor(uploadProgress)}%</p>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary to-primary transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {cvUploaded && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3">
                  <p className="text-sm font-semibold text-foreground">CV Preview</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="text-foreground font-medium">{mockCV.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">{mockCV.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Experience</p>
                      <p className="text-foreground font-medium">{mockCV.experience}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {mockCV.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-block bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-card"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!cvUploaded}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Review Match
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground">REQUIRED SKILLS</p>
                <p className="text-foreground">{job.description}</p>
              </div>

              <div className="bg-gradient-to-br from-card to-border rounded-lg p-8 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 mb-6">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-border"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 90 * (score / 100)} ${2 * Math.PI * 90}`}
                      strokeLinecap="round"
                      className={`${getScoreColor(score)} transition-all`}
                      style={{ transform: "rotate(-90deg)", transformOrigin: "100px 100px" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Match Score</p>
                  </div>
                </div>

                <p className={`text-center text-sm font-medium ${getScoreColor(score)}`}>
                  {score >= 75 ? "Excellent Match" : score >= 50 ? "Good Match" : "Fair Match"}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-muted-foreground">SKILLS ANALYSIS</p>
                <div className="space-y-3">
                  {Object.entries(matchedSkills)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([skill, percentage]) => (
                      <div key={skill}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{skill}</span>
                          <span className="text-xs text-muted-foreground">{Math.round(percentage)}%</span>
                        </div>
                        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              percentage >= 75
                                ? "bg-success"
                                : percentage >= 50
                                ? "bg-warning"
                                : "bg-error"
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm font-semibold text-muted-foreground mb-2">AI SUMMARY</p>
                <p className="text-foreground text-sm leading-relaxed">{aiSummary}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-card"
                >
                  Edit CV
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-border text-foreground hover:bg-card"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    alert("Application submitted successfully!");
                    onClose();
                  }}
                  className="flex-1 bg-success hover:bg-success/90 text-white"
                >
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
