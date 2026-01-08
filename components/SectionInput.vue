<template>
  <div class="relative w-full">
    <Input
      :id="id"
      v-model="inputValue"
      :placeholder="placeholder"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup.enter="$emit('enter')"
    />

    <!-- Liste de suggestions -->
    <div
      v-if="showSuggestions && filteredSuggestions.length > 0"
      class="absolute bg-popover border max-h-60 mt-1 overflow-auto rounded-md shadow-md w-full z-50"
    >
      <div
        v-for="(section, index) in filteredSuggestions"
        :key="section"
        class="cursor-pointer hover:bg-accent px-3 py-2 text-sm"
        :class="{ 'bg-accent': index === selectedIndex }"
        @mousedown.prevent="selectSection(section)"
        @mouseenter="selectedIndex = index"
      >
        <div class="flex items-center justify-between">
          <span class="font-medium">{{ section }}</span>
          <Icon name="lucide:corner-down-left" size="14" class="opacity-50 text-muted-foreground" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  modelValue?: string
  placeholder?: string
  sections: string[]
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  modelValue: '',
  placeholder: '',
  sections: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  enter: []
}>()

const inputValue = ref(props.modelValue)
const showSuggestions = ref(false)
const selectedIndex = ref(-1)
const isFocused = ref(false)

// Filtrer les suggestions en fonction de la saisie
const filteredSuggestions = computed(() => {
  if (!inputValue.value || inputValue.value.length < 1) {
    return props.sections.slice(0, 10) // Montrer les 10 premières sections si vide
  }

  const query = inputValue.value.toLowerCase()
  return props.sections.filter((section) => section.toLowerCase().includes(query)).slice(0, 10) // Limiter à 10 suggestions
})

// Synchroniser avec le v-model parent
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue || ''
  }
)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleInput = () => {
  selectedIndex.value = -1
  showSuggestions.value = isFocused.value && filteredSuggestions.value.length > 0
}

const handleFocus = () => {
  isFocused.value = true
  if (filteredSuggestions.value.length > 0) {
    showSuggestions.value = true
  }
}

const handleBlur = () => {
  isFocused.value = false
  // Délai pour permettre le clic sur une suggestion
  setTimeout(() => {
    showSuggestions.value = false
    selectedIndex.value = -1
  }, 200)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!showSuggestions.value || filteredSuggestions.value.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredSuggestions.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
      break
    case 'Enter':
      event.preventDefault()
      if (selectedIndex.value >= 0) {
        selectSection(filteredSuggestions.value[selectedIndex.value])
      }
      break
    case 'Escape':
      showSuggestions.value = false
      selectedIndex.value = -1
      break
  }
}

const selectSection = (section: string) => {
  inputValue.value = section
  emit('update:modelValue', section)
  showSuggestions.value = false
  selectedIndex.value = -1
}
</script>
