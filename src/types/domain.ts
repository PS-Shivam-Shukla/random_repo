/**
 * Domain types — 100% aligned with backend SQLAlchemy models & Pydantic schemas.
 * Every interface mirrors the exact backend structure.
 */

/* ════════════════════════════════════════════════════════════
   AUTH & USER
   ════════════════════════════════════════════════════════════ */

export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserRegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: 'bearer';
  user: User;
}

export interface TokenData {
  sub: string;  // user_id
  exp: number;
}

/* ════════════════════════════════════════════════════════════
   RESUME
   ════════════════════════════════════════════════════════════ */

export interface ExperienceEntry {
  company: string;
  role: string;
  duration_years: number;
  key_achievements: string[];
}

export type SenioritySignal = 'JUNIOR' | 'MID' | 'SENIOR' | 'STAFF' | 'UNKNOWN';

export interface Resume {
  id: string;
  user_id: string;
  file_path: string;
  raw_text: string;
  parsed_skills: string[];
  parsed_experience: ExperienceEntry[];
  seniority_signal: SenioritySignal;
  created_at: string;
  updated_at: string;
}

export interface ResumeUploadRequest {
  file: File;
}

/* ════════════════════════════════════════════════════════════
   JOB DESCRIPTION
   ════════════════════════════════════════════════════════════ */

export interface JobDescription {
  id: string;
  user_id: string;
  raw_text: string;
  target_role: string;
  company_name: string | null;
  industry: string | null;
  required_skills: string[];
  seniority_level: string;
  created_at: string;
  updated_at: string;
}

export interface JobDescriptionCreateRequest {
  raw_text: string;
  target_role: string;
  company_name?: string | null;
  industry?: string | null;
}

/* ════════════════════════════════════════════════════════════
   INTERVIEW & RELATED
   ════════════════════════════════════════════════════════════ */

export type InterviewStatus = 'PLANNING' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED' | 'FAILED';
export type RoundType = 'HR' | 'TECHNICAL' | 'COMPLETE';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'ADVANCED';

export interface CompetencyDefinition {
  name: string;
  weight: number;
  description: string;
}

export interface CompetencyMatrix {
  id: string;
  interview_id: string;
  competencies: CompetencyDefinition[];
}

export interface InterviewPlan {
  id: string;
  interview_id: string;
  hr_question_count: number;
  technical_question_count: number;
  round_structure: Record<string, unknown>;
  estimated_duration_minutes: number;
}

export interface InterviewStatusResponse {
  id: string;
  status: InterviewStatus;
  current_round: RoundType | null;
  overall_score: number | null;
  started_at: string;
  completed_at: string | null;
}

export interface InterviewAnswerResponse {
  interview_id: string;
  message: string;
}

export interface Interview {
  id: string;
  user_id: string;
  resume_id: string;
  jd_id: string;
  status: InterviewStatus;
  current_round: RoundType | null;
  overall_score: number | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  
  // Populated relationships (optional, depends on endpoint)
  competency_matrix?: CompetencyMatrix;
  interview_plan?: InterviewPlan;
  questions?: InterviewQuestion[];
  report?: InterviewReport;
}

export interface InterviewCreateRequest {
  resume_id: string;
  jd_id: string;
}

export interface InterviewQuestion {
  id: string;
  interview_id: string;
  round_type: RoundType;
  competency_targeted: string;
  difficulty: Difficulty;
  question_text: string;
  sequence_number: number;
  created_at: string;
  updated_at: string;
  
  // Populated relationship
  answer?: InterviewAnswer;
}

export interface InterviewAnswer {
  id: string;
  question_id: string;
  answer_text: string;
  response_time_seconds: number;
  created_at: string;
  updated_at: string;
  
  // Populated relationship
  evaluation?: Evaluation;
}

export interface AnswerSubmitRequest {
  question_id: string;
  answer_text: string;
  response_time_seconds?: number;
}

export interface Evaluation {
  id: string;
  answer_id: string;
  score: number;
  rubric_breakdown: Record<string, number>;
  feedback: string;
  ideal_answer_summary: string;
}

/* ════════════════════════════════════════════════════════════
   INTERVIEW REPORT
   ════════════════════════════════════════════════════════════ */

export interface CompetencyScore {
  competency: string;
  score: number;
  max_score: number;
  percentage: number;
}

export interface ImprovementPlanItem {
  competency: string;
  current_score: number;
  specific_gap_description: string;
  recommended_action: string;
  priority: number;
}

export interface TranscriptTurn {
  sequence_number: number;
  round_type: string;
  question_text: string;
  answer_text: string;
  score: number;
  feedback: string;
}

export interface InterviewReport {
  id: string;
  interview_id: string;
  competency_scorecard: CompetencyScore[];
  improvement_plan: ImprovementPlanItem[];
  transcript_snapshot: TranscriptTurn[];
  generated_at: string;
}

/* ════════════════════════════════════════════════════════════
   ANALYTICS
   ════════════════════════════════════════════════════════════ */

export interface TrendPoint {
  date: string;
  score: number;
  interview_id?: string;
}

export interface CompetencyAggregate {
  competency: string;
  avg_score: number;
  interview_count: number;
}

export interface AgentMetric {
  agent_name: string;
  success_rate: number;
  avg_latency_ms: number;
  retry_rate: number;
  total_calls: number;
}

export interface AnalyticsSummary {
  total_interviews: number;
  average_score: number | null;
  completion_rate: number;
  in_progress_count: number;
  weak_competencies: string[];
  score_trend: TrendPoint[];
}

/* ════════════════════════════════════════════════════════════
   AGENT LOGS
   ════════════════════════════════════════════════════════════ */

export type AgentNodeStatus = 'SUCCESS' | 'RETRY' | 'FAILED';

export interface AgentLog {
  id: string;
  interview_id: string;
  agent_name: string;
  node_status: AgentNodeStatus;
  input_snapshot: Record<string, unknown>;
  output_snapshot: Record<string, unknown>;
  latency_ms: number;
  retry_count: number;
  prompt_version: string | null;
  created_at: string;
  updated_at: string;
}

/* ════════════════════════════════════════════════════════════
   SSE STREAMING
   ════════════════════════════════════════════════════════════ */

export type SSEEventType = 'ack' | 'evaluation' | 'token' | 'done' | 'error';

export interface SSEMessage {
  type: SSEEventType;
  content?: string;
  data?: Record<string, unknown>;
  message?: string;
  interview_complete?: boolean;
}

/* ════════════════════════════════════════════════════════════
   ERROR HANDLING
   ════════════════════════════════════════════════════════════ */

export interface ApiError {
  error_code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

/* ════════════════════════════════════════════════════════════
   PAGINATION & LISTING
   ════════════════════════════════════════════════════════════ */

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ListQueryParams {
  page?: number;
  page_size?: number;
  sort_by?: string;
  order?: 'asc' | 'desc';
}
