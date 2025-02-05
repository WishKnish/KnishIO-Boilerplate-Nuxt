<script setup lang="ts">
</script>
<template>
  <div
    class="p-4"
  >
    <CardBase
        title="Knish.IO SDK Boilerplate Tool"
        description="This tool is designed to help you generate the necessary parameters for the Knish.IO SDK. The SDK is used to interact with the Knish.IO distributed ledger."
    />

    <CardBase
        title="Step 1: Identity Initialization"
        description="The first step in using the Knish.IO SDK is to initialize an identity. This identity is based on a seed string, which is used to generate a unique secret and signature hash for each user."
        icon="i-heroicons-wallet"
    >
      <PageGrid>
        <CardIdentitySeed />
        <CardIdentitySecret />
        <CardIdentityBundle />
      </PageGrid>
    </CardBase>

    <CardBase
        title="Step 2: Connect to Knish.IO API"
        description="The next step is to connect to the Knish.IO GraphQL API. This API is used to interact with the Knish.IO distributed ledger, and can be used to query the ledger and submit mutations containing new data."
        icon="i-heroicons-cloud"
    >
      <PageGrid>
        <CardConnectionUri />
        <CardConnectionCell />
        <CardConnectionAuth />
      </PageGrid>
    </CardBase>

    <CardBase
        title="Step 3: Interact with the Ledger"
        description="Once you have initialized your identity and connected to the Knish.IO API, you can start interacting with the Knish.IO distributed ledger. This includes querying the ledger for data, submitting new data, and updating existing data."
        icon="i-heroicons-cube"
    >
      <PageGrid>
        <CardMetaQuery />
      </PageGrid>
    </CardBase>

  </div>
</template>