"use client"

import { useState } from "react"
import { Shield, Plus, Edit, Trash2, Eye, EyeOff, BookOpen, Terminal, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useCourses } from "@/hooks/use-courses"
import { useAuth } from "@/hooks/use-auth"
import { ThreeScene } from "@/components/three-scene"
import { CyberShield } from "@/components/cyber-shield"
import { MatrixRain } from "@/components/matrix-rain"

export default function AdminPage() {
  const { isAuthenticated, login, logout } = useAuth()
  const { semesters, addCourse, updateCourse, deleteCourse } = useCourses()

  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [courseForm, setCourseForm] = useState({
    semesterNumber: "",
    title: "",
    description: "",
    parts: [
      {
        name: "",
        folders: [
          { type: "lessons", links: [{ name: "", url: "" }] },
          { type: "tp", links: [{ name: "", url: "" }] },
          { type: "td", links: [{ name: "", url: "" }] },
          { type: "exams", links: [{ name: "", url: "" }] },
        ],
      },
      {
        name: "",
        folders: [
          { type: "lessons", links: [{ name: "", url: "" }] },
          { type: "tp", links: [{ name: "", url: "" }] },
          { type: "td", links: [{ name: "", url: "" }] },
          { type: "exams", links: [{ name: "", url: "" }] },
        ],
      },
    ],
  })
  const [editingCourse, setEditingCourse] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    login(loginForm.username, loginForm.password)
  }

  const addLinkToFolder = (partIndex: number, folderIndex: number) => {
    setCourseForm((prev) => ({
      ...prev,
      parts: prev.parts.map((part, pIdx) =>
        pIdx === partIndex
          ? {
              ...part,
              folders: part.folders.map((folder, fIdx) =>
                fIdx === folderIndex ? { ...folder, links: [...folder.links, { name: "", url: "" }] } : folder,
              ),
            }
          : part,
      ),
    }))
  }

  const removeLinkFromFolder = (partIndex: number, folderIndex: number, linkIndex: number) => {
    setCourseForm((prev) => ({
      ...prev,
      parts: prev.parts.map((part, pIdx) =>
        pIdx === partIndex
          ? {
              ...part,
              folders: part.folders.map((folder, fIdx) =>
                fIdx === folderIndex
                  ? { ...folder, links: folder.links.filter((_, lIdx) => lIdx !== linkIndex) }
                  : folder,
              ),
            }
          : part,
      ),
    }))
  }

  const updateLink = (partIndex: number, folderIndex: number, linkIndex: number, field: string, value: string) => {
    setCourseForm((prev) => ({
      ...prev,
      parts: prev.parts.map((part, pIdx) =>
        pIdx === partIndex
          ? {
              ...part,
              folders: part.folders.map((folder, fIdx) =>
                fIdx === folderIndex
                  ? {
                      ...folder,
                      links: folder.links.map((link, lIdx) =>
                        lIdx === linkIndex ? { ...link, [field]: value } : link,
                      ),
                    }
                  : folder,
              ),
            }
          : part,
      ),
    }))
  }

  const updatePartName = (partIndex: number, name: string) => {
    setCourseForm((prev) => ({
      ...prev,
      parts: prev.parts.map((part, pIdx) => (pIdx === partIndex ? { ...part, name } : part)),
    }))
  }

  const handleSubmitCourse = (e) => {
    e.preventDefault()
    const courseData = {
      semesterNumber: Number.parseInt(courseForm.semesterNumber),
      title: courseForm.title,
      description: courseForm.description,
      parts: courseForm.parts.map((part, partIndex) => ({
        name: part.name,
        folders: part.folders.map((folder, folderIndex) => ({
          name: folderNames[folder.type],
          type: folder.type,
          links: folder.links.filter((link) => link.name && link.url),
        })),
      })),
    }

    if (editingCourse) {
      updateCourse(editingCourse.id, courseData)
    } else {
      addCourse(courseData)
    }

    setCourseForm({
      semesterNumber: "",
      title: "",
      description: "",
      parts: [
        {
          name: "",
          folders: [
            { type: "lessons", links: [{ name: "", url: "" }] },
            { type: "tp", links: [{ name: "", url: "" }] },
            { type: "td", links: [{ name: "", url: "" }] },
            { type: "exams", links: [{ name: "", url: "" }] },
          ],
        },
        {
          name: "",
          folders: [
            { type: "lessons", links: [{ name: "", url: "" }] },
            { type: "tp", links: [{ name: "", url: "" }] },
            { type: "td", links: [{ name: "", url: "" }] },
            { type: "exams", links: [{ name: "", url: "" }] },
          ],
        },
      ],
    })
    setEditingCourse(null)
    setIsDialogOpen(false)
  }

  const handleEditCourse = (course) => {
    setEditingCourse(course)
    setCourseForm({
      semesterNumber: course.semesterNumber.toString(),
      title: course.title,
      description: course.description,
      parts: [
        {
          name: course.parts[0]?.name || "",
          folders: [
            {
              type: "lessons",
              links: course.parts[0]?.folders.find((f) => f.type === "lessons")?.links || [{ name: "", url: "" }],
            },
            {
              type: "tp",
              links: course.parts[0]?.folders.find((f) => f.type === "tp")?.links || [{ name: "", url: "" }],
            },
            {
              type: "td",
              links: course.parts[0]?.folders.find((f) => f.type === "td")?.links || [{ name: "", url: "" }],
            },
            {
              type: "exams",
              links: course.parts[0]?.folders.find((f) => f.type === "exams")?.links || [{ name: "", url: "" }],
            },
          ],
        },
        {
          name: course.parts[1]?.name || "",
          folders: [
            {
              type: "lessons",
              links: course.parts[1]?.folders.find((f) => f.type === "lessons")?.links || [{ name: "", url: "" }],
            },
            {
              type: "tp",
              links: course.parts[1]?.folders.find((f) => f.type === "tp")?.links || [{ name: "", url: "" }],
            },
            {
              type: "td",
              links: course.parts[1]?.folders.find((f) => f.type === "td")?.links || [{ name: "", url: "" }],
            },
            {
              type: "exams",
              links: course.parts[1]?.folders.find((f) => f.type === "exams")?.links || [{ name: "", url: "" }],
            },
          ],
        },
      ],
    })
    setIsDialogOpen(true)
  }

  const folderNames = { lessons: "Lessons", tp: "Practical Work (TP)", td: "Directed Work (TD)", exams: "Exams" }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
        {/* Background 3D Animation */}
        <div className="absolute inset-0 z-0">
          <ThreeScene className="w-full h-full opacity-20" />
        </div>

        {/* Matrix Rain Background */}
        <div className="absolute inset-0 z-0">
          <MatrixRain className="w-full h-full opacity-10" />
        </div>

        {/* Navigation */}
        <nav className="border-b border-slate-800/50 bg-slate-900/60 backdrop-blur-md relative z-10">
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
                <Link href="/courses" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
                  Course Materials
                </Link>
                <Link href="/#faq" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Login Form */}
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 relative z-10">
          <Card className="w-full max-w-md bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full w-fit mb-4 border border-cyan-500/30 relative">
                <CyberShield className="absolute inset-0 w-full h-full opacity-30" />
                <Shield className="h-8 w-8 text-cyan-400 relative z-10" />
              </div>
              <CardTitle className="text-2xl text-white">Admin Access</CardTitle>
              <CardDescription className="text-slate-400">
                Enter your credentials to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-300">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="bg-slate-800/50 border-slate-600 text-white pr-10 backdrop-blur-sm"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                >
                  Access Admin Panel
                </Button>
              </form>
              <div className="mt-4 p-3 bg-slate-800/50 rounded-lg text-sm text-slate-400 border border-slate-700 backdrop-blur-sm">
                <p className="font-medium mb-1 text-cyan-400">Demo credentials:</p>
                <p>Username: admin</p>
                <p>Password: cybersec2024</p>
              </div>
            </CardContent>
          </Card>
        </div>

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

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background 3D Animation */}
      <div className="absolute inset-0 z-0">
        <ThreeScene className="w-full h-full opacity-10" />
      </div>

      {/* Navigation */}
      <nav className="border-b border-slate-800/50 bg-slate-900/60 backdrop-blur-md relative z-10">
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
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
                Home
              </Link>
              <Link href="/courses" className="text-slate-300 hover:text-cyan-400 font-medium transition-colors">
                Course Materials
              </Link>
              <span className="text-cyan-400 font-medium">Admin</span>
              <Button
                variant="outline"
                onClick={logout}
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <CyberShield className="w-16 h-16 opacity-60" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-slate-400 mt-2">Manage course materials and semester structure</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                onClick={() => {
                  setEditingCourse(null)
                  setCourseForm({
                    semesterNumber: "",
                    title: "",
                    description: "",
                    parts: [
                      {
                        name: "",
                        folders: [
                          { type: "lessons", links: [{ name: "", url: "" }] },
                          { type: "tp", links: [{ name: "", url: "" }] },
                          { type: "td", links: [{ name: "", url: "" }] },
                          { type: "exams", links: [{ name: "", url: "" }] },
                        ],
                      },
                      {
                        name: "",
                        folders: [
                          { type: "lessons", links: [{ name: "", url: "" }] },
                          { type: "tp", links: [{ name: "", url: "" }] },
                          { type: "td", links: [{ name: "", url: "" }] },
                          { type: "exams", links: [{ name: "", url: "" }] },
                        ],
                      },
                    ],
                  })
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-slate-900/95 border-slate-700 text-white backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="text-white">{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {editingCourse
                    ? "Update the course information below."
                    : "Fill in the details for the new course material."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitCourse}>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="semester" className="text-slate-300">
                        Semester
                      </Label>
                      <Select
                        value={courseForm.semesterNumber}
                        onValueChange={(value) => setCourseForm({ ...courseForm, semesterNumber: value })}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm">
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem key={num} value={num.toString()} className="text-white hover:bg-slate-700">
                              Semester {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-slate-300">
                        Course Title
                      </Label>
                      <Input
                        id="title"
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        placeholder="e.g., Network Security Fundamentals"
                        className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      placeholder="Brief description of the course content..."
                      className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
                      required
                    />
                  </div>

                  <Tabs defaultValue="part0" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 backdrop-blur-sm">
                      <TabsTrigger value="part0" className="text-white data-[state=active]:bg-slate-700">
                        Part 1
                      </TabsTrigger>
                      <TabsTrigger value="part1" className="text-white data-[state=active]:bg-slate-700">
                        Part 2
                      </TabsTrigger>
                    </TabsList>

                    {courseForm.parts.map((part, partIndex) => (
                      <TabsContent key={partIndex} value={`part${partIndex}`} className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-slate-300">Part Name</Label>
                          <Input
                            value={part.name}
                            onChange={(e) => updatePartName(partIndex, e.target.value)}
                            placeholder={`e.g., Fundamentals & Theory`}
                            className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
                            required
                          />
                        </div>

                        {part.folders.map((folder, folderIndex) => {
                          const folderNames = {
                            lessons: "Lessons",
                            tp: "Practical Work (TP)",
                            td: "Directed Work (TD)",
                            exams: "Exams",
                          }
                          return (
                            <div
                              key={folderIndex}
                              className="space-y-3 p-4 bg-slate-800/30 rounded-lg border border-slate-600 backdrop-blur-sm"
                            >
                              <h4 className="font-medium text-white flex items-center space-x-2">
                                {folder.type === "lessons" && <BookOpen className="h-4 w-4 text-cyan-400" />}
                                {folder.type === "tp" && <Terminal className="h-4 w-4 text-green-400" />}
                                {folder.type === "td" && <Users className="h-4 w-4 text-purple-400" />}
                                {folder.type === "exams" && <Award className="h-4 w-4 text-orange-400" />}
                                <span>{folderNames[folder.type]}</span>
                              </h4>

                              {folder.links.map((link, linkIndex) => (
                                <div key={linkIndex} className="grid grid-cols-5 gap-2 items-end">
                                  <div className="col-span-2">
                                    <Label className="text-slate-400 text-xs">Link Name</Label>
                                    <Input
                                      value={link.name}
                                      onChange={(e) =>
                                        updateLink(partIndex, folderIndex, linkIndex, "name", e.target.value)
                                      }
                                      placeholder="e.g., Introduction Lesson"
                                      className="bg-slate-700/50 border-slate-600 text-white text-sm backdrop-blur-sm"
                                      required
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <Label className="text-slate-400 text-xs">Drive URL</Label>
                                    <Input
                                      type="url"
                                      value={link.url}
                                      onChange={(e) =>
                                        updateLink(partIndex, folderIndex, linkIndex, "url", e.target.value)
                                      }
                                      placeholder="https://drive.google.com/..."
                                      className="bg-slate-700/50 border-slate-600 text-white text-sm backdrop-blur-sm"
                                      required
                                    />
                                  </div>
                                  <div className="flex space-x-1">
                                    {folder.links.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeLinkFromFolder(partIndex, folderIndex, linkIndex)}
                                        className="border-red-600/50 text-red-400 hover:bg-red-600/10 bg-transparent px-2"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addLinkToFolder(partIndex, folderIndex)}
                                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Link
                              </Button>
                            </div>
                          )
                        })}
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                  >
                    {editingCourse ? "Update Course" : "Add Course"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Semester Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3, 4, 5, 6].map((semesterNum) => {
            const semester = semesters.find((s) => s.number === semesterNum)
            const courseCount = semester?.courses.length || 0
            return (
              <Card key={semesterNum} className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded border border-cyan-500/30 relative">
                      <BookOpen className="h-5 w-5 text-cyan-400 relative z-10" />
                      <div className="absolute inset-0 opacity-20">
                        <CyberShield className="w-full h-full" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">Semester {semesterNum}</CardTitle>
                      <CardDescription className="text-slate-400">{courseCount}/7 courses</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Course List */}
        <div className="space-y-6">
          {semesters.length === 0 ? (
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <div className="relative mb-4">
                  <Plus className="h-16 w-16 text-slate-600 mx-auto relative z-10" />
                  <div className="absolute inset-0 opacity-20">
                    <CyberShield className="w-full h-full" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No courses yet</h3>
                <p className="text-slate-400">Add your first course to get started.</p>
              </CardContent>
            </Card>
          ) : (
            semesters.map((semester) => (
              <Card key={semester.id} className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-cyan-400" />
                    <span>Semester {semester.number}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {semester.courses.map((course) => (
                      <Card key={course.id} className="bg-slate-800/30 border-slate-600 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                              <CardDescription className="text-slate-400 mt-2">{course.description}</CardDescription>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {course.parts.map((part, partIndex) => (
                                  <div key={partIndex} className="text-xs text-slate-500">
                                    {part.name}: {part.folders.length} folders
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditCourse(course)}
                                className="border-slate-600 text-slate-300 hover:bg-slate-700"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-600/50 text-red-400 hover:bg-red-600/10 bg-transparent"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-slate-900/95 border-slate-700 backdrop-blur-sm">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-white">Delete Course</AlertDialogTitle>
                                    <AlertDialogDescription className="text-slate-400">
                                      Are you sure you want to delete "{course.title}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700">
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteCourse(course.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

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
