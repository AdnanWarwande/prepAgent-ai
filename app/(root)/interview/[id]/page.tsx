import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  const badgeColors = {
    Behavioral: "bg-blue-100 text-blue-700",
    Mixed: "bg-purple-100 text-purple-700",
    Technical: "bg-emerald-100 text-emerald-700",
  };

  const normalizedType = /mix/gi.test(interview.type) ? "Mixed" : interview.type;
  const badgeColor =
    badgeColors[normalizedType as keyof typeof badgeColors] ||
    "bg-secondary-100 text-secondary-700";

  return (
    <div className="space-y-6">
      {/* Interview Header */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="capitalize">{interview.role} Interview</h2>
            </div>

            <DisplayTechIcons techStack={interview.techstack} />
          </div>

          <div className={`badge ${badgeColor}`}>
            {normalizedType}
          </div>
        </div>
      </div>

      {/* Interview Agent */}
      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </div>
  );
};

export default InterviewDetails;
