<template>
<div class="DialogAddComment">
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-pt-sm q-pb-lg">
      <div class="row justify-center full-width">
        <q-input
          autofocus
          class="q-ma-sm q-mb-lg"
          style="width: 300px;"
          :label="$t('dialogComment.label')"
          :model-value="comment"
          @update:model-value="changeComment($event)"
          @keydown.enter.prevent="onOKClick"
        >
          <template v-slot:append>
            <q-icon name="close" @click="deleteComment" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <!-- buttons example -->
      <q-card-actions align="center">
        <q-btn flat text-color="grey-7" size="md" :label="$t('btn.cancel')" @click="onCancelClick" />
        <q-btn
          rounded
          text-color="white"
          size="md"
          class="order-qbtn"
          :label="$t('dialogComment.add')"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "DialogAddComment",
    emits: ['ok', 'hide', 'addComment'],
    data() {
        return {

        }
    },
    created() {},
    mounted() {},
    components: {},
    computed: {
      comment() {
        return this.$store.getters['items/comment'](this.table_id)
          ? this.$store.getters['items/comment'](this.table_id)
          : ''
      },
      table_id() {
        return this.$route.path.split('/')[2]
      },
    },
    methods: {
      changeComment(e) {
        this.$store.dispatch('items/changeComment', [this.table_id, e])
      },
      deleteComment() {
        this.$store.dispatch('items/deleteComment', this.table_id)
      },
      // following method is REQUIRED
      // (don't change its name --> "show")
      show () {
        this.$refs.dialog.show()
      },

      // following method is REQUIRED
      // (don't change its name --> "hide")
      hide () {
        this.$refs.dialog.hide()
      },

      onDialogHide () {
        // required to be emitted
        // when QDialog emits "hide" event
        this.$emit('hide')
      },
      onOKClick () {
        // on OK, it is REQUIRED to
        // emit "ok" event (with optional payload)
        // before hiding the QDialog
        this.$emit('ok')
        // or with payload: this.$emit('ok', { ... })
        this.$emit('addComment', this.comment)
        // then hiding dialog
        this.hide()
      },
      onCancelClick () {
        // we just need to hide the dialog
        this.hide()
      }
    },
})
</script>

<style lang="scss" scoped>

</style>
