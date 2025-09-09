import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CountryDetails, InfoSection } from '@/types';
import { CheckCircle2, BookUser, ShieldCheck, HeartPulse, PiggyBank, Wifi, Mountain, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CountryDetailViewProps {
  details: CountryDetails;
}

const InfoSectionDisplay = ({ section, icon }: { section: InfoSection, icon: React.ReactNode }) => (
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
      <p className="text-muted-foreground mb-6">{section.description}</p>
      <ul className="space-y-4">
        {section.points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary mt-1" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const DocsSectionDisplay = ({ section }: { section: CountryDetails['docs'] }) => {
    const renderSubSection = (title: string, data: Record<string, any>) => (
        <div className='mt-6'>
            <h3 className="font-headline text-lg font-semibold mb-3">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {Object.entries(data).filter(([key]) => key !== 'title').map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3 rounded-md border p-3">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary mt-1" />
                        <div>
                            <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <p className="text-muted-foreground">{value.toString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                         <BookUser className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-2xl">{section.title}</CardTitle>
                         <CardDescription>{section.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {renderSubSection(section.passportRequirements.title, section.passportRequirements)}
                {renderSubSection(section.visaRequirements.title, section.visaRequirements)}
                {renderSubSection(section.entryExit.title, section.entryExit)}
                <div className='mt-6'>
                    <h3 className="font-headline text-lg font-semibold mb-3">{section.officialLinks.title}</h3>
                    <a href={section.officialLinks.embassyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Official Government/Embassy Website
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};


export function CountryDetailView({ details }: CountryDetailViewProps) {
  const categories = Object.keys(details).filter(key => key !== 'name') as (keyof Omit<CountryDetails, 'name'>)[];
  
  const iconMap: Record<keyof Omit<CountryDetails, 'name' | 'docs'>, React.ReactNode> = {
    culture: <Globe className="h-6 w-6" />,
    safety: <ShieldCheck className="h-6 w-6" />,
    health: <HeartPulse className="h-6 w-6" />,
    money: <PiggyBank className="h-6 w-6" />,
    connectivity: <Wifi className="h-6 w-6" />,
    adaptation: <Mountain className="h-6 w-6" />,
  };

  return (
    <Tabs defaultValue="docs" className="w-full">
       <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {categories.map((key) => (
          <TabsTrigger key={key} value={key} className="capitalize">{key}</TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="docs" className="mt-6">
          <DocsSectionDisplay section={details.docs} />
      </TabsContent>

      {(Object.keys(iconMap) as (keyof typeof iconMap)[]).map((key) => (
        <TabsContent key={key} value={key} className="mt-6">
          <InfoSectionDisplay section={details[key]} icon={iconMap[key]}/>
        </TabsContent>
      ))}
    </Tabs>
  );
}