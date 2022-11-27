import request from '@/utils/request'

export function getDepartments() {
  return request({
    method: 'get',
    url: '/company/department'
  })
}

export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
export function getSimpleList() {
  return request({
    method: 'GET',
    url: 'sys/user/simple'
  })
}
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}


