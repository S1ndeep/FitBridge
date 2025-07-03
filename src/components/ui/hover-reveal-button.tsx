
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';

interface HoverRevealButtonProps {
  icon: LucideIcon;
  text: string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline" | "ghost" | "cta" | "utility";
  size?: "sm" | "md" | "lg";
  className?: string;
  direction?: "right" | "bottom";
}

const HoverRevealButton = React.forwardRef<HTMLButtonElement, HoverRevealButtonProps>(
  ({ 
    icon: Icon, 
    text, 
    onClick, 
    variant = "default", 
    size = "md", 
    className,
    direction = "right",
    ...props 
  }, ref) => {
    const baseStyles = "group relative overflow-hidden transition-all duration-300 ease-out";
    
    const variantStyles = {
      default: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl backdrop-blur-sm",
      secondary: "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-lg hover:shadow-xl",
      outline: "border-2 border-blue-500 bg-transparent hover:bg-blue-500/10 text-blue-600 hover:text-blue-700 backdrop-blur-sm",
      ghost: "bg-transparent hover:bg-white/10 text-gray-700 hover:text-gray-900 backdrop-blur-sm",
      cta: "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105",
      utility: "bg-gray-100/80 backdrop-blur-md border border-gray-200/50 hover:bg-gray-200/80 text-gray-700 hover:text-gray-900 shadow-md hover:shadow-lg"
    };

    const sizeStyles = {
      sm: "h-8 px-2",
      md: "h-10 px-3",
      lg: "h-12 px-4"
    };

    const iconSizeStyles = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6"
    };

    const textSizeStyles = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    };

    return (
      <Button
        ref={ref}
        onClick={onClick}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          direction === "right" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        <Icon className={cn(iconSizeStyles[size], "flex-shrink-0 z-10")} />
        
        <span 
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out whitespace-nowrap font-medium z-10",
            textSizeStyles[size],
            direction === "right" 
              ? "max-w-0 group-hover:max-w-[120px] group-hover:ml-2 group-hover:opacity-100 opacity-0"
              : "max-h-0 group-hover:max-h-[24px] group-hover:mt-1 group-hover:opacity-100 opacity-0"
          )}
        >
          {text}
        </span>

        {/* Glassmorphism overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
      </Button>
    );
  }
);

HoverRevealButton.displayName = "HoverRevealButton";

export { HoverRevealButton };
