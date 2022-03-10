<template>
  <q-page class="RestaurantSettings">
    <!-- tab -->
    <div class="container q-mb-lg q-py-xl">
      <div class="q-pa-md lt-sm">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="open('left')" />
      </div>
      <div class="row justify-center">
        <div class="q-mr-md full-height col-lg-3 col-md-3 col-xs-3 gt-xs tab-contents rounded-borders bg-white">
          <q-tabs
            v-model="tab"
            class="text-grey tab-elements q-py-lg no-border-radius"
            inline-label
            active-color="red-5"
            vertical
          >
            <q-tab class="justify-start" name="settings" icon="notifications" label="Настройки" />
            <q-tab name="design" icon="person" label="Профиль" />
          </q-tabs>
        </div>
        <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
          <q-tab-panels
            class="tab-contents rounded-borders"
            v-model="tab"
            animated
            vertical
          >
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
            <!-- design -->
            <q-tab-panel name="design">
              <div>
                <div class="text-h5 q-mb-md q-mt-sm"><strong>Дизайн</strong></div>
                <div class="chooseImg">
                  <h6 class="q-mb-sm q-mt-sm">Change restaurant background</h6>
                  <div class="images shadow-1 q-pa-sm rounded-borders bg-grey-1">
                    <template v-if="preview">
                      <img :src="preview" class="img-fluid default-image" />
                    </template>
                    <img class="default-image" v-else src="../assets/img/background/bg-login.jpg">
                  </div>
                  <div class="row justify-center">
                    <label class="select-image cursor-pointer text-center inline-block bg-red-5 relative-position q-py-sm q-px-lg q-my-sm rounded-borders text-white text-weight-medium" for="my-file">Select Image</label>
                    <input type="file" accept="image/*" @change="previewImage" ref="file" class="input-none" id="my-file">
                  </div>
                </div>
                <q-card-actions class="no-shadow" align="center">
                  <q-btn @click="saveImg" class="bg-light-green-14 no-shadow q-pa-md" text-color="white" label="Сохранить"/>
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
            <q-tab class="q-mt-sm" name="settings" icon="notifications" label="Настройки" />
            <q-tab class="q-mt-lg" name="design" icon="mail" label="Дизайн" />
          </q-tabs>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';
import { api } from 'boot/axios'

export default defineComponent({
  name: "RestaurantSettings",
  data() {
    const dialog = ref(false)
    const position = ref('top')
      return {
        preview: null,
        image: null,
        preview_list: [],
        image_list: [],
        dialog,
        position,
        tab: ref('settings'),
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
    saveImg() {
      let data = new FormData()
      data.append('image', this.image)
      console.log(this.preview)
      console.log(this.image)
      this.$api.post('api/v3/vendor/posts/image', data, {
        headers: {
          Authorization: 'Bearer ' + LocalStorage.getItem('ownerToken')
        }
      })
      .then(res=>{
        console.log(res.data)
      })
      .catch(e=>{
        console.log(e)
      })
    },
    logout() {
      this.$store.dispatch('settings/logoutOwner', this.$store.getters['settings/getIsRestaurant'])
      this.$router.push('/login')
    },
    previewImage: function(event) {
      this.img = this.$refs.file.files[0]
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewMultiImage: function(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while(count --) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push(e.target.result);
          }
          this.image_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index ++;
        }
      }
    },
    reset: function() {
      this.image = null;
      this.preview = null;
      this.image_list = [];
      this.preview_list = [];
    }
  },
})
</script>

<style lang="scss">
.chooseImg {
  width: 320px;
  .images {
    width: 100%;
    height: 190px;
    border: 1px solid #dee2e6;
    .default-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .input-none {
    display: none;
  }
}
.q-tabs--vertical .q-tab__indicator {
  width: 5px;
  border-radius: 20px 0 0 20px !important;
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
