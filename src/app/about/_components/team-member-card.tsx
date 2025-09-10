import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
            width={400}
            height={400}
            className="rounded-full object-cover aspect-square"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
        <p className="text-primary font-medium">{member.role}</p>
        <p className="mt-2 text-muted-foreground text-sm">{member.bio}</p>
      </CardContent>
      <CardFooter className="justify-center gap-2">
      </CardFooter>
    </Card>
  );
}
