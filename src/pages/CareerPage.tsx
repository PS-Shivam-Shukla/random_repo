import { useState, FormEvent } from "react";
import { useCreateJobDescription } from "../hooks/useJobDescription";
import { JobDescriptionResponse } from "../services/jd.service";
import { Briefcase, Building, Sparkles, CheckCircle2, AlertCircle, Layers } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function CareerPage() {
  const createJdMutation = useCreateJobDescription();

  const [targetRole, setTargetRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [rawText, setRawText] = useState("");
  const [analyzedJd, setAnalyzedJd] = useState<JobDescriptionResponse | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!rawText.trim() || !targetRole.trim()) return;

    try {
      const result = await createJdMutation.mutateAsync({
        raw_text: rawText,
        target_role: targetRole,
        company_name: companyName || undefined,
        industry: industry || undefined,
      });
      setAnalyzedJd(result);
    } catch (err) {
      console.error("Job Description analysis failed:", err);
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-display">Career & Job Description Intelligence</h1>
        <p className="text-xs text-neutral-400">
          Analyze job postings to extract required competencies, seniority signals, and tailor your interview preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column: Job Description Submission Form */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-4 text-white font-bold text-sm">
            <Briefcase className="h-4 w-4 text-blue-400" />
            Analyze New Job Description
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Target Role Title *</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">Industry Sector</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. FinTech / AI"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Job Description Raw Text *</label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={7}
                placeholder="Paste the full job posting requirements, responsibilities, and qualifications here..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs text-white shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none font-mono text-[11px]"
                required
              />
            </div>

            {createJdMutation.isError && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>Failed to analyze job description. Check network connection.</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={createJdMutation.isPending}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 shadow-md shadow-blue-600/20"
            >
              {createJdMutation.isPending ? (
                <>
                  <Sparkles className="mr-1.5 h-4 w-4 animate-spin" /> Analyzing Job Requirements...
                </>
              ) : (
                "Extract Skill Competencies"
              )}
            </Button>
          </form>
        </div>

        {/* Right Column: Parsed AI Job Analysis Results */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-6 min-h-[400px]">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-4 text-white font-bold text-sm">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            AI Parsed Job Intelligence
          </div>

          {!analyzedJd ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-500">
              <Briefcase className="h-10 w-10 text-neutral-700 mb-3" />
              <p className="text-xs font-medium">
                Submit a job description on the left to extract skill requirements and seniority level.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{analyzedJd.target_role}</h3>
                    <p className="text-xs text-neutral-400 flex items-center gap-2 mt-1">
                      {analyzedJd.company_name && (
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3 text-neutral-500" />
                          {analyzedJd.company_name}
                        </span>
                      )}
                      {analyzedJd.industry && (
                        <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                          {analyzedJd.industry}
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300 font-mono">
                    {analyzedJd.seniority_level || "Mid-Senior"}
                  </span>
                </div>
              </div>

              {/* Required Skills Badges */}
              <div>
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-blue-400" /> Required Skill Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analyzedJd.required_skills && analyzedJd.required_skills.length > 0 ? (
                    analyzedJd.required_skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-neutral-500">General software engineering competencies parsed.</span>
                  )}
                </div>
              </div>

              {/* Raw Text Summary Preview */}
              <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
                <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Parsed Job Target ID
                </h4>
                <p className="text-xs text-neutral-300 font-mono break-all">{analyzedJd.id}</p>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-400 pt-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Job intelligence saved. Ready to launch tailored interview simulation.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}