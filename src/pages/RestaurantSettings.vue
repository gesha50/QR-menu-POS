<template>
  <q-page class="RestaurantSettings">

    <!-- tab -->
    <div class="container q-mb-lg">
      <div class="q-pa-md lt-sm">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="open('left')" />
      </div>
      <div class="row">
        <div class="q-mr-md col-lg-4 col-md-4 col-xs-4 gt-xs tab-contents">
          <q-tabs
            v-model="tab"
            class="text-grey tab-elements"
            inline-label
            active-color="red-5"
            vertical
          >
            <q-tab class="q-mt-lg" name="design" icon="mail" label="Профиль" />
            <q-tab class="q-mt-sm" name="settings" icon="notifications" label="Настройки" />
          </q-tabs>
        </div>
        <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
          <q-tab-panels
            class="tab-contents"
            v-model="tab"
            animated
            vertical
          >
            <!-- design -->
            <q-tab-panel name="design">
              <div>
                <div class="text-h5 q-mb-md q-mt-sm"><strong>Дизайн</strong></div>

                <q-card-actions align="center">
                  <q-btn class="bg-green-7" text-color="white" label="Сохранить"/>
                </q-card-actions>
              </div>
            </q-tab-panel>
            <!-- settings -->
            <q-tab-panel name="settings">
              <div>
                <div class="text-h5 q-mb-md q-mt-sm"><strong>Настройки</strong></div>
                <q-btn
                  class="bg-red-5"
                  v-if="isRestaurant"
                  @click="logout"
                  :label="$t('settings.exit_restaurant_mode')"
                />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
    <!-- dialog for mobile -->
    <div>
      <q-dialog v-model="dialog" :position="position">
        <q-card class="tab-mobile">
          <q-tabs
            v-model="tab"
            class="text-grey tab-elements"
            inline-label
            active-color="red-5"
            vertical
          >
            <q-tab class="q-mt-lg" name="design" icon="mail" label="Дизайн" />
            <q-tab class="q-mt-sm" name="settings" icon="notifications" label="Настройки" />
          </q-tabs>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
    name: "RestaurantSettings",
    data() {
      const dialog = ref(false)
      const position = ref('top')
        return {
          dialog,
          position,
          tab: ref('design'),
          open(pos) {
            position.value = pos
            dialog.value = true
          },
        }
    },
    created() {},
    mounted() {},
    components: {},
    computed: {
      isRestaurant() {
        return !(this.$store.getters["settings/auth"].loggedIn || !this.$store.getters["settings/owner"].loggedIn);
      },
    },
    methods: {
      logout() {
        this.$store.dispatch('settings/logoutOwner', this.$store.getters['settings/getIsRestaurant'])
        this.$router.push('/login')
      }
    },
})
</script>

<style lang="scss" scoped>

</style>
