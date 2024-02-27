/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const hhAppRouter = {
  path: "/hh-app-user",
  redirect: "/hh-app-user/list",
  component: Layout,
  name: "hh-Account",

  meta: {
    title: "账号管理",
    icon: "email",
  },
  children: [
    {
      path: "list",
      component: () => import("@/views/machine/machine-apply"),
      name: "hh-Account-user",
      meta: { title: "用户管理" },
    },
  ],
};
export default hhAppRouter;
