<script setup lang="ts">
import {KnishIOClient} from "@wishknish/knishio-client-js/src";
import IdentitySeedCard from "~/components/cards/IdentitySeedCard.vue";
import IdentitySecretCard from "~/components/cards/IdentitySecretCard.vue";
import IdentityBundleCard from "~/components/cards/IdentityBundleCard.vue";
import ConnectionUriCard from "~/components/cards/ConnectionUriCard.vue";
import ConnectionCellCard from "~/components/cards/ConnectionCellCard.vue";
import ConnectionAuthCard from "~/components/cards/ConnectionAuthCard.vue";

const state = reactive({
  client: new KnishIOClient({
    uri: 'https://eteplitsky.testnet.knish.io/graphql',
    cellSlug: 'TESTCELL'
  }),
  seed: undefined
})

const handleSecret = (secret: string) => {
  if (secret && secret.length > 0) {
    state.client.setSecret(secret)
  } else {
    state.client.deinitialize()
  }
}

const handleUri = (uri: string) => {
  state.client.setUri(uri)
}

const handleCell = (cell: string) => {
  state.client.setCellSlug(cell)
}

/*

const client = new KnishIOClient({
  url: 'https://eteplitsky.testnet.knish.io/graphql',
  cellSlug: 'TESTCELL'
})

const secret = generateSecret('foo')
client.setSecret(secret)

 */

</script>
<template>
  <div>
    <UPageBody
        class="p-4"
    >
      <UPageHeader
          title="Knish.IO SDK Boilerplate Tool"
          description="This tool is designed to help you generate the necessary parameters for the Knish.IO SDK. The SDK is used to interact with the Knish.IO distributed ledger."
          class="mb-4"
      />

      <UDashboardSection
          title="Step 1: Identity Initialization"
          description="The first step in using the Knish.IO SDK is to initialize an identity. This identity is based on a seed string, which is used to generate a unique secret and signature hash for each user."
          icon="i-heroicons-wallet"
      >
        <UPageGrid>
          <IdentitySeedCard
              @input="seed => state.seed = seed"
          />
          <IdentitySecretCard
              :seed="state.seed"
              @input="handleSecret"
          />
          <IdentityBundleCard
              :client="state.client"
          />
        </UPageGrid>
      </UDashboardSection>

      <UDashboardSection
          title="Step 2: Connect to Knish.IO API"
          description="The next step is to connect to the Knish.IO GraphQL API. This API is used to interact with the Knish.IO distributed ledger, and can be used to query the ledger and submit mutations containing new data."
          icon="i-heroicons-cloud"
      >
        <UPageGrid>
          <ConnectionUriCard
              @input="handleUri"
          />
          <ConnectionCellCard
              @input="handleCell"
          />
          <ConnectionAuthCard
              :client="state.client"
          />
        </UPageGrid>
      </UDashboardSection>
    </UPageBody>
  </div>
</template>