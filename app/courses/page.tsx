"use client"

import { Shield, ExternalLink, BookOpen, ChevronDown, ChevronRight, Folder, Terminal, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import { useCourses } from "@/hooks/use-courses"
import { useState } from "react"
import { ThreeScene } from "@/components/three-scene"
import { CyberShield } from "@/components/cyber-shield"
import { MatrixRain } from "@/components/matrix-rain"

export default function CoursesPage() {
  const { semesters } = useCourses()
  const [openSemesters, setOpenSemesters] = useState<Record<string, boolean>>({})
  const [openCourses, setOpenCourses] = useState<Record<string, boolean>>({})

  const toggleSemester = (semesterId: string) => {
    setOpenSemesters((prev) => ({ ...prev, [semesterId]: !prev[semesterId] }))
  }

  const toggleCourse = (courseId: string) => {
    setOpenCourses((prev) => ({ ...prev, [courseId]: !prev[courseId] }))
  }

  const getFolderIcon = (type: string) => {
    switch (type) {
      case "lessons":
        return <BookOpen className="h-4 w-4 text-cyan-400" />
      case "tp":
        return <Terminal className="h-4 w-4 text-green-400" />
      case "td":
        return <Users className="h-4 w-4 text-purple-400" />
      case "exams":
        return <Award className="h-4 w-4 text-orange-400" />
      default:
        return <Folder className="h-4 w-4 text-slate-400" />
    }
  }

  const getFolderColor = (type: string) => {
    switch (type) {
      case "lessons":
        return "border-cyan-500/30 bg-cyan-500/10"
      case "tp":
        return "border-green-500/30 bg-green-500/10"
      case "td":
        return "border-purple-500/30 bg-purple-500/10"
      case "exams":
        return "border-orange-500/30 bg-orange-500/10"
      default:
        return "border-slate-500/30 bg-slate-500/10"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background 3D Animation */}
      <div className="absolute inset-0 z-0">
        <ThreeScene className="w-full h-full opacity-10" />
      </div>

      {/* Matrix Rain Background */}
      <div className="absolute inset-0 z-0">
        <MatrixRain className="w-full h-full opacity-5" />
      </div>

      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                CyberSec Program
              </span>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
                Home
              </Link>
              <Link href="/courses" className="text-cyan-400 font-medium">
                Course Materials
              </Link>
              <Link href="/contact" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
                Contact
              </Link>
              <Link href="/admin" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6 relative">
            <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 relative">
              <CyberShield className="absolute inset-0 w-full h-full opacity-40" />
              <BookOpen className="h-12 w-12 text-cyan-400 relative z-10" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Course Materials
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Access comprehensive materials for all 6 semesters. Each course includes lessons, practical work (TP), and
            directed work (TD).
          </p>
        </div>
      </section>

      {/* Course Materials */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {semesters.length === 0 ? (
            <div className="text-center py-12">
              <div className="relative mb-4">
                <BookOpen className="h-16 w-16 text-slate-600 mx-auto relative z-10" />
                <div className="absolute inset-0 opacity-20">
                  <CyberShield className="w-full h-full" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No semesters available</h3>
              <p className="text-slate-400">Course materials will appear here once added by an administrator.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {semesters.map((semester) => (
                <Card key={semester.id} className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                  <Collapsible open={openSemesters[semester.id]} onOpenChange={() => toggleSemester(semester.id)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded border border-cyan-500/30 relative">
                              <BookOpen className="h-6 w-6 text-cyan-400 relative z-10" />
                              <div className="absolute inset-0 opacity-30">
                                <CyberShield className="w-full h-full" />
                              </div>
                            </div>
                            <div>
                              <CardTitle className="text-2xl text-white">Semester {semester.number}</CardTitle>
                              <CardDescription className="text-slate-400">
                                {semester.courses.length} courses available
                              </CardDescription>
                            </div>
                          </div>
                          {openSemesters[semester.id] ? (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="grid gap-4">
                          {(semester.courses ?? []).map((course) => (
                            <Card key={course.id} className="bg-slate-800/30 border-slate-600 backdrop-blur-sm">
                              <Collapsible open={openCourses[course.id]} onOpenChange={() => toggleCourse(course.id)}>
                                <CollapsibleTrigger asChild>
                                  <CardHeader className="cursor-pointer hover:bg-slate-700/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                                        <CardDescription className="text-slate-400">
                                          {course.description}
                                        </CardDescription>
                                      </div>
                                      {openCourses[course.id] ? (
                                        <ChevronDown className="h-4 w-4 text-slate-400" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4 text-slate-400" />
                                      )}
                                    </div>
                                  </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <CardContent className="pt-0">
                                    <div className="grid gap-6">
                                      {(course.parts ?? []).map((part) => (
                                        <div key={part.id} className="space-y-4">
                                          <h4 className="font-semibold text-white text-lg border-b border-slate-600 pb-2 flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                            <span>{part.name}</span>
                                          </h4>
                                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {(part.folders ?? []).map((folder) => (
                                              <div key={folder.id} className="space-y-2">
                                                <div
                                                  className={`p-3 rounded-lg border ${getFolderColor(folder.type)} backdrop-blur-sm`}
                                                >
                                                  <div className="flex items-center space-x-2 mb-3">
                                                    {getFolderIcon(folder.type)}
                                                    <span className="font-medium text-white text-sm">
                                                      {folder.name}
                                                    </span>
                                                  </div>
                                                  <div className="space-y-2">
                                                    {(folder.links ?? []).map((link) => (
                                                      <Button
                                                        key={link.id}
                                                        asChild
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-full justify-start text-xs h-8 hover:bg-white/10 text-slate-300 hover:text-white"
                                                      >
                                                        <a
                                                          href={link.url}
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          className="flex items-center space-x-2"
                                                        >
                                                          <span className="flex-1 text-left truncate">{link.name}</span>
                                                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                                                        </a>
                                                      </Button>
                                                    ))}
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </CollapsibleContent>
                              </Collapsible>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/80 border-t border-slate-800 py-12 mt-16 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Cybersecurity Program
                </span>
              </div>
              <p className="text-slate-400 mb-4">Forging the digital guardians of tomorrow</p>
              <div className="text-sm text-slate-500">
                <p>© 2024 Cybersecurity Program. All rights reserved.</p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/" className="hover:text-cyan-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-cyan-400 transition-colors">
                    Course Materials
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-cyan-400 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>📍 123 Cyber Street, Tech City</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ info@cybersecprogram.edu</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
