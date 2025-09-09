import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CountryDetails, InfoSection } from '@/types';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountryDetailViewProps {
  details: CountryDetails;
}

const InfoSectionDisplay = ({ section }: { section: InfoSection }) => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle className="font-headline text-2xl">{section.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-6">{section.description}</p>
      <ul className="space-y-4">
        {section.points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent mt-1" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export function CountryDetailView({ details }: CountryDetailViewProps) {
  const categories = Object.keys(details).filter(key => key !== 'name') as (keyof typeof details)[];

  return (
    <Tabs defaultValue="docs" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {categories.map((key) => (
          <TabsTrigger key={key} value={key} className="capitalize">{key}</TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map((key) => (
        <TabsContent key={key} value={key} className="mt-6">
          <InfoSectionDisplay section={details[key] as InfoSection} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
