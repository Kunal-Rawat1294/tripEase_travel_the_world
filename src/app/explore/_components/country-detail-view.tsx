
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CountryDetails, ContentSection } from '@/types';
import { BookUser, ShieldCheck, HeartPulse, PiggyBank, Wifi, Mountain, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CountryDetailViewProps {
  details: CountryDetails;
}

const iconMap: Record<keyof CountryDetails['content'], React.ReactNode> = {
  documents: <BookUser className="h-5 w-5 md:h-6 md:w-6" />,
  culture: <Globe className="h-5 w-5 md:h-6 md:w-6" />,
  safety: <ShieldCheck className="h-5 w-5 md:h-6 md:w-6" />,
  health: <HeartPulse className="h-5 w-5 md:h-6 md:w-6" />,
  money: <PiggyBank className="h-5 w-5 md:h-6 md:w-6" />,
  connectivity: <Wifi className="h-5 w-5 md:h-6 md:w-6" />,
  adaptation: <Mountain className="h-5 w-5 md:h-6 md:w-6" />,
};

const SectionDisplay = ({ section, icon }: { section: ContentSection; icon: React.ReactNode }) => (
  <Card className="shadow-lg border-border/50">
    <CardHeader>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
          {icon}
        </div>
        <CardTitle className="font-headline text-xl md:text-2xl">{section.title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="prose prose-custom max-w-none text-foreground prose-a:text-primary prose-headings:font-headline">
        <ReactMarkdown>{section.content}</ReactMarkdown>
      </div>
    </CardContent>
  </Card>
);

export function CountryDetailView({ details }: CountryDetailViewProps) {
  const categories = Object.keys(details.content) as (keyof CountryDetails['content'])[];

  return (
    <Tabs defaultValue="documents" className="w-full">
      <div className="w-full border-b">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex h-auto w-max bg-transparent p-0">
            {categories.map((key) => (
              <TabsTrigger key={key} value={key} className="capitalize text-sm md:text-base px-3 py-2 md:px-4 md:py-2.5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none">
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {categories.map((key) => (
        details.content[key] && (
          <TabsContent key={key} value={key} className="mt-4 md:mt-6 whitespace-normal">
            <SectionDisplay section={details.content[key]} icon={iconMap[key]} />
          </TabsContent>
        )
      ))}
    </Tabs>
  );
}
