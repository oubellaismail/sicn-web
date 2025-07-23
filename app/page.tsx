import {
  Shield,
  Target,
  BookOpen,
  Users,
  Award,
  ChevronRight,
  Terminal,
  Lock,
  Zap,
  Building,
  Globe,
  Code,
  Database,
  Cloud,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gunmetal/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-gradient-to-r from-cyber-cyan to-cyan-400 rounded animate-glow">
                <Shield className="h-6 w-6 text-slate-900" />
              </div>
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-cyber-cyan to-cyan-300 bg-clip-text text-transparent">
                SICN - ENSA Agadir
              </span>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-cyber-cyan hover:text-cyan-300 font-medium transition-colors">
                Home
              </Link>
              <Link href="/courses" className="text-gray-400 hover:text-cyber-cyan font-medium transition-colors">
                Course Materials
              </Link>
              <Link href="/admin" className="text-gray-400 hover:text-cyber-cyan font-medium transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gunmetal via-slate-900 to-black"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300F7EF' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-r from-cyber-cyan/20 to-cyan-400/20 rounded-full border border-cyber-cyan/30 animate-glow">
              <Shield className="h-20 w-20 text-cyber-cyan" />
            </div>
          </div>
          <div className="mb-4">
            <span className="text-2xl">🎓</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-2">
              <span className="text-gray-100">Welcome to the</span>
            </h1>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              <span className="bg-gradient-to-r from-cyber-cyan via-cyan-400 to-cyber-purple bg-clip-text text-transparent">
                Cybersecurity & Digital Trust
              </span>
            </h1>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-100">Program</h1>
          </div>
          <div className="mb-6">
            <span className="text-xl">🔐</span>
            <p className="text-xl text-cyber-cyan font-semibold mb-2">
              Engineer's Program in IT Security and Digital Trust (SICN)
            </p>
            <p className="text-lg text-gray-400 font-medium">ENSA Agadir</p>
          </div>
          <p className="text-lg text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
            A cutting-edge engineering track designed to prepare future professionals to meet the increasing demands of
            securing digital systems and infrastructures in a rapidly evolving technological world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyber-cyan to-cyan-400 hover:from-cyan-300 hover:to-cyber-cyan text-slate-900 border-0 font-medium shadow-lg hover:shadow-cyber-cyan/25 transition-all duration-300"
            >
              <Link href="/courses">
                <Terminal className="mr-2 h-5 w-5" />
                Access Course Materials
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10 bg-transparent font-medium"
            >
              <Zap className="mr-2 h-4 w-4" />
              Download Program Modules (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gunmetal/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              <span className="text-2xl mr-2">🎯</span>
              <span className="bg-gradient-to-r from-cyber-cyan to-cyan-400 bg-clip-text text-transparent">
                Our Mission
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We aim to train skilled engineers who can secure the digital future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-gray-800 hover:border-cyber-cyan/50 transition-all duration-300 group">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full w-fit mb-4 border border-red-500/30">
                  <Target className="h-8 w-8 text-red-400" />
                </div>
                <CardTitle className="text-lg text-gray-100 group-hover:text-cyber-cyan transition-colors text-center font-heading">
                  Identify & Mitigate Vulnerabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center">
                  Master vulnerability assessment and mitigation techniques for IT systems
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-gray-800 hover:border-cyber-cyan/50 transition-all duration-300 group">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full w-fit mb-4 border border-green-500/30">
                  <Shield className="h-8 w-8 text-green-400" />
                </div>
                <CardTitle className="text-lg text-gray-100 group-hover:text-cyber-cyan transition-colors text-center font-heading">
                  Secure Digital Environments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center">
                  Protect networks, servers, mobile, IoT, and cloud infrastructures
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-gray-800 hover:border-cyber-cyan/50 transition-all duration-300 group">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-to-r from-cyber-purple/20 to-purple-500/20 rounded-full w-fit mb-4 border border-cyber-purple/30">
                  <BookOpen className="h-8 w-8 text-cyber-purple" />
                </div>
                <CardTitle className="text-lg text-gray-100 group-hover:text-cyber-cyan transition-colors text-center font-heading">
                  Implement Security Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center">
                  Deploy and audit security policies following ISO, NIST frameworks
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-gray-800 hover:border-cyber-cyan/50 transition-all duration-300 group">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-to-r from-cyber-cyan/20 to-cyan-400/20 rounded-full w-fit mb-4 border border-cyber-cyan/30">
                  <Users className="h-8 w-8 text-cyber-cyan" />
                </div>
                <CardTitle className="text-lg text-gray-100 group-hover:text-cyber-cyan transition-colors text-center font-heading">
                  Lead Security Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center">
                  Manage cybersecurity initiatives and ensure regulatory compliance
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-gray-800 hover:border-cyber-cyan/50 transition-all duration-300 group">
              <CardHeader>
                <div className="mx-auto p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full w-fit mb-4 border border-orange-500/30">
                  <Terminal className="h-8 w-8 text-orange-400" />
                </div>
                <CardTitle className="text-lg text-gray-100 group-hover:text-cyber-cyan transition-colors text-center font-heading">
                  Monitor & Counter Threats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center">
                  Track evolving threats and design effective countermeasures
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6">
                <span className="text-2xl mr-2">🧠</span>
                <span className="bg-gradient-to-r from-cyber-cyan to-cyan-400 bg-clip-text text-transparent">
                  Core Competencies
                </span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-cyber-cyan/20 to-cyan-400/20 rounded border border-cyber-cyan/30 mt-1">
                    <Lock className="w-4 h-4 text-cyber-cyan" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-100 text-lg">Information System Security</h3>
                    <p className="text-gray-400">Network protection and system security fundamentals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded border border-red-500/30 mt-1">
                    <Target className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-100 text-lg">Offensive & Defensive Security</h3>
                    <p className="text-gray-400">Advanced penetration testing and defense strategies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-cyber-purple/20 to-purple-500/20 rounded border border-cyber-purple/30 mt-1">
                    <Cloud className="w-4 h-4 text-cyber-purple" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-100 text-lg">DevSecOps & Cloud Security</h3>
                    <p className="text-gray-400">Blockchain integration and secure cloud architectures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded border border-green-500/30 mt-1">
                    <Code className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-100 text-lg">
                      Cryptography & Secure Development
                    </h3>
                    <p className="text-gray-400">Advanced cryptographic techniques and secure coding practices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-cyber-cyan/20 to-cyan-400/20 rounded border border-cyber-cyan/30 mt-1">
                    <Shield className="w-4 h-4 text-cyber-cyan" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-100 text-lg">Risk Management & Governance</h3>
                    <p className="text-gray-400">Security governance and comprehensive risk assessment</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-gunmetal rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-heading font-bold mb-6 text-gray-100">
                <span className="text-xl mr-2">💼</span>
                Career Opportunities
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-cyber-cyan/20 rounded border border-cyber-cyan/30">
                    <Shield className="h-4 w-4 text-cyber-cyan" />
                  </div>
                  <span className="text-gray-400">Cybersecurity Engineer</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-green-500/20 rounded border border-green-500/30">
                    <Target className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-gray-400">Security Analyst or Auditor</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-cyber-purple/20 rounded border border-cyber-purple/30">
                    <Terminal className="h-4 w-4 text-cyber-purple" />
                  </div>
                  <span className="text-gray-400">Network and Systems Administrator</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-orange-500/20 rounded border border-orange-500/30">
                    <Users className="h-4 w-4 text-orange-400" />
                  </div>
                  <span className="text-gray-400">IT Risk Manager</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-blue-500/20 rounded border border-blue-500/30">
                    <Building className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-gray-400">Security Consultant or Architect</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-red-500/20 rounded border border-red-500/30">
                    <Code className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-gray-400">DevSecOps Specialist</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Admission & Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gunmetal/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              <span className="text-2xl mr-2">🏫</span>
              <span className="bg-gradient-to-r from-cyber-cyan to-cyan-400 bg-clip-text text-transparent">
                Admission & Structure
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-100 font-heading">Who can apply?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyber-cyan rounded-full mt-2"></div>
                  <span className="text-gray-400">
                    Candidates with 2+ years of study in mathematics, computer science, or engineering
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span className="text-gray-400">
                    Through competitive application, interview, and academic transcript review
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-100 font-heading">Mode of Learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyber-purple rounded-full mt-2"></div>
                  <span className="text-gray-400">In-person and hybrid courses</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <span className="text-gray-400">Hands-on labs and capstone projects</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span className="text-gray-400">Collaboration with industry professionals</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">
              <span className="text-2xl mr-2">📚</span>
              <span className="bg-gradient-to-r from-cyber-cyan to-cyan-400 bg-clip-text text-transparent">
                What You'll Learn
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The program is organized over 5 academic semesters, covering key topics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code, title: "Programming & Data Structures", desc: "Python, Java", color: "cyber-cyan" },
              { icon: Terminal, title: "Operating Systems", desc: "Architecture & Administration", color: "green-400" },
              { icon: Database, title: "Databases", desc: "SQL & NoSQL", color: "cyber-purple" },
              { icon: Globe, title: "Web/Mobile Development", desc: "Security-focused development", color: "blue-400" },
              { icon: Cloud, title: "Virtualization & DevOps", desc: "Container security", color: "orange-400" },
              { icon: Shield, title: "Cloud Computing", desc: "Blockchain Security", color: "cyber-cyan" },
              {
                icon: Brain,
                title: "AI for Cybersecurity",
                desc: "Machine learning applications",
                color: "cyber-purple",
              },
              { icon: Award, title: "Security Standards", desc: "Auditing & Compliance", color: "yellow-400" },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-gray-800 hover:border-cyber-cyan/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 bg-gradient-to-r from-${item.color}/20 to-${item.color}/30 rounded border border-${item.color}/30`}
                    >
                      <item.icon className={`h-5 w-5 text-${item.color}`} />
                    </div>
                    <CardTitle className="text-lg text-gray-100 font-heading">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">{item.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gunmetal/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            <span className="text-2xl mr-2">🤝</span>
            <span className="bg-gradient-to-r from-cyber-cyan to-cyan-400 bg-clip-text text-transparent">
              Our Partners
            </span>
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            The SICN program is backed by strong collaborations with industry leaders
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-100 font-heading">Industry Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 font-mono">IBM, Oracle Labs, Sopra Banking, HPS, OXYLIOM, and more</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-gray-100 font-heading">Academic Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 font-mono">INSA France, University of Brest, and others</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            <span className="text-2xl mr-2">🚀</span>
            <span className="bg-gradient-to-r from-cyber-cyan to-cyan-400 bg-clip-text text-transparent">
              Your Cybersecurity Journey Starts Here
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Secure the future. Start your path to becoming a cybersecurity engineer at ENSA Agadir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyber-cyan to-cyan-400 hover:from-cyan-300 hover:to-cyber-cyan text-slate-900 border-0 font-medium shadow-lg hover:shadow-cyber-cyan/25 transition-all duration-300"
            >
              <Link href="/courses">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Course Materials
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10 bg-transparent font-medium"
            >
              <Users className="mr-2 h-4 w-4" />
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="p-1 bg-gradient-to-r from-cyber-cyan to-cyan-400 rounded animate-glow">
              <Shield className="h-5 w-5 text-slate-900" />
            </div>
            <span className="text-lg font-heading font-semibold bg-gradient-to-r from-cyber-cyan to-cyan-400 bg-clip-text text-transparent">
              SICN - ENSA Agadir
            </span>
          </div>
          <p className="text-gray-400">Cybersecurity and Digital Trust Program</p>
        </div>
      </footer>
    </div>
  )
}
