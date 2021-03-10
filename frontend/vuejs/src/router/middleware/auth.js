// import Cookie from "js-cookie";
// import store from "../../store";

// export default function auth({ to, next }) {
//   const token = Cookie.get("ecs_user_jwt_token") || null;
//   const tokenStore = store.getters["auth/token"];
//   const requiredAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiredAuth) {
//     if (!token && !tokenStore) {
//       next({ name: "Login" });
//     } else if (token && tokenStore) {
//       store.dispatch("commons/getCommonsData");
//       store.dispatch("commons/getCountRequest");
//       store.dispatch("auth/accountInfo");
//     }
//     next();
//   } else {
//     if (to.name === "Login" && token && tokenStore) {
//       next({ name: "Dashboard" });
//     }
//     next();
//   }
//   next();
// }
