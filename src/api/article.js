import request from "@/utils/request";
import { getToken } from "@/utils/auth";

export function fetchList() {
  return request({
    url: "/machine/apply_machine",
    method: "get",
  });
}

export function applyMachine(mac_id, apply_reason) {
  return request({
    url: "/machine/apply_machine",
    method: "post",
    data: { mac_id, apply_reason },
  });
}
export function fetchMachineList(page = 1, page_size = 20) {
  return request({
    url: "/machine/get_machine_list",
    method: "get",
    params: { page, page_size },
  });
}
export function updateMachineStatus(mac_id, status) {
  return request({
    url: "/machine/update_machine_status",
    method: "post",
    data: { mac_id, enable: !status },
  });
}
export function removeRegisterMachine(mac_id) {
  return request({
    url: "/machine/remove_machine",
    method: "post",
    data: { mac_id },
  });
}

export function get_hh_user_list(token) {
  return request({
    url: `/hh_app/hh_user_list?token=${token}`,
    method: "get",
  });
}

export function fetchArticle(id) {
  return request({
    url: "/vue-element-admin/article/detail",
    method: "get",
    params: { id },
  });
}

export function fetchPv(pv) {
  return request({
    url: "/vue-element-admin/article/pv",
    method: "get",
    params: { pv },
  });
}

export function createArticle(data) {
  return request({
    url: "/vue-element-admin/article/create",
    method: "post",
    data,
  });
}

export function updateArticle(data) {
  return request({
    url: "/vue-element-admin/article/update",
    method: "post",
    data,
  });
}
