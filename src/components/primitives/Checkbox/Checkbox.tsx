import { Check, Minus } from 'lucide-react';
import React from 'react';
import {
  CheckboxField,
  CheckboxButton,
  type CheckboxFieldProps,
} from 'react-aria-components';

import { composeRenderProps } from 'react-aria-components/composeRenderProps';
import { tv } from 'tailwind-variants';

const checkboxStyles = tv({
  base: 'flex gap-2 items-center group text-sm transition',
  variants: {
    isDisabled: {
      false: 'text-gray-800',
      true: 'text-gray-400',
    },
  },
});

const boxStyles = tv({
  base: 'w-5 h-5 rounded border flex items-center justify-center transition',
  variants: {
    isSelected: {
      false: 'bg-white border-gray-400',
      true: 'bg-green-800 border-green-800',
    },
  },
});

const iconStyles = 'w-3.5 h-3.5 text-white pointer-events-none';

interface CheckboxProps extends CheckboxFieldProps {
  children?: React.ReactNode;
}

export function CustomCheckbox(props: CheckboxProps) {
  return (
    <CheckboxField {...props} className="flex items-center gap-2 group">
      <CheckboxButton
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
            checkboxStyles({ ...renderProps, className })
        )}
      >
        {composeRenderProps(
          props.children,
          (children, { isSelected, isIndeterminate, ...renderProps }) => (
            <>
              {/* BOX */}
              <div
                className={boxStyles({
                  isSelected: isSelected || isIndeterminate,
                  ...renderProps,
                })}
              >
                {isIndeterminate ? (
                  <Minus className={iconStyles} />
                ) : isSelected ? (
                  <Check className={iconStyles} />
                ) : null}
              </div>

              {/* LABEL */}
              {children}
            </>
          )
        )}
      </CheckboxButton>
    </CheckboxField>
  );
}
