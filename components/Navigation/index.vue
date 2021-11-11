<template>
  <transition name="fade">
    <div v-show="$store.state.the_menu.menu_is_visible"
         class="site-navigation"
    >
      <div v-click-outside="onOutsideClick"
           class="site-navigation__wrapper"
      >
        <NavigationHeader :selected-category="selectedCategory"
                          @back="onBack"
        />

        <ul class="site-navigation__items">
          <li v-for="category in activeMenuCategories"
              :key="category.id"
              class="site-navigation__item"
          >
            <a class="site-navigation__link"
               :href="`${preSlug}${category.slug}/`"
               @click.stop="selectCategory($event, category)"
            >
              {{ category.name }}
              <i v-if="category.submenu" class="icon-arrow-right" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import ClickOutside from 'vue-click-outside';

import NavigationHeader from './Header.vue';

export default {
  name: 'Navigation',

  directives: {
    ClickOutside,
  },

  components: {
    NavigationHeader,
  },

  data() {
    return {
      menuStack: [],
    };
  },

  computed: {
    ...mapState({
      theMenu: (state) => state.the_menu,
    }),

    activeMenuCategories() {
      if (!this.menuStack.length) return this.theMenu.menu;

      return this.menuStack.reduce((acc, val) => acc.find((el) => el.id === val.id)?.submenu, this.theMenu.menu);
    },

    selectedCategory() {
      if (!this.menuStack.length) return null;

      return this.menuStack[this.menuStack.length - 1];
    },

    preSlug() {
      if (!this.menuStack.length) return '/catalog/';

      return this.menuStack.reduce((acc, val) => `${acc}${val.slug}/`, '/catalog/');
    },
    isMenuVisible() {
      return this.theMenu.menu_is_visible;
    },
  },

  watch: {
    isMenuVisible(val) {
      if (val) {
        document.body.classList.add('menu-visible');
        return;
      }
      document.body.classList.remove('menu-visible');
    },
  },

  methods: {
    selectCategory(e, val) {
      if (!val.submenu) return;
      e.preventDefault();
      this.menuStack.push(val);
    },
    onBack() {
      if (!this.menuStack) return;
      this.menuStack.pop();
    },
    onOutsideClick() {
      if (window.innerWidth > 767) this.closeMenu();
    },
    closeMenu() {
      this.$store.commit('the_menu/SET_MENU_IS_VISIBLE', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/variables.scss";

.site-navigation {
  position: absolute;
  left: 0;
  top: $header-height-desktop;
  display: flex;
  flex-direction: column;
  grid-area: site-navigation;
  list-style-type: none;
  width: 100%;
  height: calc(100vh - #{$header-height-desktop});
  z-index: 1;
  padding-left: 0;

  @media (min-width: $screen-md){
    height: calc(100vh - #{$header-height-mobile});
    top: $header-height-mobile;
  }

  &__wrapper {
    min-height: 100%;
    overflow-y: auto;
    position: relative;
    background-color: $white;
    @media (min-width: $screen-md){
      width: $menu-width;
    }
  }

  &__items {
    padding-left: 0;
    overflow-y: auto;
    padding-bottom: 120px;
    @media (min-width: $screen-md){
      padding-bottom: 50px;
      width: $menu-width;
    }
  }

  &__item {
    display: block;
    width: 100%;
    min-height: 47px;
    position: relative;
    color: #333;
    @media (min-width: $screen-md){
      &:hover,
      &:active {
        background-color: rgb(130, 0, 255);
        color: $white;
      }
    }
  }

  &__link {
    width: 100%;
    color: inherit;
    display: flex;
    align-items: center;
    padding: .75rem 1rem;
    @media (min-width: $screen-md){
      &:hover,
      &:active {
        color: rgb(255, 255, 255);
      }
    }

    .icon-arrow-right {
      margin-left: auto;
    }
  }
}
</style>
