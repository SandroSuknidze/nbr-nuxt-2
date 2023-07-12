<template>
  <header class="header position-fixed w-100" :class="{ 'header--scrolled': headerScrolled }">
    <div v-if="shouldShowDeviceAlert" class="header__alert p-3 text-center" role="alert">
      {{ $t('course.onlyOneDeviceCanWatch') }}
    </div>
    <div class="header__container container align-items-center d-flex pt-3 pb-3">
      <TransparentButton class="header__burger d-lg-none" @click="toggleMenu">
        <Hamburger fill="#1968c3" />
      </TransparentButton>
      <LocalizedLink to="/">
        <nuxt-img
          class="header__logo object-fit:contain"
          src="/assets/images/header/logo.png"
          :alt="$t('general.speakEnglish')"
          :title="$t('general.speakEnglish')"
        />
      </LocalizedLink>
      <nav class="header-menu d-flex flex-center ml-auto" :class="{ 'header-menu--open': menuOpen }">
        <TransparentButton class="header-menu__close d-inline-block d-lg-none" @click="toggleMenu">
          <CloseIcon fill="#1968c3" size="40" />
        </TransparentButton>
        <ul class="header-menu__list d-flex p-0">
          <li v-for="item in menuItems" :key="item.to" class="header-menu__item" @click="toggleMenu">
            <LocalizedLink class="header-menu__link font-regular" :to="localePath(item.link)">
              {{ $t(item.title) }}
            </LocalizedLink>
          </li>
        </ul>
        <div class="d-md-none">
          <!-- <TheLanguageSelector /> -->
        </div>
      </nav>
      <!-- <transition name="fade" mode="out-in">
        <TheUserProfile v-if="loggedIn" />
        <TheAuthBlock v-else @onModalOpen="changeModal" />
      </transition>
      <TheLanguageSelector class="languages" /> -->
    </div>
    <!-- <ModalBasic :open="modalOpened" @close="closeModal">
      <transition name="fade" mode="out-in">
        <component :is="modalName" @onModalChange="changeModal" />
      </transition>
    </ModalBasic> -->
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
// import throttle from 'lodash/throttle';

// import { MODAL_TYPES } from '~/constants';
// import ModalBasic from '~/components/Modal/ModalBasic';
// import CloseIcon from '@/components/Icons/Close.vue';
// import Hamburger from '@/components/Icons/Hamburger.vue';
// import TheLanguageSelector from '@/components/Header/TheLanguageSelector.vue';
// const TheAuthBlock = () => import('@/components/Header/TheAuthBlock.vue');
// const TheUserProfile = () => import('@/components/Header/TheUserProfile.vue');
// const ModalWrapper = () => import('@/components/Auth/ModalWrapper.vue');
// const ForgotPasswordModal = () => import('@/components/Auth/ForgotPasswordModal.vue');
// const WelcomeBackModal = () => import('@/components/Auth/WelcomeBackModal.vue');

