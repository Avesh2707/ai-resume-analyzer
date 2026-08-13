import {
  ClipboardCheck,
  FileOutput,
  Gauge,
  KeyRound,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: ClipboardCheck,
    title: 'ATS compatibility check',
    description: 'Flags formatting that trips up applicant tracking systems before a recruiter ever sees it.',
  },
  {
    icon: KeyRound,
    title: 'Keyword optimization',
    description: 'Compares your resume against a target role and highlights the terms you are missing.',
  },
  {
    icon: Gauge,
    title: 'Instant feedback',
    description: 'Get a line-by-line read on clarity, impact, and tone in seconds, not days.',
  },
  {
    icon: Sparkles,
    title: 'Impact rewriting',
    description: 'Turns flat task descriptions into outcome-driven bullet points.',
  },
  {
    icon: FileOutput,
    title: 'Multi-format export',
    description: 'Keep one source resume and export it cleanly for different applications.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-first by design',
    description: 'Your resume is yours — reviewed to help you, never sold or shared.',
  },
];

export default function Features() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-2xl">
        <Badge variant="outline">Features</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Everything a stronger resume needs, in one pass.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          These are the capabilities this product is being designed around. This page is a visual
          placeholder — none of the analysis below is connected yet.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </span>
              <CardTitle className="mt-3 text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
