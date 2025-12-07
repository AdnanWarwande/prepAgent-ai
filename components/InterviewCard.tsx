import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
        interviewId,
        userId,
      })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColors = {
    Behavioral: "bg-blue-100 text-blue-700",
    Mixed: "bg-purple-100 text-purple-700",
    Technical: "bg-emerald-100 text-emerald-700",
  };

  const badgeColor =
    badgeColors[normalizedType as keyof typeof badgeColors] ||
    "bg-secondary-100 text-secondary-700";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="interview-card group">
      <div className="flex flex-col gap-6 h-full">
        {/* Header with Badge */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className={cn("badge mb-3", badgeColor)}>
              {normalizedType}
            </div>
            <h3 className="text-xl font-semibold text-text-primary capitalize line-clamp-1">
              {role} Interview
            </h3>
          </div>
        </div>

        {/* Date & Score */}
        <div className="flex items-center gap-4 text-sm text-text-tertiary">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-text-secondary">
              {feedback?.totalScore || "---"}/100
            </span>
          </div>
        </div>

        {/* Feedback or Placeholder */}
        <p className="text-sm text-text-tertiary line-clamp-2 flex-1">
          {feedback?.finalAssessment ||
            "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border-light">
          <DisplayTechIcons techStack={techstack} />

          <Button size="sm" variant="default" asChild>
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "View Feedback" : "Start Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
