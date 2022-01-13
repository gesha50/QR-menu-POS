<template>
  <div class="tabel-body-box" @click="addToCheck">
    <p>#{{ archive_data.ID }}</p>
    <p>{{ archive_data.created_at }}</p>
    <p>{{ archive_data.price }}</p>
  </div>
</template>

<script>
export default {
    props: {
      archive_data: {
        type: Object,
      }
    },
    methods: {
      addToCheck() {
        this.$emit("addToCheck", this.archive_data)
      }
    }
}
</script>

<style>

</style>