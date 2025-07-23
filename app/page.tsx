"use client"

import { Shield, Users, Award, BookOpen, Globe, MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { ThreeScene } from "@/components/three-scene"
import { CyberShield } from "@/components/cyber-shield"
import { MatrixRain } from "@/components/matrix-rain"
import { PartnerSlider } from "@/components/partner-slider"
import { ContactForm } from "@/components/contact-form"

export default function HomePage() {
  const coreCompetencies = [
    {
      icon: <Shield className="h-8 w-8 text-cyan-400" />,
      title: "Network Security",
      description:
        "Master the fundamentals of securing network infrastructure, implementing firewalls, and monitoring network traffic.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-400" />,
      title: "Ethical Hacking",
      description:
        "Learn penetration testing, vulnerability assessment, and ethical hacking methodologies to identify security weaknesses.",
    },
    {
      icon: <Award className="h-8 w-8 text-green-400" />,
      title: "Digital Forensics",
      description:
        "Develop skills in investigating cyber crimes, analyzing digital evidence, and conducting forensic examinations.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-400" />,
      title: "Cryptography",
      description: "Understand encryption algorithms, cryptographic protocols, and secure communication systems.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-400" />,
      title: "Incident Response",
      description:
        "Learn to respond to security incidents, contain threats, and implement recovery procedures effectively.",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-400" />,
      title: "Risk Management",
      description:
        "Assess security risks, develop mitigation strategies, and implement comprehensive security policies.",
    },
  ]

  const careerOpportunities = [
    "Cybersecurity Analyst",
    "Information Security Manager",
    "Penetration Tester",
    "Security Consultant",
    "Digital Forensics Investigator",
    "Chief Information Security Officer (CISO)",
  ]

  const faqData = [
    {
      question: "What are the admission requirements for the cybersecurity program?",
      answer:
        "Applicants need a high school diploma or equivalent, basic computer literacy, and a strong interest in cybersecurity. Some programming knowledge is helpful but not required as we cover fundamentals in the curriculum.",
    },
    {
      question: "How long does the program take to complete?",
      answer:
        "The program is designed as a 3-year curriculum spanning 6 semesters. Each semester is approximately 4-5 months long, with intensive hands-on training and practical projects.",
    },
    {
      question: "What certifications will I be prepared for after graduation?",
      answer:
        "Graduates will be prepared for industry-standard certifications including CompTIA Security+, CEH (Certified Ethical Hacker), CISSP, and other specialized cybersecurity certifications.",
    },
    {
      question: "Are there internship opportunities available?",
      answer:
        "Yes, we have partnerships with leading cybersecurity firms and organizations that offer internship opportunities to our students during their final semester and summer breaks.",
    },
    {
      question: "What is the job placement rate for graduates?",
      answer:
        "Our program maintains a 95% job placement rate within 6 months of graduation, with graduates working at top cybersecurity firms, government agencies, and Fortune 500 companies.",
    },
    {
      question: "Is financial aid available for the program?",
      answer:
        "Yes, we offer various financial aid options including scholarships, grants, and flexible payment plans. Our financial aid office can help you explore all available options.",
    },
    {
      question: "Can I study part-time while working?",
      answer:
        "We offer both full-time and part-time study options. Our evening and weekend classes are designed for working professionals who want to transition into cybersecurity.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background 3D Animation */}
      <div className="absolute inset-0 z-0">
        <ThreeScene className="w-full h-full opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="border-b border-slate-800/50 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
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
              <Link href="/" className="text-cyan-400 font-medium">
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

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="absolute inset-0 z-0">
          <MatrixRain className="w-full h-full opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <CyberShield className="w-32 h-32 opacity-80" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cybersecurity
            </span>
            <br />
            <span className="text-white">Excellence</span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Forge your path as a digital guardian. Our comprehensive cybersecurity program combines cutting-edge theory
            with hands-on practice to prepare you for the evolving landscape of cyber threats.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-lg px-8 py-3"
            >
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Our Mission
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              To cultivate the next generation of cybersecurity professionals through innovative education, practical
              training, and industry partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Core Competencies
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Master essential cybersecurity skills through our comprehensive curriculum
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            <div className="absolute inset-0 z-0 opacity-5">
              <CyberShield className="w-full h-full" />
            </div>

            {coreCompetencies.map((competency, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 backdrop-blur-sm relative z-10">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-800/50 rounded border border-slate-600">{competency.icon}</div>
                    <CardTitle className="text-white">{competency.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{competency.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Career Opportunities
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Launch your career in high-demand cybersecurity roles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerOpportunities.map((career, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-white font-medium">{career}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Program Structure
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              A comprehensive 3-year program designed for cybersecurity excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400">Year 1: Foundations</CardTitle>
                <CardDescription className="text-slate-400">Semesters 1-2</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li>• Computer Networks Fundamentals</li>
                  <li>• Operating Systems Security</li>
                  <li>• Programming for Security</li>
                  <li>• Cryptography Basics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-400">Year 2: Specialization</CardTitle>
                <CardDescription className="text-slate-400">Semesters 3-4</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li>• Ethical Hacking & Penetration Testing</li>
                  <li>• Digital Forensics</li>
                  <li>• Incident Response</li>
                  <li>• Security Architecture</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-400">Year 3: Mastery</CardTitle>
                <CardDescription className="text-slate-400">Semesters 5-6</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li>• Advanced Threat Analysis</li>
                  <li>• Security Management</li>
                  <li>• Capstone Project</li>
                  <li>• Industry Internship</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Industry Partners
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Collaborating with leading cybersecurity organizations to provide real-world experience
            </p>
          </div>

          <PartnerSlider />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-lg text-slate-300">Get answers to common questions about our cybersecurity program</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-900/50 border border-slate-700 rounded-lg px-6 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-white hover:text-cyan-400 text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-300 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-lg text-slate-300">Ready to start your cybersecurity journey? Contact us today</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Send us a message</h3>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>

              <div className="grid gap-6">
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-cyan-500/20 rounded border border-cyan-500/30">
                        <MapPin className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Visit Us</h4>
                        <p className="text-slate-400">
                          123 Cyber Street
                          <br />
                          Tech City, TC 12345
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-green-500/20 rounded border border-green-500/30">
                        <Phone className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Call Us</h4>
                        <p className="text-slate-400">
                          +1 (555) 123-4567
                          <br />
                          +1 (555) 987-6543
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-purple-500/20 rounded border border-purple-500/30">
                        <Mail className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Email Us</h4>
                        <p className="text-slate-400">
                          info@cybersecprogram.edu
                          <br />
                          admissions@cybersecprogram.edu
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-orange-500/20 rounded border border-orange-500/30">
                        <Clock className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Office Hours</h4>
                        <p className="text-slate-400">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
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
