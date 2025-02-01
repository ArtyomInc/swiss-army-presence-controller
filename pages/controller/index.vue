<template>
  <Card>
    <CardHeader>
      <CardTitle> Add section/group </CardTitle>
      <CardDescription>You will add section/group name here before using it to register your arrivals</CardDescription>
    </CardHeader>
    <CardContent>
      <MultiField v-model="sections" block-empty placeholder="Kdo, Rep, Mun, etc." />
    </CardContent>
    <CardFooter>
      <Link href="/controller/register"> Next <Icon name="lucide:arrow-right" size="20" /> </Link
    ></CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Link } from '@/ui/link'

import MultiField from '~/components/MultiField.vue'

const sections = ref<string[]>(['Sct Kdo'])
</script>
