import { Target, Users, Compass } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const values = [
  {
    icon: Target,
    title: 'Clarity over noise',
    description: 'Every suggestion points at one specific line and one specific fix — never a vague score.',
  },
  {
    icon: Users,
    title: 'Built with hiring teams',
    description: 'Feedback patterns are shaped by conversations with recruiters and hiring managers.',
  },
  {
    icon: Compass,
    title: 'Guidance, not gatekeeping',
    description: 'The goal is a stronger resume in your voice, not a generic template.',
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <Badge variant="outline">About</Badge>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Built for the moment a resume gets a six-second glance.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        ResumeAI started from a simple frustration: good candidates were getting filtered out before
        a human ever read their story. This page is a placeholder for our full story — the content
        below illustrates the shape it will take.
      </p>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title}>
            <CardHeader>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <value.icon className="h-5 w-5" />
              </span>
              <CardTitle className="mt-3 text-lg">{value.title}</CardTitle>
              <CardDescription>{value.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
