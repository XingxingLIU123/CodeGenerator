<template lang="pug">
.modal(v-if="show")
  .ant-modal(:style="{width: width}")
    .ant-modal-content
      button.ant-modal-close(@click="close")
        span.ant-modal-close-x
          a-icon(type="close")
      .ant-modal-header
        .ant-modal-title {{title}}
      slot(name="content")
      .ant-modal-footer
        div
          a-button(@click="close") 取消
          a-button(@click="submit" type="primary") 确定
</template>

<script>
export default {
  name: 'modal',
  props: {
    width: String,
    show: Boolean,
    title: String
  },
  methods: {
    close () {
      this.$emit('close')
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  background: rgba(0,0,0, .3);
  &-content{
    min-height: 100px;
    background: #fff;
  }
}
</style>

