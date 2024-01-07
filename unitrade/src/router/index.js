import { createRouter, createWebHistory } from "vue-router";

import AuthPage from "@/components/AuthPage.vue";
// import UserProfile from "@/components/UserProfile.vue";
import Main_Page from "@/components/Main_Page.vue";

import Token from "@/token-usage.js";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main_Page,
    meta: {
      forLoggedIn: false,
    },
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthPage,
    props: true,
    meta: {
      forLoggedIn: false,
    },
  },
  {
    path: "/info",
    name: "info",
    component: () => import("@/components/Info/Info.vue"),
    meta: {
      forLoggedIn: false,
    },
  },
  {
    path: "/info/create",
    name: "infoCreate",
    component: () => import("@/components/Info/InfoCreate.vue"),
    meta: {
      forLoggedIn: true,
    },
  },
  {
    path: "/info/:id/edit",
    name: "infoEdit",
    component: () => import("@/components/Info/InfoEdit.vue"),
    meta: {
      forLoggedIn: true,
    },
  },
  {
    path: "/advertisements",
    name: "advertisements",
    component: () => import("@/components/Advertisement/AdvertisementsList.vue"),
    meta: {
      forLoggedIn: false,
    },
  },
  {
    path: "/advertisements/create",
    name: "advertisementCreate",
    component: () => import("@/components/Advertisement/AdvertisementCreatePage.vue"),
    meta: {
      forLoggedIn: true,
    },
  },
  {
    path: "/advertisements/:id",
    name: "advertisement",
    component: () => import("@/components/Advertisement/AdvertisementPage.vue"),
    meta: {
      forLoggedIn: false,
    },
  },
  {
    path: "/advertisements/:id/edit",
    name: "advertisementEdit",
    component: () => import("@/components/Advertisement/AdvertisementEditPage.vue"),
    meta: {
      forLoggedIn: true,
    },
  },
  {
    path: "/works",
    name: "works",
    component: () => import("@/components/Work/WorksList.vue"),
    meta: {
      forLoggedIn: false,
    },
  },
  {
    path: "/works/:id",
    name: "work",
    component: () => import("@/components/Work/WorkPage.vue"),
    meta: {
      forLoggedIn: false,
    },
  },
  {
    path: "/works/:id/edit",
    name: "workEdit",
    component: () => import("@/components/Work/WorkEditPage.vue"),
    meta: {
      forLoggedIn: true,
    },
  },
  {
    path: "/works/create",
    name: "workCreate",
    component: () => import("@/components/Work/WorkCreatePage.vue"),
    meta: {
      forLoggedIn: true,
    },
  },
  {
    path: "/me",
    name: "me",
    component: () => import("@/components/UserProfile.vue"),
    meta: {
      forLoggedIn: true,
    },
  },
  {
    path: "/about-us",
    name: "aboutUs",
    component: () => import("@/components/additionalInfo/AboutUsPage.vue"),
    meta: {
      forLoggedIn: false,
    },
  },
  {
    path: "/rules",
    name: "rules",
    component: () => import("@/components/additionalInfo/RulesPage.vue"),
    meta: {
      forLoggedIn: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const accessToken = Token.getAccessTokenFromCookie();
  const nextRouteIsForLoggedIn = to.meta?.forLoggedIn;

  if (nextRouteIsForLoggedIn && !accessToken) {
    next({ path: "/auth", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
