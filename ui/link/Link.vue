<script setup lang="ts">
import type { NuxtLinkProps } from '#app'
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

import type { LinkVariants } from '.'

import { linkVariants } from '.'

interface Props extends /* @vue-ignore */ NuxtLinkProps {
  variant?: LinkVariants['variant']
  size?: LinkVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  variant: 'default'
})
</script>

<template>
  <NuxtLink data-slot="link" :class="cn(linkVariants({ variant, size }), props.class)" v-bind="$props">
    <slot />
  </NuxtLink>
</template>
