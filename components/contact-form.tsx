"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Send, User, Mail, MessageSquare } from "lucide-react"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-300 flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Full Name</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
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
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email address"
            className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-slate-300">
          Subject
        </Label>
        <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
          <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="general" className="text-white hover:bg-slate-700">
              General Inquiry
            </SelectItem>
            <SelectItem value="admission" className="text-white hover:bg-slate-700">
              Admission Information
            </SelectItem>
            <SelectItem value="curriculum" className="text-white hover:bg-slate-700">
              Curriculum Questions
            </SelectItem>
            <SelectItem value="partnership" className="text-white hover:bg-slate-700">
              Partnership Opportunities
            </SelectItem>
            <SelectItem value="technical" className="text-white hover:bg-slate-700">
              Technical Support
            </SelectItem>
            <SelectItem value="other" className="text-white hover:bg-slate-700">
              Other
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-slate-300 flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Message</span>
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Enter your message here..."
          rows={6}
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
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
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
  )
}
