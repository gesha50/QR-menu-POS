<template>
  <div class="tabel-body-box" :class="[$q.dark.isActive ? 'dark text-blue-grey-12' : 'light', activeClass]" @click="addToCheck">
    <p>#{{ archive_data.ID }}</p>
    <p>{{ archive_data.created_at }}</p>
    <p>{{ archive_data.price + ' ' + $t('valuta') }}</p>
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
      activeClass() {
        if( this.CurrentActive === this.archive_data.ID) {
          if(this.$q.dark.isActive) {
            return 'bg-black'
          }
          return 'bg-grey-4'
        }
        return 'bg-blue-grey-10'
      }
  }
}
</script>

<style lang="scss" scoped>
.light {
  &:hover p {
    color: black;
  }
}
.dark {
  &:hover p {
    color: white;
  }
}
</style>
