import { Card } from "../ui/card";

export default function UserStatisticCard({ icon, title, data }) {
  return (
    <Card className="bg-white dark:bg-secondary/40 p-4 flex justify-start items-start gap-4 max-w-[400px] w-full">
      <div className="flex justify-center items-center gap-4">
        <div className="p-4 bg-primary/40 rounded-lg">{icon}</div>
        <div className="flex flex-col gap-1 justify-start items-start">
          <span className="text-xs text-foreground/80">{title}</span>
          <h3 className="font-bold text-2xl">{data.toLocaleString()}</h3>
        </div>
      </div>
    </Card>
  );
}
