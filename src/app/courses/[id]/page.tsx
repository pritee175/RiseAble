"use client";

import { useParams } from "next/navigation";
import CourseDetail from "@/components/courses/CourseDetail";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <CourseDetail courseId={id} />;
}
