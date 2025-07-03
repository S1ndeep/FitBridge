
import React from 'react';
import { HoverRevealButton } from "@/components/ui/hover-reveal-button";
import { Settings, Info, HelpCircle } from 'lucide-react';

interface UtilityButtonsProps {
  onSettings?: () => void;
  onInfo?: () => void;
  onHelp?: () => void;
  className?: string;
}

const UtilityButtons = ({ onSettings, onInfo, onHelp, className }: UtilityButtonsProps) => {
  return (
    <div className={`flex gap-2 ${className || ''}`}>
      {onHelp && (
        <HoverRevealButton
          icon={HelpCircle}
          text="Help"
          onClick={onHelp}
          variant="utility"
          size="sm"
          direction="bottom"
        />
      )}
      
      {onInfo && (
        <HoverRevealButton
          icon={Info}
          text="Information"
          onClick={onInfo}
          variant="utility"
          size="sm"
          direction="bottom"
        />
      )}
      
      {onSettings && (
        <HoverRevealButton
          icon={Settings}
          text="Settings"
          onClick={onSettings}
          variant="utility"
          size="sm"
          direction="bottom"
        />
      )}
    </div>
  );
};

export default UtilityButtons;
