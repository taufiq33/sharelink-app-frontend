import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function HomepageCard({ icon, title, description }) {
  return (
    <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-center my-2 text-primary">
          {icon}
        </div>
        <CardTitle className={"text-center"}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={"text-foreground/80 text-center text-sm"}>
        {description}
      </CardContent>
    </Card>
  );
}
