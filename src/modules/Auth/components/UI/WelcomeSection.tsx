import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface WelcomeSectionProps {
    title: string;
    welcome: string;
    btnText: string;
    onToggle: () => void;
}

export default function WelcomeSection({
    title,
    welcome,
    btnText,
    onToggle,
}: WelcomeSectionProps) {
    return (
        <div className="text-white space-y-6">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-base">{welcome}</p>
            <Button
                variant="outline"
                className={cn(
                    "rounded-full px-10",
                    "bg-black/30 hover:bg-black text-white border-white"
                )}
                onClick={onToggle}
            >
                {btnText}
            </Button>
        </div>
    );
}
