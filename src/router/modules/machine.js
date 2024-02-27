/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const machineRouter = {
  path: "/machine",
  component: Layout,
  redirect: "/machine/apply-list",
  name: "Machine",
  meta: {
    title: "设备管理",
    icon: "table",
  },
  children: [
    {
      path: "apply-list",
      component: () => import("@/views/machine/machine-apply"),
      name: "MachineApply",
      meta: { title: "设备申请列表" },
    },
    {
      path: "machine-list",
      component: () => import("@/views/machine/machine-list"),
      name: "MachineList",
      meta: { title: "已注册设备列表" },
    },
  ],
};
export default machineRouter;
