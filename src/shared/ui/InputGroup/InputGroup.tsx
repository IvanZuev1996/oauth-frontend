import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';

import { cn } from '@/shared/lib/utils/cn';

import { Label } from '../Label/Label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip/Tooltip';

import './InputGroup.css';

type Props = {
  children: React.ReactNode;
  htmlFor?: string;
  label: string;
  error?: string;
  className?: string;
  helpText?: string;
};

export const InputGroup: React.FC<Props> = ({
  children,
  htmlFor,
  label,
  error,
  className,
  helpText,
}) => {
  return (
    <div className={cn('input-group', className)}>
      <div className="label-wrap">
        <div>
          <Label htmlFor={htmlFor}>{label}</Label>
          {helpText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BsQuestionCircle size={14} className="text-primary" />
                </TooltipTrigger>
                <TooltipContent>{helpText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <span className="error">{error}</span>
      </div>
      {children}
    </div>
  );
};
