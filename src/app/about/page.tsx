import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Target, Recycle, BrainCircuit, Handshake } from 'lucide-react';
import { TeamMemberCard } from './_components/team-member-card';

const teamMembers = [
  {
    name: 'Kunal Rawat',
    role: 'Team Lead & Backend Designer',
    bio: 'Responsible for the backend architecture and leading the team.',
    image: 'https://picsum.photos/seed/kunal/400/400',
    aiHint: 'man portrait student',
  },
  {
    name: 'Dhiraj Kumar',
    role: 'Frontend Designer',
    bio: 'Designs and implements the user-facing components of the application.',
    image: 'https://picsum.photos/seed/dhiraj/400/400',
    aiHint: 'man portrait developer',
  },
  {
    name: 'Aditya Kumar',
    role: 'UI Designer',
    bio: 'Focuses on the visual design and user experience of the interface.',
    image: 'https://picsum.photos/seed/aditya/400/400',
    aiHint: 'man portrait designer',
  },
  {
    name: 'Nishant Paliwal',
    role: 'PPT Maker & Theme Selector',
    bio: 'Creates presentations and selects the visual theme for the project.',
    image: 'https://picsum.photos/seed/nishant/400/400',
    aiHint: 'man portrait creative',
  },
];

const values = [
    { icon: Handshake, title: "Authenticity", description: "Providing genuine, well-researched information." },
    { icon: Recycle, title: "Sustainability", description: "Promoting responsible and eco-friendly travel." },
    { icon: BrainCircuit, title: "Innovation", description: "Using technology to simplify travel planning." },
    { icon: Target, title: "Accessibility", description: "Making travel information available to all." },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">About TripEase</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We are a team of passionate travelers and tech enthusiasts dedicated to making your travel planning seamless, informative, and exciting.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-headline text-3xl font-bold text-center mb-8">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-xl font-semibold">Discover</h3>
            <p className="text-muted-foreground mt-2">Effortlessly find destinations that match your travel style.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-xl font-semibold">Plan</h3>
            <p className="text-muted-foreground mt-2">Access all essential information in one place to plan with confidence.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-xl font-semibold">Experience</h3>
            <p className="text-muted-foreground mt-2">Travel smarter with cultural insights and practical tips for a richer experience.</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-headline text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-headline text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
                <Card key={value.title} className='text-center'>
                    <CardHeader className='items-center'>
                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-accent/10 text-accent mb-4">
                            <value.icon className="h-7 w-7" />
                        </div>
                        <CardTitle className='font-headline text-xl'>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
