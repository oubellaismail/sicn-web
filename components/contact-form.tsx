"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Send, User, MessageSquare } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "",
      })
    }, 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
              <Send className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
          <p className="text-slate-400">
            Thank you for your interest in our cybersecurity program. We'll get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-cyan-500/20 rounded border border-cyan-500/30">
            <Mail className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <CardTitle className="text-white">Contact Us</CardTitle>
            <CardDescription className="text-slate-400">Get in touch with our admissions team</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300 flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType" className="text-slate-300">
              Inquiry Type
            </Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleChange("inquiryType", value)}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="admissions" className="text-white hover:bg-slate-700">
                  Admissions Information
                </SelectItem>
                <SelectItem value="curriculum" className="text-white hover:bg-slate-700">
                  Curriculum Details
                </SelectItem>
                <SelectItem value="financial" className="text-white hover:bg-slate-700">
                  Financial Aid
                </SelectItem>
                <SelectItem value="career" className="text-white hover:bg-slate-700">
                  Career Services
                </SelectItem>
                <SelectItem value="other" className="text-white hover:bg-slate-700">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-slate-300">
              Subject
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Brief subject line"
              className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-300 flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Message</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Tell us more about your inquiry..."
              rows={5}
              className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-600 backdrop-blur-sm">
          <p className="text-sm text-slate-400 text-center">
            <span className="text-cyan-400">💡 Quick Tip:</span> For faster response, include your preferred contact
            method and best time to reach you.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
