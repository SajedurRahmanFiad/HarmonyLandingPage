import React from 'react';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  price: string;
  progress: number;
  entryDirection: { x: number; y: number };
  finalRotation: number;
  finalOffset: { x: number; y: number };
  lastWatched?: string;
  status?: string;
}

export interface CourseCardProps {
  course: Course;
  scrollProgress: any;
  index: number;
  isFailureScene?: boolean;
  failureProgress?: any; // 0 to 1 within Scene 2
}
