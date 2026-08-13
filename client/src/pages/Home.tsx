import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, FileText, Target, Zap, 
  LineChart, Eye, UploadCloud, BrainCircuit, Briefcase 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VantaHeroBackground } from '@/components/home/VantaHeroBackground';
import { HeroAnalysisPreview } from '@/components/home/HeroAnalysisPreview';

export default function Home() {
  const [isExploring, setIsExploring] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative isolate min-h-screen flex items-center px-4 py-16 sm:px-6 sm:py-24 overflow-hidden">
        {/* Immersive Background */}
        <VantaHeroBackground isExploring={isExploring} />

        {/* Explore AI Toggle - subtle absolute positioning */}
        <div className="absolute top-6 right-6 z-20">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary/20 bg-background/20 backdrop-blur-sm"
            onClick={() => setIsExploring(!isExploring)}
          >
            <Eye className="w-3.5 h-3.5 mr-2" />
            {isExploring ? 'Calm AI' : 'Explore AI'}
          </Button>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8 w-full z-10 relative">
          
          {/* Text Content Area */}
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="highlight" className="gap-1.5 mb-6 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Resume Intelligence
            </Badge>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              Turn Your Resume Into{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Opportunities
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              AI analyzes your resume, boosts your ATS score, and matches you to the right job descriptions — instantly.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20" asChild>
                <Link to="/dashboard">
                  Upload Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-foreground" asChild>
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-sm text-muted-foreground font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050816] bg-secondary flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=transparent`} alt="avatar" />
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ job seekers</p>
            </div>
          </motion.div>

          {/* Glass Card UI Area */}
          <div className="w-full flex justify-center lg:justify-end mt-12 lg:mt-0">
            <HeroAnalysisPreview isExploring={isExploring} />
          </div>
        </div>
      </section>

      {/* SECTION 1: Features */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to get hired
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful AI tools to improve your resume, match the right roles, and apply with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'AI Resume Analysis', icon: FileText, desc: 'Deep semantic extraction of your skills, experience, and education.' },
              { title: 'ATS Score', icon: Target, desc: 'Instantly grade your resume against industry-standard ATS algorithms.' },
              { title: 'Job Match', icon: Briefcase, desc: 'Paste a job description to see exactly how well you align with the role.' },
              { title: 'Actionable Improvements', icon: Zap, desc: 'Get AI-driven suggestions to fix weaknesses and highlight strengths.' },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col items-start text-left overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="p-3 bg-primary/10 text-primary rounded-xl mb-4 relative z-10">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 relative z-10">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: How It Works */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How ResumeAI Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-border z-0" />
            
            {/* Connecting line for mobile */}
            <div className="md:hidden absolute left-1/2 top-[5%] bottom-[5%] w-0.5 -translate-x-1/2 bg-border z-0" />
            
            {[
              { step: '01', title: 'Upload Resume', icon: UploadCloud, desc: 'Securely upload your PDF.' },
              { step: '02', title: 'AI Analysis', icon: BrainCircuit, desc: 'Our engine extracts data.' },
              { step: '03', title: 'Match a Job', icon: Briefcase, desc: 'Paste your target job.' },
              { step: '04', title: 'Improve & Apply', icon: LineChart, desc: 'Optimize and get hired.' },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/20 text-primary flex items-center justify-center mb-6 shadow-sm">
                  <step.icon className="w-7 h-7" />
                </div>
                <Badge variant="outline" className="mb-3 font-mono bg-background">{step.step}</Badge>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: See your resume differently */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              See your resume differently
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI breaks down your resume exactly how an ATS would see it.
            </p>
          </div>
          
          <div className="relative mx-auto w-full rounded-3xl border border-white/10 bg-[#0a0f25] shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Left side - Resume summary */}
            <div className="p-8 md:w-1/3 bg-white/5 border-r border-white/10 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Jane Doe</h3>
                <p className="text-sm text-muted-foreground">Senior Frontend Developer</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Overall ATS Score</div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-emerald-400">92</span>
                    <span className="text-sm text-emerald-400/80 mb-1">/ 100</span>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                  <div className="text-xs text-primary/80 uppercase tracking-wider mb-1">Job Match</div>
                  <div className="text-3xl font-bold text-primary">High Match</div>
                  <p className="text-xs text-primary/60 mt-1">94% alignment with target role</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Breakdown */}
            <div className="p-8 md:w-2/3 flex flex-col justify-center gap-8">
              <div>
                <h4 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Top Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['React Ecosystem', 'Performance Optimization', 'Team Leadership'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-md bg-emerald-400/10 text-emerald-400 text-sm border border-emerald-400/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['GraphQL', 'CI/CD Pipelines'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-md bg-amber-400/10 text-amber-400 text-sm border border-amber-400/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-blue-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> AI Recommendation
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  "Your experience with React is well highlighted, but to increase your match rate for this specific role, explicitly mention your experience setting up CI/CD pipelines in your most recent position at TechCorp."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Final CTA */}
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Ready to improve your next application?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of professionals landing interviews faster with ResumeAI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-10 text-lg shadow-lg shadow-primary/20" asChild>
              <Link to="/dashboard">
                Analyze My Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-foreground" asChild>
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
