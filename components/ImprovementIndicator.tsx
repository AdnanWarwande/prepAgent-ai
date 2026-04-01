interface ImprovementIndicatorProps {
    improvementPercentage?: number;
}

const ImprovementIndicator = ({
    improvementPercentage,
}: ImprovementIndicatorProps) => {
    if (improvementPercentage === undefined || improvementPercentage === null) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-100 text-secondary-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="text-sm font-medium">First Interview</span>
            </div>
        );
    }

    const isPositive = improvementPercentage > 0;
    const isNeutral = improvementPercentage === 0;

    if (isNeutral) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-100 text-secondary-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="text-sm font-medium">Same as Last</span>
            </div>
        );
    }

    return (
        <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isPositive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
        >
            {isPositive ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
            <span className="text-sm font-medium">
                {isPositive ? "+" : ""}
                {improvementPercentage.toFixed(1)}%
            </span>
            <span className="text-xs opacity-75">vs last</span>
        </div>
    );
};

export default ImprovementIndicator;
