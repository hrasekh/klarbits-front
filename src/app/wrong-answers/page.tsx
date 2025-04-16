    "use client";

    import { useEffect, useState } from 'react';
    import Link from 'next/link';
    import { getWrongAnswers, getUserState } from '@/utils/localStorage';

    interface WrongAnswer {
        questionUuid: string;
        userAnswer: string | number;
        date: string;
        title: string;
        question: string;
    }

    export default function WrongAnswersPage() {
        const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
        const [isLoading, setIsLoading] = useState(true);
        const [stateId, setStateId] = useState<number | null>(null);

        useEffect(() => {
            // Load wrong answers from localStorage
            const loadWrongAnswers = () => {
                const answers = getWrongAnswers();
                // Sort by date (newest first)
                answers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setWrongAnswers(answers);

                // Get user's state selection for review links
                const userState = getUserState();
                setStateId(userState);

                setIsLoading(false);
            };

            loadWrongAnswers();
        }, []);

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        };

        const getReviewLink = (questionUuid: string) => {
            let reviewUrl = `/questions/${questionUuid}`;
            if (stateId !== null) {
                reviewUrl += `?condition=${stateId}`;
            }
            return reviewUrl;
        };

        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Wrong Answers</h1>
                    <div className="flex gap-4">
                        <Link href="/">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Back to Home
                            </button>
                        </Link>

                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : wrongAnswers.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="mt-4 text-xl font-semibold text-gray-700">No Wrong Answers</h2>
                        <p className="mt-2 text-gray-500">You haven't answered any questions incorrectly yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {wrongAnswers.map((answer, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">{answer.title}</h3>
                                        <p className="text-gray-600 mb-2">{answer.question}</p>
                                    </div>

                                    <div className="flex ml-4">
                                        <Link
                                            href={getReviewLink(answer.questionUuid)}
                                            className="cursor-pointer"
                                        >
                                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center transform cursor-pointer">
                                                View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
