import { cva } from "class-variance-authority"

export const inputFieldVariants = cva('flex-1 bg-transparent placeholder-financy-gray-400 focus-within:outline-none', {
  variants: {
    state: {
      default: 'text-financy-gray-800',
      active: 'text-financy-gray-800',
      filled: 'text-financy-gray-800',
      error: 'text-financy-gray-800',
      disabled: 'text-financy-black'
    }
  },
  defaultVariants: {
    state: 'default'
  }
})

export const labelVariants = cva('font-medium text-sm', {
  variants: {
    state: {
      default: 'text-financy-gray-700',
      active: 'text-financy-green-base',
      filled: 'text-financy-gray-700',
      error: 'text-financy-danger',
      disabled: 'text-financy-gray-700'
    }
  },
  defaultVariants: {
    state: 'default'
  }
})

export const prefixVariants = cva('w-4 h-4 flex items-center justify-center shrink-0', {
  variants: {
    state: {
      default: 'text-financy-gray-700',
      active: 'text-financy-green-base',
      filled: 'text-financy-gray-700',
      error: 'text-financy-danger',
      disabled: 'text-financy-gray-700'
    }
  },
  defaultVariants: {
    state: 'default'
  }
})