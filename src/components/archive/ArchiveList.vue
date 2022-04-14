<template>
  <div class="tabel-body-box" :class="[activeClass, textColor]" @click="addToCheck">
    <p>#{{ archive_data.ID }}</p>
    <p>{{ archive_data.created_at }}</p>
    <p>{{ archive_data.price + ' ' + this.$q.localStorage.getItem('currency') }}</p>
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
        if(this.CurrentActive === this.archive_data.ID) {
          if(this.$q.dark.isActive) {
            return 'bg-black'
          }
          return 'bg-grey-4'
        } else {
          if(this.$q.dark.isActive) {
            return 'bg-blue-grey-10'
          }
          return 'light bg-grey-2'
        }
    },
    textColor() {
      if(this.$q.dark.isActive) {
        return 'text-white'
      }
        return 'text-grey-9'
    },
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
