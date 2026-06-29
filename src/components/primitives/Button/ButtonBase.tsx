import { tv } from 'tailwind-variants';

export const ButtonBaseStyles = tv({
  base: [
    'rounded-md border transition-colors focus:outline-none cursor-pointer disabled:cursor-not-allowed py-3 px-6',
    'data-focus-visible:ring-2 data-focus-visible:ring-offset-2 data-focus-visible:ring-(--ring)',
  ],

  variants: {
    variant: {
      plain: [
        'bg-transparent text-white border-transparent',
        'disabled:text-(--color-gray-500)',
      ],

      solid: [
        'bg-(--solid) text-white border-(--solid) shadow-solid-button',
        'data-hovered:bg-(--solid-hover) data-hovered:border-(--solid-hover)',
        'data-focused:bg-(--solid-hover) data-focused:border-(--solid-hover)',
        'data-pressed:bg-(--solid-active)',
        'disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400',
        '[--ring:var(--color-green-800)]',
        'text-sm leading-3.5 font-bold font-fira',
      ],

      danger: [
        'bg-red-600 text-white border-red-600',
        'data-hovered:bg-red-700 data-hovered:border-red-700',
        'data-focused:bg-red-700 data-focused:border-red-700',
        'data-pressed:bg-red-800',
        'disabled:bg-red-200 disabled:border-red-200 disabled:text-red-400',
        '[--ring:var(--color-red-700)]',
        'text-sm leading-3.5 font-bold font-fira',
      ],

      outline: [
        'bg-transparent text-(--solid) border-(--solid)',
        'data-hovered:bg-green-50 data-hovered:border-(--solid-hover) data-hovered:text-(--solid-hover)',
        'data-focused:bg-green-50 data-focused:border-(--solid-hover) data-focused:text-(--solid-hover)',
        'data-pressed:bg-green-100',
        'disabled:bg-transparent disabled:border-gray-300 disabled:text-gray-400',
        '[--ring:var(--color-green-800)]',
        'text-sm leading-3.5 font-bold font-fira',
      ],
    },
  },

  defaultVariants: {
    variant: 'solid',
  },
});
