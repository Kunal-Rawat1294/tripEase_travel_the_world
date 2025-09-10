import Image from 'next/image';
import { Check } from 'lucide-react';
import { TeamMemberCard } from './_components/team-member-card';

const teamMembers = [
  {
    name: 'Kunal Rawat',
    role: 'Backend Designer',
    bio: 'The visionary leader orchestrating the technical architecture and backend development of our travel platform.',
    image: '/myphoto.jpg'
  },
  {
    name: 'Dhiraj Kumar',
    role: 'Frontend Designer',
    bio: 'The creative force translating our vision into a beautiful and intuitive user interface.',
    image: '/dhiraj.jpg'
  },
  {
    name: 'Aditya Kumar',
    role: 'UI Designer',
    bio: 'The meticulous designer focused on crafting a seamless and visually appealing user experience across the app.',
    image: '/adityaKumar.jpg'
  },
  {
    name: 'Nishant Paliwal',
    role: 'PPT Maker & Theme Selector',
    bio: "The strategist who defines our project's narrative and visual identity, ensuring our presentation is as compelling as our app.",
    image: '/Nishant.jpg'
  }
]

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          About TripEase
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We are a team of passionate developers and designers from Galgotias University,
          dedicated to making travel planning seamless and exciting for our college project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://picsum.photos/seed/about-us/800/600"
            alt="A collage of travel photos"
            data-ai-hint="travel collage adventure"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-headline text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            Our mission is to empower travelers with the best information to
            discover, plan, and experience the world. We believe that travel
            is more than just visiting a place; it's about understanding its
            culture, respecting its environment, and creating lasting memories.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Discover:</strong> Effortlessly find
                destinations that match your travel style.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Plan:</strong> Access all essential
                information in one place to plan with confidence.
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Experience:</strong> Travel smarter with
                cultural insights and practical tips for a richer experience.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-headline text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}
