<template>
<div class="NotifyDrawer">
  <q-drawer
    v-model="myNotifyDrawer"
    :width="300"
    :breakpoint="500"
    side="right"
    overlay
    bordered
    class="bg-purple-1"
  >
    <q-scroll-area class="fit">
      <q-list v-if="notifications !== null">

        <template v-for="(notify, index) in notifications" :key="index">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon :name="notify.icon" size="xl" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ notify.label }}</q-item-label>
              <q-item-label caption lines="2">
                {{ notify.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        </template>

      </q-list>
      <q-list v-else>
        <h6 class="text-center q-py-xl no-margin">У вас нет уведомления</h6>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "NotifyDrawer",
    props: {
      notifyDrawer: Boolean,
    },
    data() {
        return {
        }
    },
    created() {
    },
    mounted() {},
    components: {},
    computed: {
      myNotifyDrawer() {
        return this.notifyDrawer
      },
      notifications() {
        return JSON.parse(localStorage.getItem("notify"));
      }
    },
    methods: {
    },
})
</script>

<style lang="scss" scoped>

</style>
