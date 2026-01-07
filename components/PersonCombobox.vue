<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="justify-between w-full"
        :class="{ 'text-muted-foreground': !selectedPerson }"
      >
        <span class="truncate">
          {{
            selectedPerson
              ? `${selectedPerson.grade} ${selectedPerson.firstName} ${selectedPerson.lastName}`
              : placeholder
          }}
        </span>
        <Icon name="lucide:chevrons-up-down" class="ml-2 opacity-50 shrink-0" size="16" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 w-[var(--radix-popover-trigger-width)]">
      <Command v-model="searchQuery">
        <CommandInput placeholder="Rechercher une personne..." />
        <CommandEmpty>Aucune personne trouvée.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="person in filteredPeople"
              :key="person.id"
              :value="person.id"
              @select="selectPerson(person)"
            >
              <Icon
                name="lucide:check"
                :class="['mr-2', selectedPerson?.id === person.id ? 'opacity-100' : 'opacity-0']"
                size="16"
              />
              <div class="flex flex-1 flex-col">
                <span class="font-medium">{{ person.grade }} {{ person.firstName }} {{ person.lastName }}</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import type { PersonReference } from '~/types/presence'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'

interface Props {
  people: readonly PersonReference[]
  modelValue?: PersonReference | null
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: 'Sélectionner une personne...'
})

const emit = defineEmits<{
  'update:modelValue': [value: PersonReference | null]
}>()

const open = ref(false)
const searchQuery = ref('')
const selectedPerson = ref<PersonReference | null>(props.modelValue)

// Filtrer les personnes en fonction de la recherche
const filteredPeople = computed(() => {
  if (!searchQuery.value) {
    return props.people
  }

  const query = searchQuery.value.toLowerCase()
  return props.people.filter(
    (p) =>
      p.grade.toLowerCase().includes(query) ||
      p.firstName.toLowerCase().includes(query) ||
      p.lastName.toLowerCase().includes(query)
  )
})

const selectPerson = (person: PersonReference) => {
  selectedPerson.value = person
  emit('update:modelValue', person)
  open.value = false
}

// Surveiller les changements de modelValue depuis le parent
watch(
  () => props.modelValue,
  (newValue) => {
    selectedPerson.value = newValue
  }
)
</script>
