"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface Link {
  id: string
  name: string
  url: string
}

interface Folder {
  id: string
  name: string
  type: "lessons" | "tp" | "td" | "exams"
  links: Link[]
}

interface Part {
  id: string
  name: string // Custom name for the part
  folders: Folder[]
}

interface Course {
  id: string
  title: string
  description: string
  semesterNumber: number
  parts: Part[]
}

interface Semester {
  id: string
  number: number
  courses: Course[]
}

interface CoursesContextType {
  semesters: Semester[]
  addCourse: (course: Omit<Course, "id">) => void
  updateCourse: (id: string, course: Omit<Course, "id">) => void
  deleteCourse: (id: string) => void
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined)

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const [semesters, setSemesters] = useState<Semester[]>([])

  // Load courses from localStorage on mount
  useEffect(() => {
    const savedSemesters = localStorage.getItem("cybersec-semesters")
    if (savedSemesters) {
      setSemesters(JSON.parse(savedSemesters))
    } else {
      // Add some sample courses for demonstration
      const sampleSemesters = [
        {
          id: "semester-1",
          number: 1,
          courses: [
            {
              id: "course-1",
              title: "Introduction to Cybersecurity",
              description: "Fundamental concepts of cybersecurity, threat landscape, and basic security principles.",
              semesterNumber: 1,
              parts: [
                {
                  id: "part-1-1",
                  name: "Fundamentals & Theory",
                  folders: [
                    {
                      id: "folder-1-1-1",
                      name: "Lessons",
                      type: "lessons",
                      links: [
                        {
                          id: "link-1-1-1-1",
                          name: "Introduction to Cybersecurity",
                          url: "https://drive.google.com/drive/folders/sample1-1-lessons-1",
                        },
                        {
                          id: "link-1-1-1-2",
                          name: "Threat Landscape Overview",
                          url: "https://drive.google.com/drive/folders/sample1-1-lessons-2",
                        },
                      ],
                    },
                    {
                      id: "folder-1-1-2",
                      name: "Practical Work (TP)",
                      type: "tp",
                      links: [
                        {
                          id: "link-1-1-2-1",
                          name: "Lab 1: Security Assessment",
                          url: "https://drive.google.com/drive/folders/sample1-1-tp-1",
                        },
                      ],
                    },
                    {
                      id: "folder-1-1-3",
                      name: "Directed Work (TD)",
                      type: "td",
                      links: [
                        {
                          id: "link-1-1-3-1",
                          name: "TD1: Risk Analysis",
                          url: "https://drive.google.com/drive/folders/sample1-1-td-1",
                        },
                      ],
                    },
                    {
                      id: "folder-1-1-4",
                      name: "Exams",
                      type: "exams",
                      links: [
                        {
                          id: "link-1-1-4-1",
                          name: "Midterm Exam",
                          url: "https://drive.google.com/drive/folders/sample1-1-exam-1",
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "part-1-2",
                  name: "Advanced Concepts & Practice",
                  folders: [
                    {
                      id: "folder-1-2-1",
                      name: "Lessons",
                      type: "lessons",
                      links: [
                        {
                          id: "link-1-2-1-1",
                          name: "Advanced Security Principles",
                          url: "https://drive.google.com/drive/folders/sample1-2-lessons-1",
                        },
                      ],
                    },
                    {
                      id: "folder-1-2-2",
                      name: "Practical Work (TP)",
                      type: "tp",
                      links: [
                        {
                          id: "link-1-2-2-1",
                          name: "Lab 2: Vulnerability Assessment",
                          url: "https://drive.google.com/drive/folders/sample1-2-tp-1",
                        },
                      ],
                    },
                    {
                      id: "folder-1-2-3",
                      name: "Directed Work (TD)",
                      type: "td",
                      links: [
                        {
                          id: "link-1-2-3-1",
                          name: "TD2: Security Policy Design",
                          url: "https://drive.google.com/drive/folders/sample1-2-td-1",
                        },
                      ],
                    },
                    {
                      id: "folder-1-2-4",
                      name: "Exams",
                      type: "exams",
                      links: [
                        {
                          id: "link-1-2-4-1",
                          name: "Final Exam",
                          url: "https://drive.google.com/drive/folders/sample1-2-exam-1",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]
      setSemesters(sampleSemesters)
      localStorage.setItem("cybersec-semesters", JSON.stringify(sampleSemesters))
    }
  }, [])

  // Save semesters to localStorage whenever semesters change
  useEffect(() => {
    localStorage.setItem("cybersec-semesters", JSON.stringify(semesters))
  }, [semesters])

  const addCourse = (courseData: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      parts: courseData.parts.map((part, partIndex) => ({
        ...part,
        id: `part-${Date.now()}-${partIndex}`,
        folders: part.folders.map((folder, folderIndex) => ({
          ...folder,
          id: `folder-${Date.now()}-${partIndex}-${folderIndex}`,
          links: folder.links.map((link, linkIndex) => ({
            ...link,
            id: `link-${Date.now()}-${partIndex}-${folderIndex}-${linkIndex}`,
          })),
        })),
      })),
    }

    setSemesters((prev) => {
      const existingSemesterIndex = prev.findIndex((s) => s.number === courseData.semesterNumber)

      if (existingSemesterIndex >= 0) {
        // Add to existing semester
        const updatedSemesters = [...prev]
        updatedSemesters[existingSemesterIndex] = {
          ...updatedSemesters[existingSemesterIndex],
          courses: [...updatedSemesters[existingSemesterIndex].courses, newCourse],
        }
        return updatedSemesters
      } else {
        // Create new semester
        const newSemester: Semester = {
          id: `semester-${courseData.semesterNumber}`,
          number: courseData.semesterNumber,
          courses: [newCourse],
        }
        return [...prev, newSemester].sort((a, b) => a.number - b.number)
      }
    })
  }

  const updateCourse = (courseId: string, courseData: Omit<Course, "id">) => {
    setSemesters((prev) => {
      return prev
        .map((semester) => ({
          ...semester,
          courses: semester.courses.map((course) =>
            course.id === courseId
              ? {
                  ...courseData,
                  id: courseId,
                  parts: courseData.parts.map((part, partIndex) => ({
                    ...part,
                    id: part.id || `part-${courseId}-${partIndex}`,
                    folders: part.folders.map((folder, folderIndex) => ({
                      ...folder,
                      id: folder.id || `folder-${courseId}-${partIndex}-${folderIndex}`,
                      links: folder.links.map((link, linkIndex) => ({
                        ...link,
                        id: link.id || `link-${courseId}-${partIndex}-${folderIndex}-${linkIndex}`,
                      })),
                    })),
                  })),
                }
              : course,
          ),
        }))
        .map((semester) => {
          // Move course to correct semester if semester number changed
          if (semester.courses.some((course) => course.id === courseId && course.semesterNumber !== semester.number)) {
            return {
              ...semester,
              courses: semester.courses.filter((course) => course.id !== courseId),
            }
          }
          return semester
        })
        .map((semester) => {
          // Add course to new semester if needed
          const updatedCourse = prev.flatMap((s) => s.courses).find((c) => c.id === courseId)
          if (
            updatedCourse &&
            updatedCourse.semesterNumber === semester.number &&
            !semester.courses.some((c) => c.id === courseId)
          ) {
            return {
              ...semester,
              courses: [...semester.courses, updatedCourse],
            }
          }
          return semester
        })
        .filter((semester) => semester.courses.length > 0) // Remove empty semesters
    })
  }

  const deleteCourse = (courseId: string) => {
    setSemesters(
      (prev) =>
        prev
          .map((semester) => ({
            ...semester,
            courses: semester.courses.filter((course) => course.id !== courseId),
          }))
          .filter((semester) => semester.courses.length > 0), // Remove empty semesters
    )
  }

  return (
    <CoursesContext.Provider value={{ semesters, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CoursesContext.Provider>
  )
}

export function useCourses() {
  const context = useContext(CoursesContext)
  if (context === undefined) {
    throw new Error("useCourses must be used within a CoursesProvider")
  }
  return context
}
