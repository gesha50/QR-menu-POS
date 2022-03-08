<template>
  <q-page class="">
<!--    <div class="flex flex-center">-->
<!--      <q-select @update:model-value="changedLang" filled v-model="lang" :options="options" />-->
<!--      <q-btn @click="toggleDarkMode" />-->
<!--    </div>-->

    <!-- tab -->
    <div class="container q-mb-lg">
      <div class="text-h5 q-mb-md q-mt-md"><strong>Настройки</strong></div>
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
            <q-tab class="q-mt-lg" name="profile" icon="mail" label="Профиль" />
            <q-tab class="q-mt-sm" name="notifications" icon="notifications" label="Уведавления" />
            <q-tab class="q-mt-sm" name="theme" icon="alarm" label="Внешний вид" />
            <q-tab class="q-mt-sm" name="security" icon="security" label="Безопасность" />
          </q-tabs>
        </div>
        <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
          <q-tab-panels
            class="tab-contents"
            v-model="tab"
            animated
            vertical
          >
          <!-- profile -->
            <q-tab-panel name="profile">
              <div>
                <div class="text-h5 q-mb-md q-mt-sm"><strong>Профиль</strong></div>
                <div v-for="(item, i) in items"
                  :key="i">
                  <div class="flex justify-between"
                  >
                    <div class="q-mt-lg tab-content-name"><strong>{{item.label}}</strong></div>
                    <q-toggle
                      class="toggle-btn"
                      size="60px"
                      color="red-5"
                      height="150px"
                      :val="item.id"
                      v-model="item.toggle"
                      icon-color="white"
                    />
                    </div>
                      <hr class="description-underline">
                  </div>
                  <q-card-actions class="save-qbtn" align="center">
                      <q-btn text-color="white" label="Сохранить извеления"/>
                  </q-card-actions>
               </div>
            </q-tab-panel>
          <!-- notifications -->
            <q-tab-panel name="notifications">
              <div>
                <div class="text-h5 q-mb-md q-mt-sm"><strong>Уведавления</strong></div>
                <div v-for="(item, i) in items"
                  :key="i">
                  <div class="flex justify-between"
                  >
                    <div class="q-mt-lg tab-content-name"><strong>{{item.label}}</strong></div>
                    <q-toggle
                      class="toggle-btn"
                      size="60px"
                      color="red-5"
                      height="150px"
                      :val="item.id"
                      v-model="item.toggle"
                      icon-color="white"
                    />
                    </div>
                      <hr class="description-underline">
                  </div>
                  <q-card-actions class="save-qbtn" align="center">
                      <q-btn text-color="white" label="Сохранить извеления"/>
                  </q-card-actions>
               </div>
            </q-tab-panel>
          <!-- theme -->
            <q-tab-panel name="theme">
              <div>
                <div class="text-h5 q-mb-md q-mt-sm"><strong>Внешний вид</strong></div>
                  <q-card-actions class="save-qbtn" align="center">
                      <q-btn text-color="white" label="Сохранить извеления"/>
                  </q-card-actions>
               </div>
            </q-tab-panel>
          <!-- security -->
            <q-tab-panel name="security">
              <div>
                <div class="text-h5 q-mb-md q-mt-sm"><strong>Безопасность</strong></div>
                <div v-for="(item, i) in items"
                  :key="i">
                  <div class="flex justify-between"
                  >
                    <div class="q-mt-lg tab-content-name"><strong>{{item.label}}</strong></div>
                    <q-toggle
                      class="toggle-btn"
                      size="60px"
                      color="red-5"
                      height="150px"
                      :val="item.id"
                      v-model="item.toggle"
                      icon-color="white"
                    />
                    </div>
                      <hr class="description-underline">
                  </div>
                  <q-card-actions class="save-qbtn" align="center">
                      <q-btn text-color="white" label="Сохранить извеления"/>
                  </q-card-actions>
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
                <q-tab class="q-mt-lg" name="profile" icon="mail" label="Профиль" />
                <q-tab class="q-mt-sm" name="notifications" icon="notifications" label="Уведавления" />
                <q-tab class="q-mt-sm" name="theme" icon="alarm" label="Внешний вид" />
                <q-tab class="q-mt-sm" name="security" icon="security" label="Безопасность" />
              </q-tabs>
            </q-card>
          </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'

export default defineComponent({
  name: "Settings",
  data() {
    const dialog = ref(false)
    const position = ref('top')
    return {
      dialog,
      position,

      open(pos) {
        position.value = pos
        dialog.value = true
      },
      tab: ref('notifications'),
      items:[
        {
          id: 1,
          label: "Новое сообщение",
          toggle: false,
        },
        {
          id: 2,
          label: "Еженедельный отчет",
          toggle: true,
        },
        {
          id:3,
          label:"Успешный платеж",
          toggle:true,
        },
         {
          id:3,
          label:"Оповещение о выставлении счетов",
          toggle:true,
        }
      ],
      lang: this.$store.getters["settings/getLang"],
      options: [
        'en-US',
        'ru',
        'uz'
      ]
    }
  },
  computed: {},
  created() {
    console.log('work')
    if (this.$q.localStorage.getItem('currentLang')) {
      this.changedLang(this.$q.localStorage.getItem('currentLang'))
    }
  },

  methods: {
    toggleDarkMode() {
      this.$q.localStorage.set('darkMode', !this.$q.dark.isActive)
      this.$q.dark.toggle()
    },
    changedLang(val) {
      this.$q.localStorage.set('currentLang',val)
      console.log(val)
      this.lang = val
      this.$i18n.locale = val
      this.$store.dispatch('settings/setLang', val)
    },
  },
})
</script>

<style lang="scss">
.container{
  width: 90%;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 718px) {
  .container{
    width: 80%;
  }
}
.tab-contents{
  position: relative;
  height: 600px !important;
  background-color: #fff;
  border-radius: 15px;
  text-align: start;
  .row, .column, .flex {
    flex-wrap: nowrap;
  }
}
.tab-elements{
  .flex-center, .justify-center {
      padding-left: 15px;
      text-transform: none;
      justify-content: initial;
  }
  .q-tab__label{
    font-weight: bold;
    font-size: 15px;
  }
}
.q-tabs--vertical .q-tab__indicator {
  width: 4.5px;
  border-radius: 20px 0 0 20px;
}
.tab-content-name{
  font-size: 15px;
}
.tab-mobile{
  border-radius: 0 20px 20px 0;
  width: 300px;
  height: 500px;
}
.description-underline{
  opacity: 0.1;
  margin: 0;
  margin-top: 9px;
}
.q-toggle__inner--truthy .q-toggle__track{
  opacity: 1;
}
.q-toggle__inner{
  width: 1.65em;
}
.q-toggle__track{
  height: 0.50em;
  border-radius: 25px;
}
.q-toggle__thumb {
  top: 0.35em;
  left: 0.32em;
  width: 0.45em;
  height: 0.45em;
  color:white !important;
}
.q-toggle__inner--truthy .q-toggle__thumb {
  left: 0.87em;
}
.q-toggle__inner--indet .q-toggle__thumb {
  left: 0.32em;
}
.q-btn{
  text-transform: none;
}
.save-qbtn .q-btn{
  height: 46px;
  border-radius: 15px;
  background-color: #07C900;
  width: 95%;
  font-size: 17px;
  font-weight: 550;
  position: absolute;
  bottom: 20px;
}
</style>
