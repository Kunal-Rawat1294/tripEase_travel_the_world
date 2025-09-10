import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  aiHint: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="text-center flex flex-col">
      <CardHeader className="items-center">
        <div className="relative h-32 w-32 rounded-full overflow-hidden">
          <Image
            src={member.image}
            alt={`Photo of ${member.name}`}
            data-ai-hint={member.aiHint}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
        <p className="text-primary font-medium">{member.role}</p>
        <p className="mt-2 text-muted-foreground text-sm">{member.bio}</p>
      </CardContent>
      <CardFooter className="justify-center gap-2 h-10">
        {/* Social links removed as requested */}
      </CardFooter>
    </Card>
  );
}
