<template>
  <div class="navigation-header">
    <button v-if="selectedCategory"
            class="btn-clean navigation-header__back"
            type="button"
            @click.stop="onBack"
    >
      <i class="icon-arrow-left" />
      <span>{{ selectedCategory.name }}</span>
    </button>
    <button type="button"
            class="btn-clean navigation-header__close"
            @click="closeMenu"
    >
      <i class="icon-close" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Header',

  props: {
    selectedCategory: {
      type: Object,
      default: null,
    },
  },

  methods: {
    closeMenu() {
      this.$store.commit('the_menu/SET_MENU_IS_VISIBLE', false);
    },
    onBack() {
      this.$emit('back');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/variables.scss";

.navigation-header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: darken(white, 3%);
  user-select: none;

  .icon-arrow-left {
    position: absolute;
    top: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
    left: 0;
    height: 12px;
  }

  &__back {
    padding-left: 25px;
    position: relative;
  }

  &__close {
    margin-left: auto;
  }
}
</style>
