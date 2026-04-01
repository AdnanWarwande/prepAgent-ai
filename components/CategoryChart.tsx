"use client";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface CategoryChartProps {
    categoryScores: Array<{
        name: string;
        score: number;
        comment: string;
    }>;
}

const CategoryChart = ({ categoryScores }: CategoryChartProps) => {
    const data = {
        labels: categoryScores.map((cat) => cat.name),
        datasets: [
            {
                label: "Your Score",
                data: categoryScores.map((cat) => cat.score),
                backgroundColor: "rgba(79, 70, 229, 0.2)",
                borderColor: "rgba(79, 70, 229, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(79, 70, 229, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(79, 70, 229, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20,
                    color: "#6b7280",
                    backdropColor: "transparent",
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
                pointLabels: {
                    color: "#374151",
                    font: {
                        size: 12,
                        weight: 500,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                padding: 12,
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 13,
                },
                callbacks: {
                    label: function (context: any) {
                        return `Score: ${context.parsed.r}/100`;
                    },
                },
            },
        },
    };

    return (
        <div className="score-card">
            <h3 className="mb-6 text-center">Performance Radar</h3>
            <div className="max-w-md mx-auto">
                <Radar data={data} options={options} />
            </div>
        </div>
    );
};

export default CategoryChart;
