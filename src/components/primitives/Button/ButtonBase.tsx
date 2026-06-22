import { tv } from 'tailwind-variants';

export const ButtonBaseStyles = tv({
  base: [
    'rounded-md border transition-colors focus:outline-none cursor-pointer disabled:cursor-not-allowed',
    'data-focus-visible:ring-2 data-focus-visible:ring-offset-2 data-focus-visible:ring-(--ring)',
  ],

  variants: {
    variant: {
      plain: [
        'bg-transparent text-white border-transparent',
        'data-hovered:text-(--color-gray-300)',
        'data-focused:text-(--color-gray-400)',
        'disabled:text-(--color-gray-500)',
        '[--ring:var(--color-white)]',
      ],

      solid: [
        'bg-(--solid) text-white border-(--solid)',
        'data-hovered:bg-(--solid-hover) data-hovered:border-(--solid-hover)',
        'data-focused:bg-(--solid-hover) data-focused:border-(--solid-hover)',
        'data-pressed:bg-(--solid-active)',
        'disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400',
        '[--ring:var(--color-green-800)]',
      ],
    },
  },

  defaultVariants: {
    variant: 'solid',
  },
});
