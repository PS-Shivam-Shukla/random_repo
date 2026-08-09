import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResumeList } from "../features/resume/hooks/useResumeList";
import { useUploadResume } from "../features/resume/hooks/useUploadResume";
import { useDeleteResume } from "../features/resume/hooks/useDeleteResume";
import { useResumeAnalysis } from "../features/resume/hooks/useResumeAnalysis";
import { DragDropUploader } from "../features/resume/components/DragDropUploader";
import { FileText, Trash2, Eye, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function ResumePage() {
  const navigate = useNavigate();
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { data: resumes, isLoading, isError } = useResumeList();
  const uploadMutation = useUploadResume(setUploadProgress);
  const deleteMutation = useDeleteResume();
  const { data: analysis, isLoading: isAnalysisLoading } = useResumeAnalysis(selectedResumeId || undefined);

  const handleFileSelect = async (file: File) => {
    try {
      const uploaded = await uploadMutation.mutateAsync(file);
      setSelectedResumeId(uploaded.id);
      setUploadProgress(0);
    } catch (err) {
      console.error("Failed to upload resume:", err);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this resume?")) {
      await deleteMutation.mutateAsync(id);
      if (selectedResumeId === id) {
        setSelectedResumeId(null);
      }
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-display">Resume Intelligence</h1>
        <p className="text-xs text-neutral-400">
          Upload and analyze your target resume for AI-driven skill parsing and job description matching.
        </p>
      </div>

      {/* Upload Drag & Drop Section */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
        <h2 className="text-sm font-bold text-white mb-4">Upload New Resume</h2>
        <DragDropUploader
          onFileSelected={handleFileSelect}
          disabled={uploadMutation.isPending}
        />
        {uploadMutation.isPending && (
          <div className="mt-3 flex items-center gap-2 text-xs text-blue-400">
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            Uploading and parsing resume ({uploadProgress}%)...
          </div>
        )}
        {uploadMutation.isError && (
          <p className="mt-3 text-xs text-rose-400">
            Upload failed. Please ensure file format is PDF/DOCX and under 10MB.
          </p>
        )}
      </div>

      {/* Resumes List & Analysis Panel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Uploaded Resumes List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Your Uploaded Resumes</h2>
            <span className="text-xs font-mono text-neutral-400">
              {resumes?.length || 0} File(s)
            </span>
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-xs text-neutral-400">Loading resumes...</div>
          ) : isError ? (
            <div className="p-4 text-xs text-rose-400 rounded-lg bg-rose-500/10 border border-rose-500/20">
              Failed to load resumes.
            </div>
          ) : !resumes || resumes.length === 0 ? (
            <div className="p-6 text-center text-xs text-neutral-500 border border-dashed border-neutral-800 rounded-xl">
              No resumes uploaded yet. Upload one above to start.
            </div>
          ) : (
            <div className="space-y-2.5">
              {resumes.map((resume) => {
                const isSelected = selectedResumeId === resume.id;
                const fileName = resume.file_path ? resume.file_path.split(/[/\\\\]/).pop() : "Resume Document";
                return (
                  <div
                    key={resume.id}
                    onClick={() => setSelectedResumeId(resume.id)}
                    className={`group flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-500/50 bg-blue-500/10 text-white shadow-xs"
                        : "border-neutral-800/80 bg-neutral-900/40 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900/80"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-500/20 text-blue-400" : "bg-neutral-800 text-neutral-400"}`}>
                        <FileText className="h-4 w-4 shrink-0" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate max-w-[150px]">{fileName}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">
                          {new Date(resume.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={() => setSelectedResumeId(resume.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
                        title="View Analysis"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(resume.id, e)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800"
                        title="Delete Resume"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: AI Analysis Display */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="h-4 w-4 text-blue-400" />
                Parsed AI Resume Intelligence
              </div>
              {selectedResumeId && (
                <span className="text-[10px] font-mono text-neutral-400">
                  ID: {selectedResumeId}
                </span>
              )}
            </div>

            {!selectedResumeId ? (
              <div className="py-16 text-center text-xs text-neutral-500">
                Select an uploaded resume from the left list to view detailed AI analysis.
              </div>
            ) : isAnalysisLoading ? (
              <div className="py-16 flex flex-col items-center justify-center text-xs text-neutral-400 gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                Fetching LLM analysis state...
              </div>
            ) : !analysis ? (
              <div className="py-16 text-center text-xs text-neutral-500">
                No analysis data available for this resume.
              </div>
            ) : (
              <div className="space-y-6">
                {/* Core Overview Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Seniority Signal
                    </span>
                    <p className="text-xl font-bold text-white font-mono mt-1">
                      {analysis.seniority_signal || "MID"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Parsed Technical Skills
                    </span>
                    <p className="text-xl font-bold text-blue-400 font-mono mt-1">
                      {analysis.skills?.technical?.length || 0} Skills
                    </p>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Market Alignment
                    </span>
                    <p className="text-xl font-bold text-emerald-400 font-mono mt-1">
                      Top {100 - (analysis.industry_percentile ?? 95)}%
                    </p>
                  </div>
                </div>

                {/* Parsed Technical Skills */}
                <div>
                  <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Parsed Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.skills?.technical?.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-neutral-700 bg-neutral-800/80 px-2.5 py-1 text-xs font-medium text-blue-300"
                      >
                        {skill}
                      </span>
                    )) || <span className="text-xs text-neutral-500">No skills parsed yet</span>}
                  </div>
                </div>

                {/* Experience & Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-neutral-800 bg-neutral-950/40 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Parsed Strengths
                    </div>
                    <ul className="text-xs text-neutral-300 space-y-1 list-disc ml-4">
                      {analysis.skills?.soft?.map((s: string) => (
                        <li key={s}>{s}</li>
                      )) || <li>Strong technical experience profile</li>}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-neutral-800 bg-neutral-950/40 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
                      <AlertCircle className="h-3.5 w-3.5" /> Improvement Insights
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {analysis.summary || "Quantify achievement metrics for higher ATS ranking across senior roles."}
                    </p>
                  </div>
                </div>

                {/* Continue to Job Description & Match CTA */}
                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <Button
                    onClick={() => navigate(`/job-descriptions?resumeId=${selectedResumeId}`)}
                    className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-5 flex items-center gap-2 shadow-md shadow-blue-600/20"
                  >
                    <Briefcase className="h-4 w-4" />
                    Continue to Job Description & Match
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}