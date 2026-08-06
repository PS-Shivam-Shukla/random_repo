import { useState } from 'react';
import { PageHeader } from '../../components/shared/PageHeader';
import { RecommendedCourses } from './components/RecommendedCourses';
import { WeakTopicsChips } from './components/WeakTopicsChips';
import { LearningPathRoadmap } from './components/LearningPathRoadmap';
import { PracticeQuestionsGrid } from './components/PracticeQuestionsGrid';
import { WeeklyGoalWidget } from './components/WeeklyGoalWidget';
import { AIRecommendationsFeed } from './components/AIRecommendationsFeed';

export function LearningHubPage() {
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <PageHeader
        title="Personalized Learning Hub"
        description="Encouraging topic roadmaps, weak-area targeted practice exercises, and personalized AI growth recommendations."
      />

      {/* Bento Row 1: Full-Width Recommended Courses Top */}
      <RecommendedCourses />

      {/* Bento Row 2: 2-Column Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2/3 Column: Weak Topics + Roadmap + Practice Exercises */}
        <div className="lg:col-span-2 space-y-6">
          <WeakTopicsChips
            selectedTopic={selectedTopicFilter}
            onSelectTopic={(t) => setSelectedTopicFilter(t)}
          />

          <LearningPathRoadmap />

          <PracticeQuestionsGrid activeTopicFilter={selectedTopicFilter} />
        </div>

        {/* Right 1/3 Column: Sticky Weekly Goal + AI Suggestions */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <WeeklyGoalWidget />

          <AIRecommendationsFeed />
        </div>
      </div>
    </div>
  );
}
