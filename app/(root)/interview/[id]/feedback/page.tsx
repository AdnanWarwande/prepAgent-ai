import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import GradeBadge from "@/components/GradeBadge";
import ImprovementIndicator from "@/components/ImprovementIndicator";
import CategoryChart from "@/components/CategoryChart";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <div className="feedback-container">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1>
          Interview Feedback - <span className="capitalize text-primary-600">{interview.role}</span>
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {/* Overall Score */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {feedback?.totalScore || 0}
              </span>
            </div>
            <div className="text-left">
              <p className="text-xs text-text-muted">Overall Score</p>
              <p className="text-lg font-semibold text-text-primary">/ 100</p>
            </div>
          </div>

          {/* Grade Badge */}
          <GradeBadge score={feedback?.totalScore || 0} />

          {/* Improvement Indicator */}
          <ImprovementIndicator improvementPercentage={feedback?.improvementPercentage} />

          {/* Date */}
          <div className="flex items-center gap-2 text-text-tertiary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Overall Assessment */}
      <div className="score-card">
        <h3 className="mb-4">Overall Assessment</h3>
        <p className="text-text-secondary leading-relaxed">{feedback?.finalAssessment}</p>
      </div>

      {/* Category Radar Chart */}
      {feedback?.categoryScores && (
        <CategoryChart categoryScores={feedback.categoryScores} />
      )}

      {/* Category Scores */}
      <div className="score-card">
        <h3 className="mb-6">Performance Breakdown</h3>
        <div className="space-y-6">
          {feedback?.categoryScores?.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-text-primary">
                  {category.name}
                </h4>
                <span className="text-lg font-bold text-primary-600">
                  {category.score}/100
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${category.score}%` }}
                />
              </div>
              <p className="text-sm text-text-tertiary">{category.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filler Words Analysis */}
      {feedback?.fillerWords && feedback.fillerWords.count > 0 && (
        <div className="score-card">
          <h3 className="mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Speech Pattern Analysis
          </h3>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-900 mb-3">
              Detected <strong>{feedback.fillerWords.count}</strong> filler words during your interview
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(feedback.fillerWords.types).map(([type, count]) => (
                count > 0 && (
                  <div key={type} className="bg-white rounded-md p-2 text-center">
                    <p className="text-lg font-bold text-orange-600">{count}</p>
                    <p className="text-xs text-orange-700 capitalize">
                      {type.replace("_", " ")}
                    </p>
                  </div>
                )
              ))}
            </div>
            <p className="text-xs text-orange-700 mt-3">
              💡 Tip: Practice reducing filler words by pausing briefly instead of using them.
            </p>
          </div>
        </div>
      )}

      {/* Strengths */}
      <div className="score-card">
        <h3 className="mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Strengths
        </h3>
        <ul className="space-y-2">
          {feedback?.strengths?.map((strength, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-text-secondary">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Areas for Improvement */}
      <div className="score-card">
        <h3 className="mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-warning" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Areas for Improvement
        </h3>
        <ul className="space-y-2">
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-text-secondary">{area}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Practice Questions */}
      {feedback?.practiceQuestions && feedback.practiceQuestions.length > 0 && (
        <div className="score-card">
          <h3 className="mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Recommended Practice Questions
          </h3>
          <p className="text-sm text-text-tertiary mb-4">
            Practice these questions to improve your performance in weak areas:
          </p>
          <div className="space-y-4">
            {feedback.practiceQuestions.map((item, index) => (
              <div key={index} className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-primary-700 mb-1">
                      {item.category}
                    </p>
                    <p className="text-sm text-text-primary">{item.question}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button variant="secondary" size="lg" asChild className="flex-1">
          <Link href="/">
            Back to Dashboard
          </Link>
        </Button>

        <Button variant="default" size="lg" asChild className="flex-1">
          <Link href={`/interview/${id}`}>
            Retake Interview
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Feedback;

