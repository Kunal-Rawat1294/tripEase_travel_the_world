import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="relative h-32 w-32 mx-auto">
          <Image
            src={member.image}
            alt={`Photo of ${member.name}`}
            fill
            className="rounded-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
        <p className="text-primary font-medium">{member.role}</p>
        <p className="mt-2 text-muted-foreground text-sm">{member.bio}</p>
      </CardContent>
      <CardFooter className="justify-center gap-2">
        <Link href="https://www.linkedin.com/in/johndoe" className="text-muted-foreground hover:text-primary">
          <Linkedin size={20} />
        </Link>
        <Link href="https://twitter.com/johndoe" className="text-muted-foreground hover:text-primary">
          <Twitter size={20} />
        </Link>
        <Link href="https://www.instagram.com/johndoe" className="text-muted-foreground hover:text-primary">
          <Instagram size={20} />
        </Link>
      </CardFooter>
    </Card>
  );
}
