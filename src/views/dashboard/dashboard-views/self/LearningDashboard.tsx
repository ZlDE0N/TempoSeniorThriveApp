import React, { useState } from 'react';
import { BookOpen, GraduationCap, Brain, Star, Award, TrendingUp, Plus, CheckCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  completed: boolean;
  lastAccessed?: string;
  description: string;
  modules: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Digital Technology Basics',
    category: 'Technology',
    progress: 75,
    completed: false,
    lastAccessed: '2024-02-15',
    description: 'Learn essential digital skills for everyday use',
    modules: [
      { id: '1-1', title: 'Using Smartphones', completed: true },
      { id: '1-2', title: 'Internet Safety', completed: true },
      { id: '1-3', title: 'Online Communication', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Health & Wellness',
    category: 'Health',
    progress: 100,
    completed: true,
    lastAccessed: '2024-02-10',
    description: 'Understanding personal health management',
    modules: [
      { id: '2-1', title: 'Nutrition Basics', completed: true },
      { id: '2-2', title: 'Exercise Fundamentals', completed: true },
      { id: '2-3', title: 'Mental Wellness', completed: true }
    ]
  },
  {
    id: '3',
    title: 'Brain Training',
    category: 'Cognitive',
    progress: 40,
    completed: false,
    lastAccessed: '2024-02-14',
    description: 'Exercises to keep your mind sharp',
    modules: [
      { id: '3-1', title: 'Memory Games', completed: true },
      { id: '3-2', title: 'Problem Solving', completed: false },
      { id: '3-3', title: 'Pattern Recognition', completed: false }
    ]
  }
];

export default function LearningDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'technology', label: 'Technology' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'cognitive', label: 'Brain Training' },
    { id: 'lifestyle', label: 'Lifestyle' }
  ];

  const filteredCourses = selectedCategory === 'all'
    ? mockCourses
    : mockCourses.filter(course => 
        course.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  const completedCourses = mockCourses.filter(course => course.completed).length;
  const totalModules = mockCourses.reduce(
    (sum, course) => sum + course.modules.length, 0
  );
  const completedModules = mockCourses.reduce(
    (sum, course) => sum + course.modules.filter(m => m.completed).length, 0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Learning & Growth</h2>
          <p className="text-sm text-gray-500">Continue your learning journey</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Browse Courses
        </button>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary-light rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-primary font-medium">Courses</h3>
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-primary">
            {completedCourses}/{mockCourses.length}
          </p>
          <p className="text-sm text-primary-hover">Completed</p>
        </div>

        <div className="bg-secondary-light rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-secondary font-medium">Modules</h3>
            <GraduationCap className="h-5 w-5 text-secondary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-secondary">
            {completedModules}/{totalModules}
          </p>
          <p className="text-sm text-secondary-hover">Completed</p>
        </div>

        <div className="bg-accent-light rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-accent font-medium">Learning Streak</h3>
            <Star className="h-5 w-5 text-accent" />
          </div>
          <p className="mt-2 text-2xl font-bold text-accent">7 days</p>
          <p className="text-sm text-accent-hover">Current streak</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-green-600 font-medium">Achievements</h3>
            <Award className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-green-600">12</p>
          <p className="text-sm text-green-500">Learning badges</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.description}</p>
                </div>
                {course.completed && (
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Completed
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {course.modules.map((module) => (
                    <div key={module.id} className="flex items-center text-sm">
                      <CheckCircle className={`h-4 w-4 mr-2 ${
                        module.completed ? 'text-green-500' : 'text-gray-300'
                      }`} />
                      <span className={module.completed ? 'text-gray-500' : 'text-gray-700'}>
                        {module.title}
                      </span>
                    </div>
                  ))}
                </div>

                {course.lastAccessed && (
                  <div className="text-xs text-gray-500">
                    Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <button
                  className={`w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                    course.completed
                      ? 'text-primary border-primary hover:bg-primary-light'
                      : 'text-white bg-primary hover:bg-primary-hover'
                  }`}
                >
                  {course.completed ? 'Review Course' : 'Continue Learning'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}