
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


export const CommonCanvasSection: typeof import("../components/common/CanvasSection.vue")['default']
export const CommonFooter: typeof import("../components/common/Footer.vue")['default']
export const CommonEffectsClickBurst: typeof import("../components/common/effects/ClickBurst.vue")['default']
export const CommonEffectsCursorParticles: typeof import("../components/common/effects/CursorParticles.vue")['default']
export const CommonHeader: typeof import("../components/common/header/Header.vue")['default']
export const CommonHeaderMobileDrawer: typeof import("../components/common/header/MobileDrawer.vue")['default']
export const CommonHeaderModulesGlassPill: typeof import("../components/common/header/modules/GlassPill.vue")['default']
export const CommonHeaderModulesHeaderActionBtn: typeof import("../components/common/header/modules/HeaderActionBtn.vue")['default']
export const CommonHeaderModulesHeaderAgeTicker: typeof import("../components/common/header/modules/HeaderAgeTicker.vue")['default']
export const CommonHeaderModulesHeaderClock: typeof import("../components/common/header/modules/HeaderClock.vue")['default']
export const CommonHeaderModulesHeaderLangBtn: typeof import("../components/common/header/modules/HeaderLangBtn.vue")['default']
export const CommonHeaderModulesHeaderLogo: typeof import("../components/common/header/modules/HeaderLogo.vue")['default']
export const CommonHeaderModulesHeaderMenuBtn: typeof import("../components/common/header/modules/HeaderMenuBtn.vue")['default']
export const CommonHeaderModulesHeaderNav: typeof import("../components/common/header/modules/HeaderNav.vue")['default']
export const CommonHeaderModulesHeaderNavLink: typeof import("../components/common/header/modules/HeaderNavLink.vue")['default']
export const CommonHeaderModulesHeaderTextureBtn: typeof import("../components/common/header/modules/HeaderTextureBtn.vue")['default']
export const CommonHeaderTypes: typeof import("../components/common/header/types")['default']
export const SectionsAboutSection: typeof import("../components/sections/about/AboutSection.vue")['default']
export const SectionsAboutModulesAboutSocials: typeof import("../components/sections/about/modules/AboutSocials.vue")['default']
export const SectionsAboutModulesWidgetsActivityWidget: typeof import("../components/sections/about/modules/widgets/ActivityWidget.vue")['default']
export const SectionsAboutModulesWidgetsGithubStatsWidget: typeof import("../components/sections/about/modules/widgets/GithubStatsWidget.vue")['default']
export const SectionsAboutModulesWidgetsSpotifyWidget: typeof import("../components/sections/about/modules/widgets/SpotifyWidget.vue")['default']
export const SectionsAboutModulesWidgetsSteamWidget: typeof import("../components/sections/about/modules/widgets/SteamWidget.vue")['default']
export const SectionsAboutModulesWidgetsSystemWidget: typeof import("../components/sections/about/modules/widgets/SystemWidget.vue")['default']
export const SectionsHeroSection: typeof import("../components/sections/hero/HeroSection.vue")['default']
export const SectionsHeroModulesHeroActions: typeof import("../components/sections/hero/modules/HeroActions.vue")['default']
export const SectionsHeroModulesHeroAmbientControls: typeof import("../components/sections/hero/modules/HeroAmbientControls.vue")['default']
export const SectionsHeroModulesHeroAmbientVideo: typeof import("../components/sections/hero/modules/HeroAmbientVideo.vue")['default']
export const SectionsHeroModulesHeroBadge: typeof import("../components/sections/hero/modules/HeroBadge.vue")['default']
export const SectionsHeroModulesHeroSticker: typeof import("../components/sections/hero/modules/HeroSticker.vue")['default']
export const SectionsHeroTypes: typeof import("../components/sections/hero/types")['default']
export const SectionsProjectsSection: typeof import("../components/sections/projects/ProjectsSection.vue")['default']
export const SectionsProjectsModulesProjectCard: typeof import("../components/sections/projects/modules/ProjectCard.vue")['default']
export const SectionsProjectsModulesProjectModal: typeof import("../components/sections/projects/modules/ProjectModal.vue")['default']
export const SectionsProjectsTypes: typeof import("../components/sections/projects/types")['default']
export const SectionsSkillsSection: typeof import("../components/sections/skills/SkillsSection.vue")['default']
export const SectionsSkillsModulesSkillBadge: typeof import("../components/sections/skills/modules/SkillBadge.vue")['default']
export const SectionsSkillsModulesSkillGroupCard: typeof import("../components/sections/skills/modules/SkillGroupCard.vue")['default']
export const SectionsSkillsTypes: typeof import("../components/sections/skills/types")['default']
/**
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
/**
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
/**
 * Catches client-side errors from its default slot and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
/**
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
/**
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
/**
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
/**
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
/**
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
/**
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
/**
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const NuxtAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
/**
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
/**
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const Icon: typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
/**
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
/**
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyCommonCanvasSection: LazyComponent<typeof import("../components/common/CanvasSection.vue")['default']>
export const LazyCommonFooter: LazyComponent<typeof import("../components/common/Footer.vue")['default']>
export const LazyCommonEffectsClickBurst: LazyComponent<typeof import("../components/common/effects/ClickBurst.vue")['default']>
export const LazyCommonEffectsCursorParticles: LazyComponent<typeof import("../components/common/effects/CursorParticles.vue")['default']>
export const LazyCommonHeader: LazyComponent<typeof import("../components/common/header/Header.vue")['default']>
export const LazyCommonHeaderMobileDrawer: LazyComponent<typeof import("../components/common/header/MobileDrawer.vue")['default']>
export const LazyCommonHeaderModulesGlassPill: LazyComponent<typeof import("../components/common/header/modules/GlassPill.vue")['default']>
export const LazyCommonHeaderModulesHeaderActionBtn: LazyComponent<typeof import("../components/common/header/modules/HeaderActionBtn.vue")['default']>
export const LazyCommonHeaderModulesHeaderAgeTicker: LazyComponent<typeof import("../components/common/header/modules/HeaderAgeTicker.vue")['default']>
export const LazyCommonHeaderModulesHeaderClock: LazyComponent<typeof import("../components/common/header/modules/HeaderClock.vue")['default']>
export const LazyCommonHeaderModulesHeaderLangBtn: LazyComponent<typeof import("../components/common/header/modules/HeaderLangBtn.vue")['default']>
export const LazyCommonHeaderModulesHeaderLogo: LazyComponent<typeof import("../components/common/header/modules/HeaderLogo.vue")['default']>
export const LazyCommonHeaderModulesHeaderMenuBtn: LazyComponent<typeof import("../components/common/header/modules/HeaderMenuBtn.vue")['default']>
export const LazyCommonHeaderModulesHeaderNav: LazyComponent<typeof import("../components/common/header/modules/HeaderNav.vue")['default']>
export const LazyCommonHeaderModulesHeaderNavLink: LazyComponent<typeof import("../components/common/header/modules/HeaderNavLink.vue")['default']>
export const LazyCommonHeaderModulesHeaderTextureBtn: LazyComponent<typeof import("../components/common/header/modules/HeaderTextureBtn.vue")['default']>
export const LazyCommonHeaderTypes: LazyComponent<typeof import("../components/common/header/types")['default']>
export const LazySectionsAboutSection: LazyComponent<typeof import("../components/sections/about/AboutSection.vue")['default']>
export const LazySectionsAboutModulesAboutSocials: LazyComponent<typeof import("../components/sections/about/modules/AboutSocials.vue")['default']>
export const LazySectionsAboutModulesWidgetsActivityWidget: LazyComponent<typeof import("../components/sections/about/modules/widgets/ActivityWidget.vue")['default']>
export const LazySectionsAboutModulesWidgetsGithubStatsWidget: LazyComponent<typeof import("../components/sections/about/modules/widgets/GithubStatsWidget.vue")['default']>
export const LazySectionsAboutModulesWidgetsSpotifyWidget: LazyComponent<typeof import("../components/sections/about/modules/widgets/SpotifyWidget.vue")['default']>
export const LazySectionsAboutModulesWidgetsSteamWidget: LazyComponent<typeof import("../components/sections/about/modules/widgets/SteamWidget.vue")['default']>
export const LazySectionsAboutModulesWidgetsSystemWidget: LazyComponent<typeof import("../components/sections/about/modules/widgets/SystemWidget.vue")['default']>
export const LazySectionsHeroSection: LazyComponent<typeof import("../components/sections/hero/HeroSection.vue")['default']>
export const LazySectionsHeroModulesHeroActions: LazyComponent<typeof import("../components/sections/hero/modules/HeroActions.vue")['default']>
export const LazySectionsHeroModulesHeroAmbientControls: LazyComponent<typeof import("../components/sections/hero/modules/HeroAmbientControls.vue")['default']>
export const LazySectionsHeroModulesHeroAmbientVideo: LazyComponent<typeof import("../components/sections/hero/modules/HeroAmbientVideo.vue")['default']>
export const LazySectionsHeroModulesHeroBadge: LazyComponent<typeof import("../components/sections/hero/modules/HeroBadge.vue")['default']>
export const LazySectionsHeroModulesHeroSticker: LazyComponent<typeof import("../components/sections/hero/modules/HeroSticker.vue")['default']>
export const LazySectionsHeroTypes: LazyComponent<typeof import("../components/sections/hero/types")['default']>
export const LazySectionsProjectsSection: LazyComponent<typeof import("../components/sections/projects/ProjectsSection.vue")['default']>
export const LazySectionsProjectsModulesProjectCard: LazyComponent<typeof import("../components/sections/projects/modules/ProjectCard.vue")['default']>
export const LazySectionsProjectsModulesProjectModal: LazyComponent<typeof import("../components/sections/projects/modules/ProjectModal.vue")['default']>
export const LazySectionsProjectsTypes: LazyComponent<typeof import("../components/sections/projects/types")['default']>
export const LazySectionsSkillsSection: LazyComponent<typeof import("../components/sections/skills/SkillsSection.vue")['default']>
export const LazySectionsSkillsModulesSkillBadge: LazyComponent<typeof import("../components/sections/skills/modules/SkillBadge.vue")['default']>
export const LazySectionsSkillsModulesSkillGroupCard: LazyComponent<typeof import("../components/sections/skills/modules/SkillGroupCard.vue")['default']>
export const LazySectionsSkillsTypes: LazyComponent<typeof import("../components/sections/skills/types")['default']>
/**
 * Lazy-loaded version of `<NuxtWelcome>`.
 *
 * Displays the welcome screen used by new Nuxt projects.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-welcome
 */
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtLayout>`.
 *
 * Renders the selected layout around pages or error content.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-layout
 */
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
/**
 * Lazy-loaded version of `<NuxtErrorBoundary>`.
 *
 * Catches client-side errors from its default slot and renders an error slot.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-error-boundary
 */
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
/**
 * Lazy-loaded version of `<ClientOnly>`.
 *
 * Renders its default slot only on the client, with an optional server fallback.
 *
 * @see https://nuxt.com/docs/4.x/api/components/client-only
 */
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
/**
 * Lazy-loaded version of `<DevOnly>`.
 *
 * Renders its content only during development.
 *
 * @see https://nuxt.com/docs/4.x/api/components/dev-only
 */
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
/**
 * Lazy-loaded version of `<NuxtLink>`.
 *
 * A drop-in replacement for Vue Router's `<RouterLink>` and the HTML `<a>` element.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-link
 */
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
/**
 * Lazy-loaded version of `<NuxtLoadingIndicator>`.
 *
 * Displays a progress bar during page navigation.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-loading-indicator
 */
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
/**
 * Lazy-loaded version of `<NuxtTime>`.
 *
 * Formats dates and times consistently across server and client using the user's locale.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-time
 */
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
/**
 * Lazy-loaded version of `<NuxtRouteAnnouncer>`.
 *
 * Announces route changes to assistive technologies using the current page title.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-route-announcer
 */
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtAnnouncer>`.
 *
 * Announces dynamic content changes to assistive technologies.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-announcer
 */
export const LazyNuxtAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
/**
 * Lazy-loaded version of `<NuxtImg>`.
 *
 * Renders an optimized image through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-img
 */
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
/**
 * Lazy-loaded version of `<NuxtPicture>`.
 *
 * Renders responsive optimized images through the Nuxt Image module.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-picture
 */
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
/**
 * Lazy-loaded version of `<NuxtPage>`.
 *
 * Renders the current page from the `pages/` directory.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-page
 */
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
/**
 * Lazy-loaded version of `<NuxtIsland>`.
 *
 * Renders a non-interactive server component without shipping client-side JavaScript.
 *
 * @see https://nuxt.com/docs/4.x/api/components/nuxt-island
 */
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
