import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/Card';
import { CertificationItem } from '../types/resume.types';

export interface CertificationCardsProps {
  certifications: CertificationItem[];
}

export const CertificationCards: React.FC<CertificationCardsProps> = ({ certifications }) => {
  return (
    <Card className="border-slate-800 bg-slate-900 shadow-xl">
      <CardHeader className="pb-3 border-b border-slate-800">
        <CardTitle className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Certifications & Accreditation
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {certifications.length > 0 ? (
          certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex items-center justify-between hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="rounded-lg bg-amber-950/50 p-2 text-amber-400 border border-amber-800/50">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100">{cert.name}</h4>
                  <p className="text-slate-400 mt-0.5">{cert.issuer}</p>
                  {cert.credential_id && (
                    <p className="text-[10px] text-slate-500 font-mono mt-1">ID: {cert.credential_id}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1.5">
                <span className="font-mono text-amber-400 font-semibold">{cert.issue_date}</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-950/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-800/50">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-500 italic">No certifications listed.</p>
        )}
      </CardContent>
    </Card>
  );
};
