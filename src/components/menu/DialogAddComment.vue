<template>
<div class="DialogAddComment">
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-pt-sm q-pb-lg">
      <div class="row justify-center full-width">
        <q-input
          class="q-ma-sm q-mb-lg"
          style="width: 300px;"
          label="Comment to Kitchen"
          :model-value="comment"
          @update:model-value="changeComment($event)"
        />
      </div>
      <!-- buttons example -->
      <q-card-actions align="center">
        <q-btn flat text-color="grey-7" size="md" label="Отмена" @click="onCancelClick" />
        <q-btn :disable="comment.length === 0" rounded text-color="white" size="md" class="order-qbtn" label="Добавить комментарий" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: "DialogAddComment",
    emits: ['ok', 'hide'],
    data() {
        return {
          comment: ''
        }
    },
    created() {},
    mounted() {},
    components: {},
    computed: {},
    methods: {
      changeComment(e) {
        console.log(e)
        this.comment = e
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
