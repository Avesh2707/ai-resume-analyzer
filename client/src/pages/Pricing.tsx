import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    description: 'Get a first read on where your resume stands.',
    features: ['1 resume scan / month', 'Core ATS check', 'Basic keyword match'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$15',
    cadence: '/ month',
    description: 'For anyone actively applying and iterating.',
    features: [
      'Unlimited resume scans',
      'Full ATS compatibility report',
      'Role-targeted keyword matching',
      'Impact rewriting suggestions',
    ],
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$49',
    cadence: '/ month',
    description: 'For career coaches and small teams.',
    features: ['Everything in Pro', 'Up to 10 seats', 'Shared review templates', 'Priority support'],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline">Pricing</Badge>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Straightforward plans, no surprises.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          These prices are illustrative placeholders for this design preview — billing isn&apos;t
          connected yet.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              'flex flex-col',
              tier.highlighted && 'border-primary shadow-lg shadow-primary/10 lg:-translate-y-2'
            )}
          >
            <CardHeader>
              {tier.highlighted && (
                <Badge variant="highlight" className="mb-2 w-fit">
                  Most popular
                </Badge>
              )}
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-tight">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.cadence}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.highlighted ? 'default' : 'outline'} asChild>
                <Link to="/">Get started</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
