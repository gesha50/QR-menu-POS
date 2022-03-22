<template>
  <q-page class="RestaurantSettings">
    <!-- tab -->
    <div class="container q-mb-lg q-py-xl">
      <div class="q-pa-md lt-sm row justify-between">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="reorder"
          @click="open('left')" />
          <a class="back q-py-sm q-px-lg no-margin" href="/">Back</a>
      </div>
      <div class="column justify-center">
        <div class="row q-mb-lg gt-xs"><a class="back q-py-sm q-px-lg" href="/">Back</a></div>
        <div class="row justify-center q-px-md">
          <div class="q-mr-md col-lg-3 col-md-3 col-xs-3 gt-xs tab-contents rounded-borders bg-white">
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
            <q-tab-panel name="design" class="no-padding">
              <div class="q-pa-md">
                <div class="text-h5 q-mb-md q-mt-sm"><strong>Дизайн</strong></div>
                <div class="chooseImg">
                  <!-- <h6 class="q-mb-sm q-mt-sm">Change restaurant background</h6> -->
                  <div class="images shadow-1 q-pa-sm rounded-borders bg-grey-1">
                    <template v-if="preview">
                      <img :src="preview" class="img-fluid default-image" />
                    </template>
                    <img class="default-image" v-else :src="backgroundImagePath">
                  </div>
                  <div class="row justify-center">
                    <label for="my-file">
                      <q-badge
                        class="cursor-pointer q-pa-md q-mt-md"
                        style="font-size: 17px; font-weight: 500;"
                        color="red-5"
                        label="Select Image"
                      />
                    </label>
                    <input type="file" accept="image/*" @change="previewImage" ref="file" class="input-none" id="my-file">
                  </div>
                </div>
                <q-card-actions class="no-shadow" align="center">
                  <q-btn
                    :loading="isImgSend"
                    @click="saveImg"
                    class="bg-light-green-14 no-shadow q-pa-md"
                    text-color="white"
                    label="Сохранить"
                  />
                  <q-btn
                    v-if="!isImageDefault"
                    :loading="isImgSend"
                    class="bg-yellow-5 no-shadow q-pa-md"
                    label="Картинка по умолчанию"
                    @click="defaultBackgroundImage"
                  />
                </q-card-actions>
              </div>
                <div class="full-width bg-white container-btn">
                  <q-card-actions class="save-qbtn q-pb-md" align="center">
                    <q-btn @click="saveImg" text-color="white" label="Сохранить"/>
                  </q-card-actions>
                </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
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
            <q-tab class="q-mt-lg" name="settings" icon="notifications" label="Настройки" />
            <q-tab class="q-mt-sm" name="design" icon="mail" label="Дизайн" />
          </q-tabs>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {LocalStorage} from "quasar";

export default defineComponent({
  name: "RestaurantSettings",
  data() {
    const dialog = ref(false)
    const position = ref('top')
      return {
        isImgSend: false,
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
    isImageDefault() {
      return this.backgroundImagePath === process.env.API + '/storage/pos/background/bg-login.jpg';

    },
    isRestaurant() {
      return !(this.$store.getters["settings/auth"].loggedIn || !this.$store.getters["settings/owner"].loggedIn);
    },
    backgroundImagePath() {
      return this.$store.getters['settings/backgroundImagePath']
    },
  },
  methods: {
    defaultBackgroundImage() {
      this.isImgSend = true

      this.$q.localStorage.remove('backgroundImgPath')
      this.$store.dispatch(
        'settings/changeBackgroundImagePath',
        process.env.API + '/storage/pos/background/bg-login.jpg'
      )

      this.isImgSend = false
    },
    saveImg() {
      this.isImgSend = true
      let data = new FormData()
      data.append('image', this.image)
      this.$api.post('api/v3/vendor/posts/image', data, {
        headers: {
          Authorization: 'Bearer ' + LocalStorage.getItem('ownerToken')
        }
      })
      .then(res=>{
        console.log(res.data)
        this.$q.localStorage.set('backgroundImgPath', res.data.image)
        this.$store.dispatch(
          'settings/changeBackgroundImagePath',
          process.env.API + '/' + this.$q.localStorage.getItem('backgroundImgPath')
        )
        this.isImgSend = false
      })
      .catch(e=>{
        console.log(e)
        this.isImgSend = false
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
.back {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 120%;
  text-align: center;
  color: #5B5B5B;
  text-decoration: none;
  background: #ffffff;
  border-radius: 8px;
  margin-left: 8.8%;
}
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
.tab-mobile{
  border-radius: 0 20px 20px 0!important;
  width: 300px;
  height: 500px;
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
.tab-contents{
  border-radius: 15px;
  height: 600px;
}
.container-btn {
  position: absolute;
  bottom: 0;
  .save-qbtn .q-btn{
    border-radius: 15px;
    background-color: #07C900;
    width: 50%;
    font-size: 17px;
    font-weight: 550;
  }
}
</style>
