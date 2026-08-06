import { motion } from 'framer-motion';
import { FileText, AlertCircle } from 'lucide-react';
import { FileUploadZone } from '../components/FileUploadZone';
import { useWizard } from '../contexts/WizardContext';

export function Step1ResumeUpload() {
  const { state } = useWizard();

  const handleFileUpload = (file: File) => {
    // File is automatically handled by FileUploadZone via useWizard context
    console.log('File uploaded:', file.name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Upload Your Resume
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          Upload your resume so our AI can analyze your skills and experience to create 
          personalized interview questions.
        </p>
      </div>

      {/* Upload Zone */}
      <FileUploadZone 
        onFileUpload={handleFileUpload}
        className="my-8"
      />

      {/* Help Text */}
      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Tips for best results
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Use a recent, well-formatted resume</li>
              <li>• Include relevant skills and technologies</li>
              <li>• Ensure text is selectable (not just an image)</li>
              <li>• PDF format is recommended for best parsing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Debug Info - Remove in production */}
      {import.meta.env.DEV && (
        <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs">
          <strong>Debug Info:</strong>
          <pre className="mt-2 text-neutral-600 dark:text-neutral-400">
            {JSON.stringify(
              {
                currentStep: state.currentStep,
                isValid: state.isValid,
                hasFile: !!state.resumeFile,
                fileName: state.resumeFile?.name,
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </motion.div>
  );
}