<script setup lang="ts">
import { z } from 'zod'
import Generic from "~/components/card/Generic.vue"
import MetaInstance from "~/components/tables/MetaInstance.vue";

const { state, metaQuery } = useKnishIO()

/**
 * Schema for the Meta Query card
 */
const schema = z.object({
  metaType: z.string(),
  metaId: z.string(),
  latest: z.boolean()
})
type Schema = z.output<typeof schema>

/**
 * Schema for the filter items
 */
const filterSchema = z.object({
  key: z.string(),
  value: z.string()
})
type FilterSchema = z.output<typeof filterSchema>

/**
 * Default state for the form
 */
const defaultState = {
  metaType: 'WalletBundle',
  metaId: state.bundle,
  latest: true
}

/**
 * Watch for changes to the bundle state and update the form state
 */
watch(() => state.bundle, (newBundle) => {
  if(!formState.metaId || formState.metaId.length === 0) {
    formState.metaId = newBundle
  }
})

/**
 * Form state for the Meta Query card
 */
const formState = reactive<Partial<Schema & { filter: Partial<FilterSchema>[] }>>({
  ...defaultState,
  filter: []
})

/**
 * Add a new filter item to the form state
 */
const addFilter = () => {
  if (!formState.filter || formState.filter.length === 0) {
    formState.filter = []
  }
  formState.filter.push({key: '', value: ''})
}

/**
 * Remove the last filter item from the form state
 */
function removeFilter() {
  if (formState.filter) {
    formState.filter.pop()
  }
}

/**
 * Result data from the meta query
 */
const resultData = ref<any>()

/**
 * Loading state
 */
const loading = ref(false)

/**
 * Query the ledger for metadata
 */
const queryMeta = async () => {
  if (formState.metaType && formState.metaId) {

    // Remove empty filter items
    if(formState.filter) {
      formState.filter = formState.filter.filter((item) => item.key && item.value)
    }

    // Query the ledger
    loading.value = true
    resultData.value = await metaQuery(formState.metaType, formState.metaId, formState.filter, formState.latest)
    loading.value = false
  }
}
</script>

<template>
  <Generic
    title="Meta Query"
    description="Query the Knish.IO ledger to retrieve information about one or more Meta Assets."
    icon="i-heroicons-magnifying-glass-plus"
    :loading="loading"
  >
    <UForm :schema="schema" :state="formState" class="space-y-4">
      <UFormGroup label="Meta Type" name="metaType">
        <UInput
            v-model="formState.metaType"
        />
      </UFormGroup>
      <UFormGroup label="Meta ID" name="metaId">
        <UInput v-model="formState.metaId" />
      </UFormGroup>
      <UFormGroup name="latest">
        <UCheckbox
            v-model="formState.latest"
            label="Limit to latest instance only?"
        />
      </UFormGroup>
      <UForm
          v-for="(item, count) in formState.filter"
          :key="count"
          :state="item"
          :schema="filterSchema"
          class="flex gap-2"
      >
        <UFormGroup :label="!count ? 'Key' : undefined" name="key">
          <UInput v-model="item.key" />
        </UFormGroup>
        <UFormGroup :label="!count ? 'Value' : undefined" name="value">
          <UInput v-model="item.value" />
        </UFormGroup>
      </UForm>
      <div
        class="flex gap-2"
      >
        <UButton
            color="primary"
            size="sm"
            @click="addFilter()"
        >
          Add Filter
        </UButton>

        <UButton
            color="primary"
            size="sm"
            @click="removeFilter()">
          Remove Filter
        </UButton>

        <UButton
            v-if="state.authToken"
            :disabled="!formState.metaType || !formState.metaId"
            :loading="loading"
            color="primary"
            size="sm"
            @click="queryMeta()"
        >
          Query Meta
        </UButton>
      </div>
      <UBadge
          v-if="!state.authToken"
          color="orange"
          variant="solid"
          label="Awaiting Auth Token"
          icon="i-heroicons-clock"
      />
      <UBadge
          v-else
          color="green"
          variant="solid"
          label="Authorized"
          icon="i-heroicons-check-circle"
      />
    </UForm>
    <div
        v-if="resultData"
        class="space-y-4"
    >
      <UTextarea
          :model-value="JSON.stringify(resultData, null, 2)"
          :disabled="true"
          :ui="{
            base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-100',
            font: 'font-mono'
          }"
          :rows="10"
      />
      <MetaInstance
          v-if="resultData.instances.length > 0"
          :instances="resultData.instances"
      />
      <UAlert
          v-else
          title="No Results"
          description="No meta instances were found matching your query criteria."
          color="yellow"
      />
    </div>
  </Generic>
</template>