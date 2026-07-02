import { composeRenderProps, Button as RACButton } from 'react-aria-components';
import type { ButtonProps as RACButtonProps } from 'react-aria-components';

import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

import { Spinner } from '../Spinner';
import { ButtonBaseStyles } from './ButtonBase.tsx';

const button = tv({
  extend: ButtonBaseStyles,
  base: [
    'relative inline-flex items-center justify-center gap-x-2 font-medium overflow-hidden',
    '*:data-[slot=icon]:shrink-0',
  ],
  variants: {
    size: {
      large: '*:data-[slot=icon]:size-5',
      small: '*:data-[slot=icon]:size-4',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'large',
  },
});

type ButtonProps = RACButtonProps & VariantProps<typeof button>;

export function Button({
  variant,
  size,
  isPending,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <RACButton
      isPending={isPending}
      className={composeRenderProps(className, (className, renderProps) =>
        button({ ...renderProps, variant, size, className })
      )}
      {...props}
    >
      {composeRenderProps(children, (resolvedChildren) => (
        <>
          {resolvedChildren}
          {isPending && (
            <div className="absolute top-0 left-0 flex h-full w-full cursor-default items-center justify-center bg-inherit">
              <Spinner />
            </div>
          )}
        </>
      ))}
    </RACButton>
  );
}
