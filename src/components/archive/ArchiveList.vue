<template>
  <div class="tabel-body-box" :class="{'bg-grey-4': isActive }" @click="addToCheck">
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
      },
      CurrentActive: Number
    },
    methods: {
      addToCheck() {
        this.$emit("addToCheck", this.archive_data)
      }
    },
  computed: {
      isActive() {
        return this.CurrentActive === this.archive_data.ID;
      }
  }
}
</script>

<style>

</style>
