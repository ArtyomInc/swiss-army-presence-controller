<template>
  <div class="flex flex-col gap-2">
    <Card>
      <CardHeader>
        <CardTitle> Add section/group </CardTitle>
        <CardDescription
          >You will add section/group name here before using it to register your arrivals</CardDescription
        >
      </CardHeader>
      <CardContent class="flex flex-col gap-2">
        <div>
          <Label for="firstname">First name :</Label>
          <Input id="firstname" v-model="userForm.firstName" placeholder="Jean" />
        </div>
        <div>
          <Label for="lastname">Last name :</Label>
          <Input id="lastname" v-model="userForm.lastName" placeholder="Du Jardin" />
        </div>
        <div>
          <Label for="section">Section :</Label>
          <Select v-model="userForm.section">
            <SelectTrigger id="section">
              <SelectValue placeholder="Select a section/group" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <template v-for="section in listOfSections" :key="section">
                  <SelectItem :value="section"> {{ section }} </SelectItem>
                </template>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        {{ userForm }}
        <Button>Add <Icon name="lucide:plus" size="20" /> </Button
      ></CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
const listOfSections = ref<string[]>(['Sct Kdo', 'Sct Rep'])
const userForm = reactive<{
  firstName?: string
  lastName?: string
  section?: string
}>({})
</script>
