import { composeRenderProps, Button as RACButton } from 'react-aria-components';
import type { ButtonProps as RACButtonProps } from 'react-aria-components';

import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

import { Spinner } from '../Spinner';
import { ButtonBaseStyles } from './ButtonBase.tsx';

const iconButtonStyles = tv({
  extend: ButtonBaseStyles,
  base: ['p-3'],
  defaultVariants: {
    variant: 'plain',
  },
});

type IconButtonProps = RACButtonProps & VariantProps<typeof iconButtonStyles>;

export function IconButton({
  variant,
  isPending,
  isDisabled,
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <RACButton
      {...props}
      isPending={isPending}
      isDisabled={isPending || isDisabled}
      className={composeRenderProps(className, (className, renderProps) =>
        iconButtonStyles({ ...renderProps, variant, className })
      )}
    >
      {isPending ? <Spinner /> : children}
    </RACButton>
  );
}
