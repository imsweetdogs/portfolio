
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  CommonCanvasSection: typeof import("../../components/common/CanvasSection.vue")['default']
  CommonFooter: typeof import("../../components/common/Footer.vue")['default']
  CommonEffectsClickBurst: typeof import("../../components/common/effects/ClickBurst.vue")['default']
  CommonEffectsCursorParticles: typeof import("../../components/common/effects/CursorParticles.vue")['default']
  CommonHeader: typeof import("../../components/common/header/Header.vue")['default']
  CommonHeaderMobileDrawer: typeof import("../../components/common/header/MobileDrawer.vue")['default']
  CommonHeaderModulesGlassPill: typeof import("../../components/common/header/modules/GlassPill.vue")['default']
  CommonHeaderModulesHeaderActionBtn: typeof import("../../components/common/header/modules/HeaderActionBtn.vue")['default']
  CommonHeaderModulesHeaderAgeTicker: typeof import("../../components/common/header/modules/HeaderAgeTicker.vue")['default']
  CommonHeaderModulesHeaderClock: typeof import("../../components/common/header/modules/HeaderClock.vue")['default']
  CommonHeaderModulesHeaderLangBtn: typeof import("../../components/common/header/modules/HeaderLangBtn.vue")['default']
  CommonHeaderModulesHeaderLogo: typeof import("../../components/common/header/modules/HeaderLogo.vue")['default']
  CommonHeaderModulesHeaderMenuBtn: typeof import("../../components/common/header/modules/HeaderMenuBtn.vue")['default']
  CommonHeaderModulesHeaderNav: typeof import("../../components/common/header/modules/HeaderNav.vue")['default']
  CommonHeaderModulesHeaderNavLink: typeof import("../../components/common/header/modules/HeaderNavLink.vue")['default']
  CommonHeaderModulesHeaderTextureBtn: typeof import("../../components/common/header/modules/HeaderTextureBtn.vue")['default']
  CommonHeaderTypes: typeof import("../../components/common/header/types")['default']
  SectionsAboutSection: typeof import("../../components/sections/about/AboutSection.vue")['default']
  SectionsAboutModulesAboutSocials: typeof import("../../components/sections/about/modules/AboutSocials.vue")['default']
  SectionsAboutModulesWidgetsActivityWidget: typeof import("../../components/sections/about/modules/widgets/ActivityWidget.vue")['default']
  SectionsAboutModulesWidgetsGithubStatsWidget: typeof import("../../components/sections/about/modules/widgets/GithubStatsWidget.vue")['default']
  SectionsAboutModulesWidgetsSpotifyWidget: typeof import("../../components/sections/about/modules/widgets/SpotifyWidget.vue")['default']
  SectionsAboutModulesWidgetsSteamWidget: typeof import("../../components/sections/about/modules/widgets/SteamWidget.vue")['default']
  SectionsAboutModulesWidgetsSystemWidget: typeof import("../../components/sections/about/modules/widgets/SystemWidget.vue")['default']
  SectionsHeroSection: typeof import("../../components/sections/hero/HeroSection.vue")['default']
  SectionsHeroModulesHeroActions: typeof import("../../components/sections/hero/modules/HeroActions.vue")['default']
  SectionsHeroModulesHeroAmbientControls: typeof import("../../components/sections/hero/modules/HeroAmbientControls.vue")['default']
  SectionsHeroModulesHeroAmbientVideo: typeof import("../../components/sections/hero/modules/HeroAmbientVideo.vue")['default']
  SectionsHeroModulesHeroBadge: typeof import("../../components/sections/hero/modules/HeroBadge.vue")['default']
  SectionsHeroModulesHeroSticker: typeof import("../../components/sections/hero/modules/HeroSticker.vue")['default']
  SectionsHeroTypes: typeof import("../../components/sections/hero/types")['default']
  SectionsProjectsSection: typeof import("../../components/sections/projects/ProjectsSection.vue")['default']
  SectionsProjectsModulesProjectCard: typeof import("../../components/sections/projects/modules/ProjectCard.vue")['default']
  SectionsProjectsModulesProjectModal: typeof import("../../components/sections/projects/modules/ProjectModal.vue")['default']
  SectionsProjectsTypes: typeof import("../../components/sections/projects/types")['default']
  SectionsSkillsSection: typeof import("../../components/sections/skills/SkillsSection.vue")['default']
  SectionsSkillsModulesSkillBadge: typeof import("../../components/sections/skills/modules/SkillBadge.vue")['default']
  SectionsSkillsModulesSkillGroupCard: typeof import("../../components/sections/skills/modules/SkillGroupCard.vue")['default']
  SectionsSkillsTypes: typeof import("../../components/sections/skills/types")['default']
  /**
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  /**
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  /**
   * Catches client-side errors from its default slot and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  /**
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  /**
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  /**
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  /**
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  /**
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  /**
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  /**
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  NuxtAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  /**
   * Renders an optimized image through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
   */
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  /**
   * Renders responsive optimized images through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
   */
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  Icon: typeof import("../../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
  /**
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  /**
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyCommonCanvasSection: LazyComponent<typeof import("../../components/common/CanvasSection.vue")['default']>
  LazyCommonFooter: LazyComponent<typeof import("../../components/common/Footer.vue")['default']>
  LazyCommonEffectsClickBurst: LazyComponent<typeof import("../../components/common/effects/ClickBurst.vue")['default']>
  LazyCommonEffectsCursorParticles: LazyComponent<typeof import("../../components/common/effects/CursorParticles.vue")['default']>
  LazyCommonHeader: LazyComponent<typeof import("../../components/common/header/Header.vue")['default']>
  LazyCommonHeaderMobileDrawer: LazyComponent<typeof import("../../components/common/header/MobileDrawer.vue")['default']>
  LazyCommonHeaderModulesGlassPill: LazyComponent<typeof import("../../components/common/header/modules/GlassPill.vue")['default']>
  LazyCommonHeaderModulesHeaderActionBtn: LazyComponent<typeof import("../../components/common/header/modules/HeaderActionBtn.vue")['default']>
  LazyCommonHeaderModulesHeaderAgeTicker: LazyComponent<typeof import("../../components/common/header/modules/HeaderAgeTicker.vue")['default']>
  LazyCommonHeaderModulesHeaderClock: LazyComponent<typeof import("../../components/common/header/modules/HeaderClock.vue")['default']>
  LazyCommonHeaderModulesHeaderLangBtn: LazyComponent<typeof import("../../components/common/header/modules/HeaderLangBtn.vue")['default']>
  LazyCommonHeaderModulesHeaderLogo: LazyComponent<typeof import("../../components/common/header/modules/HeaderLogo.vue")['default']>
  LazyCommonHeaderModulesHeaderMenuBtn: LazyComponent<typeof import("../../components/common/header/modules/HeaderMenuBtn.vue")['default']>
  LazyCommonHeaderModulesHeaderNav: LazyComponent<typeof import("../../components/common/header/modules/HeaderNav.vue")['default']>
  LazyCommonHeaderModulesHeaderNavLink: LazyComponent<typeof import("../../components/common/header/modules/HeaderNavLink.vue")['default']>
  LazyCommonHeaderModulesHeaderTextureBtn: LazyComponent<typeof import("../../components/common/header/modules/HeaderTextureBtn.vue")['default']>
  LazyCommonHeaderTypes: LazyComponent<typeof import("../../components/common/header/types")['default']>
  LazySectionsAboutSection: LazyComponent<typeof import("../../components/sections/about/AboutSection.vue")['default']>
  LazySectionsAboutModulesAboutSocials: LazyComponent<typeof import("../../components/sections/about/modules/AboutSocials.vue")['default']>
  LazySectionsAboutModulesWidgetsActivityWidget: LazyComponent<typeof import("../../components/sections/about/modules/widgets/ActivityWidget.vue")['default']>
  LazySectionsAboutModulesWidgetsGithubStatsWidget: LazyComponent<typeof import("../../components/sections/about/modules/widgets/GithubStatsWidget.vue")['default']>
  LazySectionsAboutModulesWidgetsSpotifyWidget: LazyComponent<typeof import("../../components/sections/about/modules/widgets/SpotifyWidget.vue")['default']>
  LazySectionsAboutModulesWidgetsSteamWidget: LazyComponent<typeof import("../../components/sections/about/modules/widgets/SteamWidget.vue")['default']>
  LazySectionsAboutModulesWidgetsSystemWidget: LazyComponent<typeof import("../../components/sections/about/modules/widgets/SystemWidget.vue")['default']>
  LazySectionsHeroSection: LazyComponent<typeof import("../../components/sections/hero/HeroSection.vue")['default']>
  LazySectionsHeroModulesHeroActions: LazyComponent<typeof import("../../components/sections/hero/modules/HeroActions.vue")['default']>
  LazySectionsHeroModulesHeroAmbientControls: LazyComponent<typeof import("../../components/sections/hero/modules/HeroAmbientControls.vue")['default']>
  LazySectionsHeroModulesHeroAmbientVideo: LazyComponent<typeof import("../../components/sections/hero/modules/HeroAmbientVideo.vue")['default']>
  LazySectionsHeroModulesHeroBadge: LazyComponent<typeof import("../../components/sections/hero/modules/HeroBadge.vue")['default']>
  LazySectionsHeroModulesHeroSticker: LazyComponent<typeof import("../../components/sections/hero/modules/HeroSticker.vue")['default']>
  LazySectionsHeroTypes: LazyComponent<typeof import("../../components/sections/hero/types")['default']>
  LazySectionsProjectsSection: LazyComponent<typeof import("../../components/sections/projects/ProjectsSection.vue")['default']>
  LazySectionsProjectsModulesProjectCard: LazyComponent<typeof import("../../components/sections/projects/modules/ProjectCard.vue")['default']>
  LazySectionsProjectsModulesProjectModal: LazyComponent<typeof import("../../components/sections/projects/modules/ProjectModal.vue")['default']>
  LazySectionsProjectsTypes: LazyComponent<typeof import("../../components/sections/projects/types")['default']>
  LazySectionsSkillsSection: LazyComponent<typeof import("../../components/sections/skills/SkillsSection.vue")['default']>
  LazySectionsSkillsModulesSkillBadge: LazyComponent<typeof import("../../components/sections/skills/modules/SkillBadge.vue")['default']>
  LazySectionsSkillsModulesSkillGroupCard: LazyComponent<typeof import("../../components/sections/skills/modules/SkillGroupCard.vue")['default']>
  LazySectionsSkillsTypes: LazyComponent<typeof import("../../components/sections/skills/types")['default']>
  /**
   * Lazy-loaded version of `<NuxtWelcome>`.
   *
   * Displays the welcome screen used by new Nuxt projects.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
   */
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtLayout>`.
   *
   * Renders the selected layout around pages or error content.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
   */
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  /**
   * Lazy-loaded version of `<NuxtErrorBoundary>`.
   *
   * Catches client-side errors from its default slot and renders an error slot.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
   */
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  /**
   * Lazy-loaded version of `<ClientOnly>`.
   *
   * Renders its default slot only on the client, with an optional server fallback.
   *
   * @see https://nuxt.com/docs/4.x/api/components/client-only
   */
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  /**
   * Lazy-loaded version of `<DevOnly>`.
   *
   * Renders its content only during development.
   *
   * @see https://nuxt.com/docs/4.x/api/components/dev-only
   */
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  /**
   * Lazy-loaded version of `<NuxtLink>`.
   *
   * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
   */
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  /**
   * Lazy-loaded version of `<NuxtLoadingIndicator>`.
   *
   * Displays a progress bar during page navigation.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
   */
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  /**
   * Lazy-loaded version of `<NuxtTime>`.
   *
   * Formats dates and times consistently across server and client using the user's locale.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
   */
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  /**
   * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
   *
   * Announces route changes to assistive technologies using the current page title.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
   */
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  /**
   * Lazy-loaded version of `<NuxtAnnouncer>`.
   *
   * Announces dynamic content changes to assistive technologies.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
   */
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  /**
   * Lazy-loaded version of `<NuxtImg>`.
   *
   * Renders an optimized image through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
   */
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  /**
   * Lazy-loaded version of `<NuxtPicture>`.
   *
   * Renders responsive optimized images through the Nuxt Image module.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
   */
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyIcon: LazyComponent<typeof import("../../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
  /**
   * Lazy-loaded version of `<NuxtPage>`.
   *
   * Renders the current page from the `pages/` directory.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
   */
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  /**
   * Lazy-loaded version of `<NuxtIsland>`.
   *
   * Renders a non-interactive server component without shipping client-side JavaScript.
   *
   * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
   */
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

declare module '#app' {
  interface NuxtAppLiterals {
    componentName: "Icon" | "LazyIcon" | (string & {})
  }
}

export {}
