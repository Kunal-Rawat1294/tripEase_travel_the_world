import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CountryDetails, ContentSection } from '@/types';
import { BookUser, ShieldCheck, HeartPulse, PiggyBank, Wifi, Mountain, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

interface CountryDetailViewProps {
  details: CountryDetails;
}

const iconMap: Record<keyof CountryDetails['content'], React.ReactNode> = {
  documents: <BookUser className="h-6 w-6" />,
  culture: <Globe className="h-6 w-6" />,
  safety: <ShieldCheck className="h-6 w-6" />,
  health: <HeartPulse className="h-6 w-6" />,
  money: <PiggyBank className="h-6 w-6" />,
  connectivity: <Wifi className="h-6 w-6" />,
  adaptation: <Mountain className="h-6 w-6" />,
};

const SectionDisplay = ({ section, icon }: { section: ContentSection; icon: React.ReactNode }) => (
  <Card className="shadow-lg">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          {icon}
        </div>
        <CardTitle className="font-headline text-2xl">{section.title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="prose max-w-none text-foreground prose-a:text-primary prose-headings:font-headline">
        <ReactMarkdown>{section.content}</ReactMarkdown>
      </div>
    </CardContent>
  </Card>
);

export function CountryDetailView({ details }: CountryDetailViewProps) {
  const categories = Object.keys(details.content) as (keyof CountryDetails['content'])[];

  return (
    <Tabs defaultValue="documents" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {categories.map((key) => (
          <TabsTrigger key={key} value={key} className="capitalize">{key}</TabsTrigger>
        ))}
      </TabsList>

      {categories.map((key) => (
        details.content[key] && (
          <TabsContent key={key} value={key} className="mt-6">
            <SectionDisplay section={details.content[key]} icon={iconMap[key]} />
          </TabsContent>
        )
      ))}
    </Tabs>
  );
}
