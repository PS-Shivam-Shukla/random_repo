import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Topbar } from '../../../layouts/Topbar';
import { TranscriptStream } from '../components/TranscriptStream';
import { interviewService } from '../services/interview.service';
import { TranscriptEntry } from '../types/interview.types';

export const TranscriptViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);

  useEffect(() => {
    if (id) {
      interviewService.getTranscript(id).then(setEntries);
    }
  }, [id]);

  return (
    <div className="flex flex-col space-y-6 w-full max-w-4xl mx-auto">
      <Topbar
        title="Full Interview Transcript Viewer"
        description="Searchable turn-by-turn conversation transcript log for candidate and AI interviewer."
        actions={
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/interviews/${id}/analytics`)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Analytics
            </Button>
            <Button
              size="sm"
              onClick={() => interviewService.downloadTranscriptText(id || 'session', entries)}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download TXT
            </Button>
          </div>
        }
      />

      <div className="h-[600px] w-full">
        <TranscriptStream entries={entries} />
      </div>
    </div>
  );
};