export default {
  name: 'TheHeader',
  // components: {
  //   CloseIcon,
  //   Hamburger,
  //   TheAuthBlock,
  //   TheUserProfile,
  //   TheLanguageSelector,
  //   ModalBasic,
  //   ModalWrapper,
  //   ForgotPasswordModal,
  //   WelcomeBackModal,
  // },
  data() {
    return {
      menuOpen: false,
      menuItems: [
        {
          title: 'menu.home',
          link: '/',
        },
        {
          title: 'menu.pricing',
          link: '/pricing',
        },
        {
          title: 'menu.aboutUs',
          link: '/about-us',
        },
        // {
        //   title: 'menu.blog',
        //   link: '/blog'
        // },
        // {
        //   title: 'menu.testimonials',
        //   link: '/testimonials'
        // },
        {
          title: 'menu.faq',
          link: '/faq',
        },
        {
          title: 'menu.contact',
          link: '/contact',
        },
      ],
      scrollPosition: 0,
      throttledScrollListener: null,
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      activeModal: 'modal/current',
    }),
    headerScrolled() {
      return this.scrollPosition > 130;
    },
    modalName() {
      switch (this.currentModal) {
        case MODAL_TYPES.LOGIN:
        case MODAL_TYPES.REGISTER:
          return 'ModalWrapper';
        case MODAL_TYPES.FORGOT_PASSWORD:
          return 'ForgotPasswordModal';
        case MODAL_TYPES.WELCOME_BACK:
          return 'WelcomeBackModal';
        default:
          return null;
      }
    },
    currentModal: {
      get: function () {
        return this.activeModal;
      },
      set: function (value) {
        return this.setActiveModal(value);
      },
    },
    modalOpened() {
      return [MODAL_TYPES.LOGIN, MODAL_TYPES.REGISTER, MODAL_TYPES.FORGOT_PASSWORD, MODAL_TYPES.WELCOME_BACK].includes(
        this.currentModal
      );
    },
    shouldShowDeviceAlert() {
      return this.$route.query.onlyOneDeviceAllowed === 'true';
    },
  },
  mounted() {
    this.addListeners();
  },
  beforeDestroy() {
    this.removeListeners();
  },
  methods: {
    ...mapMutations({
      setActiveModal: 'modal/SET_CURRENT_MODAL',
    }),
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    addListeners() {
      if (!process.browser) {
        return;
      }
      this.updateScroll();
      this.throttledScrollListener = throttle(this.updateScroll, 100);
      window.addEventListener('scroll', this.throttledScrollListener);
    },
    removeListeners() {
      if (!process.browser) {
        return;
      }
      window.removeEventListener('scroll', this.throttledScrollListener);
    },
    /**
     * Update scrollPosition value
     *
     * @returns {void}
     */
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    closeModal() {
      this.currentModal = null;
    },
    changeModal(type) {
      this.currentModal = type;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './assets/scss/app.scss';

.header__alert {
  background-color: #ffd700;
}
</style>
<style lang="scss">
.header {
  height: min-content;
  max-height: $header-height * 2;
  top: 0;
  left: 0;
  @include background-color('transparent');
  @include z-index('header');
  transition: all $transition-duration-base;

  &--scrolled {
    @include background-color('white');
  }

  &__container {
    height: 100%;

    @include media-breakpoint-down(md) {
      justify-content: space-between;
    }

    @include media-breakpoint-down(sm) {
      .languages {
        display: none !important;
      }
    }
  }

  &__logo {
    width: 100px;
    height: 56px;
  }

  &__burger {
    order: -2;
  }
  @include media-breakpoint-down(sm) {
    height: 75px;
  }
}

.header-menu {
  flex-direction: column;
  left: -100%;

  @include media-breakpoint-down(md) {
    position: fixed;
    width: 100%;
    height: 100%;
    @include background-color('bg-color');
    top: 0;
    left: -100%;
    order: -1;
    z-index: 10000;
    transition: all $transition-duration-base;
  }

  &--open {
    @include media-breakpoint-down(md) {
      left: 0;
    }
  }

  &__close {
    position: absolute;
    top: 40px;
    left: 15px;
  }

  &__list {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    @include media-breakpoint-down(lg) {
      width: 100%;
    }

    @include media-breakpoint-up(lg) {
      flex-direction: row;
      align-items: flex-end;
    }
  }

  &__item {
    list-style-type: none;

    @include media-breakpoint-down(md) {
      width: 100%;
      display: block;
    }
  }

  &__link {
    padding: 15px;
    color: transparentize(map-get($colors, 'warm-grey'), 0.5);
    transition: color $transition-duration-base;

    &.nuxt-link-active {
      @include text-color('warm-grey');
    }

    &:hover {
      @include text-color('warm-grey');
    }

    @include media-breakpoint-down(lg) {
      display: block;
      width: 100%;
      padding: rem(10);
      text-align: center;

      &.nuxt-link-active,
      &:hover,
      &:focus {
        @include background-color('light-blue');
        @include text-color('nice-blue');
      }
    }
  }

  &__auth {
    display: block;

    @media (min-width: 992px) {
      display: none;
    }
  }
}
</style>
