import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';

import { cn } from '@/shared/lib/utils/cn';

import { Label } from '../Label/Label';
import { Text } from '../Text/Text';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip/Tooltip';

import './InputGroup.css';

type Props = {
  children: React.ReactNode;
  label: string;
  description?: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  helpText?: string;
};

export const InputGroup: React.FC<Props> = ({
  children,
  htmlFor,
  label,
  error,
  helpText,
  description,
  className,
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
      </div>
      {description && <Text variant="secondary">{description}</Text>}
      {children}
      <span className="error">{error}</span>
    </div>
  );
};
