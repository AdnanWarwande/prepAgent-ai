
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="space-y-12">
      {/* Hero/CTA Section */}
      <section className="hero-card">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Master Your Interviews with AI-Powered Practice
            </h1>
            <p className="text-base text-primary-100">
              Practice real interview scenarios, get instant AI feedback, and boost your confidence for your next job interview.
            </p>

            <div className="flex gap-4 mt-2">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-primary-50">
                <Link href="/interview">Start Practicing</Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:block flex-shrink-0">
            <Image
              src="/hero-illustration.png"
              alt="Interview Practice Illustration"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Your Interviews Section */}
      <section className="space-y-6">
        <div className="section-header">
          <h2>Your Interviews</h2>
        </div>

        <div className="interview-grid">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <div className="empty-state col-span-full">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No interviews yet</h3>
              <p className="text-text-tertiary mb-4">Start your first mock interview to begin practicing</p>
              <Button asChild variant="default">
                <Link href="/interview">Create Interview</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Available Interviews Section */}
      <section className="space-y-6">
        <div className="section-header">
          <h2>Available Interviews</h2>
        </div>

        <div className="interview-grid">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <div className="empty-state col-span-full">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No interviews available</h3>
              <p className="text-text-tertiary">Check back later for new interview opportunities</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
