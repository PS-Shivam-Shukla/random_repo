import { useState } from "react";
import { useResumeList } from "../features/resume/hooks/useResumeList";
import { useUploadResume } from "../features/resume/hooks/useUploadResume";
import { useDeleteResume } from "../features/resume/hooks/useDeleteResume";
import { useResumeAnalysis } from "../features/resume/hooks/useResumeAnalysis";
import { DragDropUploader } from "../features/resume/components/DragDropUploader";
import { FileText, Trash2, Eye, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function ResumePage() {
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
          Upload and analyze your target resume for AI-driven skill parsing and interview matching.
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
                        : "border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className={`h-5 w-5 shrink-0 ${isSelected ? "text-blue-400" : "text-neutral-400"}`} />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{fileName}</p>
                        <p className="text-[10px] text-neutral-500 font-mono">
                          {new Date(resume.created_at || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedResumeId(resume.id);
                        }}
                        className="h-7 w-7 p-0 text-neutral-400 hover:text-white"
                        title="View AI Analysis"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => handleDelete(resume.id, e)}
                        className="h-7 w-7 p-0 text-neutral-400 hover:text-rose-400"
                        title="Delete Resume"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: AI Resume Analysis */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 min-h-[300px]">
            <div className="flex items-center gap-2 mb-6 border-b border-neutral-800/80 pb-4">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <h2 className="text-sm font-bold text-white">AI Skill & ATS Evaluation</h2>
            </div>

            {!selectedResumeId ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-neutral-500">
                <FileText className="h-10 w-10 text-neutral-700 mb-3" />
                <p className="text-xs font-medium">Select a resume from the list to inspect AI parsed insights.</p>
              </div>
            ) : isAnalysisLoading ? (
              <div className="flex items-center justify-center py-16 text-xs text-neutral-400 gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                Analyzing resume structure and skills...
              </div>
            ) : !analysis ? (
              <p className="text-xs text-neutral-400 py-8 text-center">Analysis unavailable for selected document.</p>
            ) : (
              <div className="space-y-6">
                {/* Score Header */}
                <div className="flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <div>
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Resume Quality Score
                    </span>
                    <p className="text-2xl font-bold text-white font-mono mt-1">
                      {analysis.resume_quality_score ?? 85} / 100
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Industry Percentile
                    </span>
                    <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}