import { motion } from 'framer-motion';
import { WelcomeCard } from './components/WelcomeCard';
import { QuickActions } from './components/QuickActions';
import { StatCards } from './components/StatCards';
import { RecentInterviews } from './components/RecentInterviews';
import { LatestReport } from './components/LatestReport';
import { SkillsOverview } from './components/SkillsOverview';
import { LearningProgress } from './components/LearningProgress';
import { RecentNotifications } from './components/RecentNotifications';

export function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Row 1: Welcome Card + Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
      >
        <div className="lg:col-span-2">
          <WelcomeCard />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </motion.div>

      {/* Row 2: Stat Cards (Full Width) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      >
        <StatCards />
      </motion.div>

      {/* Row 3: Bento Grid 2-Column Area */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-6"
      >
        {/* Left Column: Recent Interviews + Skills Overview */}
        <div className="xl:col-span-2 space-y-6">
          <RecentInterviews />
          <SkillsOverview />
        </div>

        {/* Right Column: Latest Report + Learning Progress + Notifications */}
        <div className="xl:col-span-1 space-y-6">
          <LatestReport />
          <LearningProgress />
          <RecentNotifications />
        </div>
      </motion.div>
    </div>
  );
}