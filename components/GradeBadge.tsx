interface GradeBadgeProps {
    score: number;
}

const getGradeInfo = (score: number) => {
    if (score >= 90) {
        return {
            grade: "A+",
            label: "Excellent",
            gradientFrom: "from-emerald-500",
            gradientTo: "to-emerald-600",
            textColor: "text-emerald-700",
            bgColor: "bg-emerald-50",
        };
    }
    if (score >= 80) {
        return {
            grade: "A",
            label: "Great",
            gradientFrom: "from-green-500",
            gradientTo: "to-green-600",
            textColor: "text-green-700",
            bgColor: "bg-green-50",
        };
    }
    if (score >= 70) {
        return {
            grade: "B",
            label: "Good",
            gradientFrom: "from-blue-500",
            gradientTo: "to-blue-600",
            textColor: "text-blue-700",
            bgColor: "bg-blue-50",
        };
    }
    if (score >= 60) {
        return {
            grade: "C",
            label: "Fair",
            gradientFrom: "from-yellow-500",
            gradientTo: "to-yellow-600",
            textColor: "text-yellow-700",
            bgColor: "bg-yellow-50",
        };
    }
    return {
        grade: "D",
        label: "Needs Improvement",
        gradientFrom: "from-red-500",
        gradientTo: "to-red-600",
        textColor: "text-red-700",
        bgColor: "bg-red-50",
    };
};

const GradeBadge = ({ score }: GradeBadgeProps) => {
    const gradeInfo = getGradeInfo(score);

    return (
        <div className="flex items-center gap-3">
            <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradeInfo.gradientFrom} ${gradeInfo.gradientTo} flex items-center justify-center shadow-lg`}
            >
                <span className="text-2xl font-bold text-white">{gradeInfo.grade}</span>
            </div>
            <div className="text-left">
                <p className="text-xs text-text-muted">Performance</p>
                <p className={`text-sm font-semibold ${gradeInfo.textColor}`}>
                    {gradeInfo.label}
                </p>
            </div>
        </div>
    );
};

export default GradeBadge;
