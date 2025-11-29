import React, { useState, useEffect, useMemo } from 'react';
import {
    Dumbbell,
    Calendar,
    Settings,
    CheckCircle2,
    Circle,
    TrendingUp,
    Plus,
    Trash2,
    Activity,
    Trophy,
    Zap,
    Weight
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// --- WORKOUT PLAN CONSTANT ---
const WORKOUT_PLAN = {
    PHASE_1: { // Weeks 1-4
        weeks: [1, 2, 3, 4],
        name: 'FOUNDATION',
        goal: 'Build form, joint strength, mobility, and base endurance.',
        workouts: {
            'Day 1': [
                { id: 'p1d1-1', name: 'Flat Dumbbell Bench Press', sets: 3, reps: '12–15', unit: 'reps', muscleGroup: 'Chest' },
                { id: 'p1d1-2', name: 'Incline Machine Press', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Chest' },
                { id: 'p1d1-3', name: 'Dumbbell Shoulder Press', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Shoulders' },
                { id: 'p1d1-4', name: 'Lateral Raises', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Shoulders' },
                { id: 'p1d1-5', name: 'Rope Tricep Pushdowns', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Arms' },
                { id: 'p1d1-6', name: 'Plank Hold', sets: 3, reps: '45', unit: 'sec', muscleGroup: 'Core' },
            ],
            'Day 2': [
                { id: 'p1d2-1', name: 'Goblet Squats', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p1d2-2', name: 'Romanian Deadlift (Light Dumbbells)', sets: 3, reps: '12–15', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p1d2-3', name: 'Leg Press', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p1d2-4', name: 'Bodyweight Walking Lunges', sets: 2, reps: '15', unit: 'each leg', muscleGroup: 'Legs' },
                { id: 'p1d2-5', name: 'Standing Calf Raises', sets: 3, reps: '15–20', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p1d2-6', name: 'Hanging Knee Raises', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Core' },
            ],
            'Day 3': [
                { id: 'p1d3-1', name: 'Lat Pulldown', sets: 3, reps: '12–15', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p1d3-2', name: 'Seated Row', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p1d3-3', name: 'Dumbbell One-Arm Row', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p1d3-4', name: 'Face Pulls', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Shoulders' },
                { id: 'p1d3-5', name: 'Bicep Curls', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Arms' },
                { id: 'p1d3-6', name: 'Hammer Curls', sets: 2, reps: '15', unit: 'reps', muscleGroup: 'Arms' },
            ],
            'Day 4': [
                { id: 'p1d4-1', name: 'Kettlebell Deadlift', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p1d4-2', name: 'Front Squat (light barbell)', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p1d4-3', name: 'Push-ups', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Chest' },
                { id: 'p1d4-4', name: 'Plank to Push-up', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Core' },
                { id: 'p1d4-5', name: 'Russian Twists', sets: 3, reps: '20', unit: 'reps', muscleGroup: 'Core' },
                { id: 'p1d4-6', name: 'Cardio Finisher (Row/Sprint)', sets: 8, reps: '20 sec on / 40 sec off', unit: 'rounds', muscleGroup: 'Cardio' },
            ],
        },
    },
    PHASE_2: { // Weeks 5-8
        weeks: [5, 6, 7, 8],
        name: 'HYPERTROPHY',
        goal: 'Build muscle size & shape.',
        workouts: {
            'Day 1': [
                { id: 'p2d1-1', name: 'Barbell Bench Press', sets: 4, reps: '8–10', unit: 'reps', muscleGroup: 'Chest' },
                { id: 'p2d1-2', name: 'Incline Dumbbell Press', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Chest' },
                { id: 'p2d1-3', name: 'Overhead Barbell Press', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Shoulders' },
                { id: 'p2d1-4', name: 'Dumbbell Lateral Raises', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Shoulders' },
                { id: 'p2d1-5', name: 'Cable Chest Fly', sets: 2, reps: '12–15', unit: 'reps', muscleGroup: 'Chest' },
                { id: 'p2d1-6', name: 'Tricep Dips', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Arms' },
            ],
            'Day 2': [
                { id: 'p2d2-1', name: 'Back Squats', sets: 4, reps: '8–10', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p2d2-2', name: 'Romanian Deadlift', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p2d2-3', name: 'Leg Press (Feet Medium)', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p2d2-4', name: 'Weighted Walking Lunges', sets: 3, reps: '12', unit: 'each leg', muscleGroup: 'Legs' },
                { id: 'p2d2-5', name: 'Standing Calf Raise', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p2d2-6', name: 'Hanging Leg Raises', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Core' },
            ],
            'Day 3': [
                { id: 'p2d3-1', name: 'Deadlift', sets: 4, reps: '6–8', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p2d3-2', name: 'Pull-Ups / Assisted', sets: 3, reps: '8–10', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p2d3-3', name: 'Seated Cable Row', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p2d3-4', name: 'Lat Pulldown (Wide Grip)', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p2d3-5', name: 'Barbell Bicep Curl', sets: 3, reps: '10–12', unit: 'reps', muscleGroup: 'Arms' },
                { id: 'p2d3-6', name: 'Hammer Curl', sets: 2, reps: '12–15', unit: 'reps', muscleGroup: 'Arms' },
            ],
            'Day 4': [
                { id: 'p2d4-1', name: 'Power Clean (light technique work)', sets: 3, reps: '6', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p2d4-2', name: 'Front Squat', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p2d4-3', name: 'Dumbbell Push Press', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Shoulders' },
                { id: 'p2d4-4', name: 'Kettlebell Swings', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p2d4-5', name: 'Russian Twists', sets: 3, reps: '20', unit: 'reps', muscleGroup: 'Core' },
                { id: 'p2d4-6', name: 'Treadmill Sprints', sets: 10, reps: '20 sec on / 40 sec off', unit: 'rounds', muscleGroup: 'Cardio' },
            ],
        },
    },
    PHASE_3: { // Weeks 9-12
        weeks: [9, 10, 11, 12],
        name: 'STRENGTH',
        goal: 'Maximize strength, preserve muscle, and cut fat aggressively.',
        workouts: {
            'Day 1': [
                { id: 'p3d1-1', name: 'Barbell Bench Press', sets: 5, reps: '5', unit: 'reps', muscleGroup: 'Chest' },
                { id: 'p3d1-2', name: 'Incline Barbell Press', sets: 4, reps: '6', unit: 'reps', muscleGroup: 'Chest' },
                { id: 'p3d1-3', name: 'Seated Dumbbell Shoulder Press', sets: 3, reps: '8', unit: 'reps', muscleGroup: 'Shoulders' },
                { id: 'p3d1-4', name: 'Weighted Dips', sets: 3, reps: '8', unit: 'reps', muscleGroup: 'Arms' },
                { id: 'p3d1-5', name: 'Overhead Tricep Extension', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Arms' },
                { id: 'p3d1-6', name: 'Plank + Weighted Hold', sets: 3, reps: '60', unit: 'sec', muscleGroup: 'Core' },
            ],
            'Day 2': [
                { id: 'p3d2-1', name: 'Back Squat', sets: 5, reps: '5', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p3d2-2', name: 'Deadlift', sets: 4, reps: '5', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p3d2-3', name: 'Bulgarian Split Squat', sets: 3, reps: '8', unit: 'each leg', muscleGroup: 'Legs' },
                { id: 'p3d2-4', name: 'Leg Press', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p3d2-5', name: 'Standing Calf Raises', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p3d2-6', name: 'Ab Wheel Rollouts', sets: 3, reps: '12', unit: 'reps', muscleGroup: 'Core' },
            ],
            'Day 3': [
                { id: 'p3d3-1', name: 'Weighted Pull-Ups', sets: 4, reps: '6–8', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p3d3-2', name: 'Bent-Over Barbell Row', sets: 4, reps: '6–8', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p3d3-3', name: 'Seated Cable Row', sets: 3, reps: '8', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p3d3-4', name: 'Lat Pulldown (Narrow Grip)', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Back' },
                { id: 'p3d3-5', name: 'Barbell Curls', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Arms' },
                { id: 'p3d3-6', name: 'Hammer Curls', sets: 2, reps: '12', unit: 'reps', muscleGroup: 'Arms' },
            ],
            'Day 4': [
                { id: 'p3d4-1', name: 'Clean & Press', sets: 4, reps: '6', unit: 'reps', muscleGroup: 'Shoulders' },
                { id: 'p3d4-2', name: 'Front Squat', sets: 3, reps: '8', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p3d4-3', name: 'Kettlebell Snatch', sets: 3, reps: '12', unit: 'each arm', muscleGroup: 'Legs' },
                { id: 'p3d4-4', name: 'Box Jumps', sets: 3, reps: '10', unit: 'reps', muscleGroup: 'Legs' },
                { id: 'p3d4-5', name: 'Hanging Leg Raises', sets: 3, reps: '15', unit: 'reps', muscleGroup: 'Core' },
                { id: 'p3d4-6', name: 'Finisher: Row Sprint', sets: 12, reps: '20 sec on / 40 sec rest', unit: 'rounds', muscleGroup: 'Cardio' },
            ],
        },
    },
};

// --- Helper Functions to map week/day to routine ---
const getRoutine = (week, day) => {
    const dayKey = `Day ${day}`;
    let routine = null;
    let phaseName = 'Unknown';
    let phaseGoal = '';

    if (week >= 1 && week <= 4) {
        routine = WORKOUT_PLAN.PHASE_1.workouts[dayKey] || [];
        phaseName = WORKOUT_PLAN.PHASE_1.name;
        phaseGoal = WORKOUT_PLAN.PHASE_1.goal;
    } else if (week >= 5 && week <= 8) {
        routine = WORKOUT_PLAN.PHASE_2.workouts[dayKey] || [];
        phaseName = WORKOUT_PLAN.PHASE_2.name;
        phaseGoal = WORKOUT_PLAN.PHASE_2.goal;
    } else if (week >= 9 && week <= 12) {
        routine = WORKOUT_PLAN.PHASE_3.workouts[dayKey] || [];
        phaseName = WORKOUT_PLAN.PHASE_3.name;
        phaseGoal = WORKOUT_PLAN.PHASE_3.goal;
    }

    return { routine, phaseName, phaseGoal };
};

// --- Analytics Helpers ---

// Epley Formula: 1RM = Weight * (1 + Reps/30)
const calculateOneRepMax = (weight, reps) => {
    if (!weight || !reps) return 0;
    const w = parseFloat(weight);
    const r = parseFloat(reps);
    if (isNaN(w) || isNaN(r)) return 0;
    return Math.round(w * (1 + r / 30));
};

const getVolumeData = (logs) => {
    const weeklyVolume = Array(12).fill(0).map((_, i) => ({ week: i + 1, volume: 0 }));

    Object.values(logs).forEach(log => {
        const weekIndex = log.week - 1;
        if (weekIndex >= 0 && weekIndex < 12) {
            let logVolume = 0;
            log.sets.forEach(set => {
                if (set && set.completed && set.weight && set.actualReps) {
                    const w = parseFloat(set.weight);
                    const r = parseFloat(set.actualReps);
                    if (!isNaN(w) && !isNaN(r)) {
                        logVolume += w * r;
                    }
                }
            });
            weeklyVolume[weekIndex].volume += logVolume;
        }
    });

    return weeklyVolume;
};

const getStrengthData = (logs, exerciseId) => {
    const data = [];
    // Iterate through all logs to find entries for this exercise
    Object.values(logs).forEach(log => {
        if (log.exerciseId === exerciseId) {
            // Find max 1RM for this session
            let max1RM = 0;
            log.sets.forEach(set => {
                if (set && set.completed) {
                    const oneRM = calculateOneRepMax(set.weight, set.actualReps);
                    if (oneRM > max1RM) max1RM = oneRM;
                }
            });
            if (max1RM > 0) {
                data.push({
                    date: `W${log.week}D${log.day}`,
                    oneRM: max1RM,
                    week: log.week
                });
            }
        }
    });
    // Sort by week/day (simplified by week for now)
    return data.sort((a, b) => a.week - b.week);
};

const getMuscleSplitData = (logs) => {
    const split = {};

    Object.values(logs).forEach(log => {
        // Find exercise in plan to get muscle group
        // This is expensive, so we'll do a quick lookup
        let muscleGroup = 'Other';
        // Iterate phases to find exercise
        for (const phase of Object.values(WORKOUT_PLAN)) {
            for (const dayWorkouts of Object.values(phase.workouts)) {
                const ex = dayWorkouts.find(e => e.id === log.exerciseId);
                if (ex) {
                    muscleGroup = ex.muscleGroup || 'Other';
                    break;
                }
            }
            if (muscleGroup !== 'Other') break;
        }

        if (!split[muscleGroup]) split[muscleGroup] = 0;
        // Count sets
        const completedSets = log.sets.filter(s => s && s.completed).length;
        split[muscleGroup] += completedSets;
    });

    return Object.entries(split).map(([name, value]) => ({ name, value }));
};

const getPersonalRecords = (logs) => {
    const prs = {}; // { exerciseName: { weight: 100, date: 'W1D1' } }

    Object.values(logs).forEach(log => {
        let exerciseName = '';
        // Find exercise name
        for (const phase of Object.values(WORKOUT_PLAN)) {
            for (const dayWorkouts of Object.values(phase.workouts)) {
                const ex = dayWorkouts.find(e => e.id === log.exerciseId);
                if (ex) {
                    exerciseName = ex.name;
                    break;
                }
            }
            if (exerciseName) break;
        }

        if (!exerciseName) return;

        log.sets.forEach(set => {
            if (set && set.completed && set.weight) {
                const w = parseFloat(set.weight);
                if (!isNaN(w)) {
                    if (!prs[exerciseName] || w > prs[exerciseName].weight) {
                        prs[exerciseName] = { weight: w, date: `W${log.week} D${log.day}` };
                    }
                }
            }
        });
    });

    return Object.entries(prs).map(([name, data]) => ({ name, ...data }));
};

// --- Main App Component ---
export default function App() {
    return <WorkoutTracker />;
}

// --- Workout Tracker Component ---
function WorkoutTracker() {
    // State
    const [activeTab, setActiveTab] = useState('track'); // track, stats, settings
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentDay, setCurrentDay] = useState(1); // 1-4

    // Data State - Lazy Initialization from LocalStorage
    const [logs, setLogs] = useState(() => {
        try {
            const saved = localStorage.getItem('workoutLogs');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            console.error("Failed to parse logs from local storage", e);
            return {};
        }
    });

    // Derived Routine from Plan
    const { routine, phaseName, phaseGoal } = useMemo(() =>
        getRoutine(currentWeek, currentDay),
        [currentWeek, currentDay]
    );

    // --- Actions ---
    // Batch Log Update
    const updateBatchLog = (exId, setsInput, repsInput, weightInput) => {
        const logId = `w${currentWeek}-d${currentDay}-${exId}`;

        setLogs(prevLogs => {
            const setsCount = parseInt(setsInput) || 0;
            const repsCount = parseInt(repsInput) || 0;

            // Create new sets array based on batch input
            const newSets = [];
            for (let i = 0; i < setsCount; i++) {
                newSets.push({
                    actualReps: repsCount,
                    weight: weightInput,
                    completed: !!(repsCount && weightInput)
                });
            }

            const newData = {
                week: currentWeek,
                day: currentDay,
                exerciseId: exId,
                timestamp: new Date().toISOString(),
                sets: newSets,
                completed: newSets.length >= (routine.find(ex => ex.id === exId)?.sets || 0) && newSets.every(s => s.completed),
            };

            const newLogs = {
                ...prevLogs,
                [logId]: newData
            };

            localStorage.setItem('workoutLogs', JSON.stringify(newLogs));
            return newLogs;
        });
    };

    // --- Helper Calculations ---
    const getLog = (exId) => logs[`w${currentWeek}-d${currentDay}-${exId}`] || { sets: [] };

    const calculateDailyProgress = (w, d) => {
        const { routine: dailyRoutine } = getRoutine(w, d);
        if (!dailyRoutine || dailyRoutine.length === 0) return 0;

        const completedCount = dailyRoutine.filter(ex => {
            const l = logs[`w${w}-d${d}-${ex.id}`];
            // An exercise is completed if the 'completed' flag is true (all sets logged)
            return l && l.completed;
        }).length;

        return Math.round((completedCount / dailyRoutine.length) * 100);
    };

    const totalWorkoutsCompleted = useMemo(() => {
        let count = 0;
        // We iterate over the 12 weeks, not just the current week's routine
        for (let w = 1; w <= 12; w++) {
            for (let d = 1; d <= 4; d++) {
                if (calculateDailyProgress(w, d) === 100) count++;
            }
        }
        return count;
    }, [logs]);

    // --- Views ---

    // 1. TRACKER VIEW
    const renderTracker = () => {
        return (
            <div className="space-y-6 pb-24">
                {/* Header / Week Selector */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-800">
                            {phaseName} <span className="text-blue-600">({currentWeek <= 4 ? 'W 1-4' : currentWeek <= 8 ? 'W 5-8' : 'W 9-12'})</span>
                        </h2>
                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Week {currentWeek}</span>
                            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Day {currentDay}</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{phaseGoal}</p>

                    {/* Week Slider - FIX: Increased padding on the right to ensure Weeks 9-12 are easily accessible */}
                    <div className="mb-6">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block" htmlFor="week-selector">Select Week</label>
                        <div
                            id="week-selector"
                            className="flex overflow-x-scroll pb-2 space-x-2 no-scrollbar snap-x snap-mandatory pr-8 mr-4" // Increased scroll area margin/padding
                        >
                            {[...Array(12)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentWeek(i + 1)}
                                    aria-label={`Select Week ${i + 1}`}
                                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all snap-center ${currentWeek === i + 1
                                        ? 'bg-blue-600 text-white shadow-lg scale-110'
                                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Day Tabs */}
                    <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((d) => {
                            const progress = calculateDailyProgress(currentWeek, d);
                            const isFull = progress === 100;
                            return (
                                <button
                                    key={d}
                                    onClick={() => setCurrentDay(d)}
                                    aria-label={`Select Day ${d}`}
                                    className={`relative py-2 rounded-lg text-sm font-semibold transition-all ${currentDay === d
                                        ? 'bg-slate-800 text-white shadow-md'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    Day {d}
                                    {isFull && (
                                        <div className="absolute -top-1 -right-1">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 fill-white" />
                                        </div>
                                    )}
                                    {/* Progress dot for partial days */}
                                    {!isFull && progress > 0 && (
                                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Progress Bar for Today */}
                <div className="px-1">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Daily Completion</span>
                        <span>{calculateDailyProgress(currentWeek, currentDay)}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500 ease-out"
                            style={{ width: `${calculateDailyProgress(currentWeek, currentDay)}%` }}
                        />
                    </div>
                </div>

                {/* Exercise Cards */}
                <div className="space-y-4">
                    {routine.map((ex) => {
                        const log = getLog(ex.id);
                        const isDone = log.completed;

                        // Default values for inputs
                        const defaultSets = ex.sets;
                        const defaultReps = parseInt(ex.reps.split('–')[0]) || 0;

                        // Current values from log (take from first set if available, else defaults)
                        const currentSetsVal = log.sets.length > 0 ? log.sets.length : defaultSets;
                        const currentRepsVal = log.sets.length > 0 ? log.sets[0].actualReps : defaultReps;
                        const currentWeightVal = log.sets.length > 0 ? log.sets[0].weight : '';

                        return (
                            <div
                                key={ex.id}
                                className={`relative overflow-hidden transition-all duration-300 rounded-xl border ${isDone
                                    ? 'bg-green-50 border-green-200 shadow-md'
                                    : 'bg-white border-slate-200 shadow-sm'
                                    }`}
                            >
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className={`font-bold text-lg ${isDone ? 'text-green-800' : 'text-slate-800'}`}>
                                                {ex.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mt-1">
                                                Target: {ex.sets} Sets of {ex.reps} {ex.unit}
                                            </p>
                                        </div>
                                        {/* Master Completion Status */}
                                        <div className={`p-2 rounded-full transition-colors ${isDone
                                            ? 'bg-green-500 text-white shadow-md'
                                            : 'bg-slate-100 text-slate-300'
                                            }`}
                                            aria-label={isDone ? `Completed all sets of ${ex.name}` : `Log sets for ${ex.name}`}>
                                            {isDone ? <CheckCircle2 className="w-6 h-6" /> : <Dumbbell className="w-6 h-6" />}
                                        </div>
                                    </div>

                                    {/* Batch Input Row */}
                                    <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                        <div className="flex gap-4">
                                            {/* Sets Input */}
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Sets</label>
                                                <input
                                                    type="number"
                                                    value={currentSetsVal}
                                                    onChange={(e) => updateBatchLog(ex.id, e.target.value, currentRepsVal, currentWeightVal)}
                                                    className="w-full text-center font-bold text-slate-700 bg-white border border-slate-200 rounded-md py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>

                                            {/* Reps Input */}
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">{ex.unit === 'sec' ? 'Secs' : 'Reps'}</label>
                                                <input
                                                    type="number"
                                                    value={currentRepsVal}
                                                    onChange={(e) => updateBatchLog(ex.id, currentSetsVal, e.target.value, currentWeightVal)}
                                                    className="w-full text-center font-bold text-slate-700 bg-white border border-slate-200 rounded-md py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>

                                            {/* Weight Input */}
                                            <div className="flex-[1.5]">
                                                <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Weight ({ex.unit === 'rounds' ? 'N/A' : 'kg'})</label>
                                                <input
                                                    type="text"
                                                    placeholder="kg"
                                                    value={currentWeightVal}
                                                    onChange={(e) => updateBatchLog(ex.id, currentSetsVal, currentRepsVal, e.target.value)}
                                                    disabled={ex.unit === 'rounds'}
                                                    className="w-full text-center font-bold text-slate-700 bg-white border border-slate-200 rounded-md py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // 2. STATS VIEW (UPDATED)
    const renderStats = () => {
        // Data Preparation
        const weeklyData = [...Array(12)].map((_, i) => {
            let completedDays = 0;
            for (let d = 1; d <= 4; d++) {
                if (calculateDailyProgress(i + 1, d) === 100) completedDays++;
            }
            return completedDays;
        });

        const volumeData = getVolumeData(logs);
        const muscleSplitData = getMuscleSplitData(logs);
        const prs = getPersonalRecords(logs);

        // Colors for Pie Chart
        const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

        return (
            <div className="space-y-8 pb-24">
                {/* Header Stats */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">{totalWorkoutsCompleted}</h2>
                    <p className="text-slate-500">Workouts Completed</p>
                    <div className="mt-4 text-xs font-medium text-slate-400 bg-slate-50 py-2 rounded-lg">
                        Target: 48 Workouts (12 Weeks × 4)
                    </div>
                </div>

                {/* 1. Consistency Heatmap */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-blue-500" />
                        Weekly Consistency
                    </h3>
                    <div className="flex items-end justify-between h-40 space-x-1">
                        {weeklyData.map((count, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 group relative">
                                <div
                                    className={`w-full rounded-t-sm transition-all duration-500 ${count === 4 ? 'bg-green-500' : count > 0 ? 'bg-blue-500' : 'bg-slate-200'}`}
                                    style={{ height: `${(count / 4) * 100}%` }}
                                />
                                <div className="h-1 w-full bg-slate-100 mt-1"></div>
                                <span className="text-[10px] text-slate-400 mt-2 font-medium">{i + 1}</span>
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {count}/4 Days
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Volume Load Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                        Volume Load (kg)
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={volumeData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="volume" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Muscle Split Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                        <Dumbbell className="w-5 h-5 mr-2 text-indigo-500" />
                        Training Split (Sets)
                    </h3>
                    <div className="h-64 w-full flex items-center justify-center">
                        {muscleSplitData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={muscleSplitData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {muscleSplitData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-slate-400 text-sm">No data yet</div>
                        )}
                    </div>
                    {/* Legend */}
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {muscleSplitData.map((entry, index) => (
                            <div key={index} className="flex items-center text-xs text-slate-600">
                                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Personal Records Board */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                        <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                        Personal Records
                    </h3>
                    <div className="space-y-3">
                        {prs.length > 0 ? prs.map((pr, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="font-medium text-sm text-slate-700">{pr.name}</span>
                                <div className="text-right">
                                    <span className="block font-bold text-slate-900">{pr.weight} kg</span>
                                    <span className="text-[10px] text-slate-400">{pr.date}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center text-slate-400 text-sm py-4">Log your lifts to see PRs!</div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // 3. SETTINGS VIEW (Now shows the full plan structure)
    const renderSettings = () => (
        <div className="pb-24 space-y-6">
            <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-2">Program Structure</h2>
                <p className="text-slate-300 text-sm">
                    The 12-week program details are locked by phase. Use the Track tab to log your performance!
                </p>
            </div>

            {Object.entries(WORKOUT_PLAN).map(([phaseKey, phase]) => (
                <div key={phaseKey} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="font-bold text-xl text-blue-600 border-b pb-2 border-slate-100">
                        <Zap className="inline w-5 h-5 mr-1 align-sub" /> {phase.name} (W {phase.weeks[0]}–{phase.weeks.at(-1)})
                    </h3>
                    <p className="text-sm text-slate-600 italic">{phase.goal}</p>

                    {Object.entries(phase.workouts).map(([dayKey, exercises]) => (
                        <div key={dayKey} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <h4 className="font-semibold text-slate-800 mb-2">{dayKey}</h4>
                            <ul className="space-y-1 text-sm text-slate-600">
                                {exercises.map((ex) => (
                                    <li key={ex.id} className="flex justify-between border-b border-dashed border-slate-200 pb-0.5">
                                        <span>{ex.name}</span>
                                        <span className="font-mono text-xs text-blue-700">
                                            {ex.sets}x {ex.reps} {ex.unit === 'reps' ? '' : `(${ex.unit})`}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
            <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-white shadow-2xl overflow-hidden">

                {/* Top Bar */}
                <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Weight className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-extrabold text-slate-800 tracking-tight text-lg">FitTrack<span className="text-blue-600">12</span></span>
                    </div>
                    <div className="text-xs font-semibold text-slate-400">
                        {activeTab === 'track' ? 'TRACKER' : activeTab === 'stats' ? 'ANALYTICS' : 'PROGRAM'}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                    {activeTab === 'track' && renderTracker()}
                    {activeTab === 'stats' && renderStats()}
                    {activeTab === 'settings' && renderSettings()}
                </div>

                {/* Bottom Navigation */}
                <div className="bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center sticky bottom-0 z-20 pb-safe">
                    <button
                        onClick={() => setActiveTab('track')}
                        className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'track' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <Calendar className="w-6 h-6" />
                        <span className="text-[10px] font-bold">Track</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'stats' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <TrendingUp className="w-6 h-6" />
                        <span className="text-[10px] font-bold">Progress</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'settings' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <Settings className="w-6 h-6" />
                        <span className="text-[10px] font-bold">Program</span>
                    </button>
                </div>

            </div>

            {/* CSS to hide scrollbar but allow functionality */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 1rem);
        }
      `}</style>
        </div>
    );
}