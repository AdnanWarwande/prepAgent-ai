"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <div className="space-y-6">
      {/* Interview Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Interviewer Card */}
        <div className="interview-interface">
          <div className="flex flex-col items-center gap-4">
            <div className={cn(
              "interviewer-avatar relative transition-all duration-300",
              isSpeaking && "scale-110"
            )}>
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              {isSpeaking && (
                <span className="absolute inset-0 rounded-full bg-primary-400 animate-pulse-soft opacity-75" />
              )}
            </div>
            <h3 className="text-center">AI Interviewer</h3>
            <p className="text-sm text-text-tertiary text-center">
              {callStatus === CallStatus.ACTIVE
                ? isSpeaking
                  ? "Speaking..."
                  : "Listening..."
                : "Ready to start"}
            </p>
          </div>
        </div>

        {/* User Card */}
        <div className="interview-interface">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-secondary-600">
                {userName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h3 className="text-center">{userName}</h3>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              callStatus === CallStatus.ACTIVE && "bg-success-light text-green-800",
              callStatus === CallStatus.CONNECTING && "bg-warning-light text-yellow-800",
              callStatus === CallStatus.INACTIVE && "bg-secondary-200 text-secondary-700",
              callStatus === CallStatus.FINISHED && "bg-secondary-200 text-secondary-700"
            )}>
              {callStatus === CallStatus.ACTIVE && "In Interview"}
              {callStatus === CallStatus.CONNECTING && "Connecting..."}
              {callStatus === CallStatus.INACTIVE && "Not Started"}
              {callStatus === CallStatus.FINISHED && "Completed"}
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Display */}
      {messages.length > 0 && (
        <div className="transcript-box">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-text-tertiary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p
              key={lastMessage}
              className={cn(
                "text-text-secondary transition-opacity duration-500 animate-fade-in"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      {/* Call Controls */}
      <div className="flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className={cn(
              "btn-success relative",
              callStatus === CallStatus.CONNECTING && "opacity-75 cursor-wait"
            )}
            onClick={() => handleCall()}
            disabled={callStatus === CallStatus.CONNECTING}
          >
            <span
              className={cn(
                "absolute inset-0 rounded-lg bg-success animate-ping opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />

            <span className="relative flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                ? "Start Interview"
                : "Connecting..."}
            </span>
          </button>
        ) : (
          <button
            className="btn-danger"
            onClick={() => handleDisconnect()}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
              </svg>
              End Interview
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Agent;
