import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUserDetailById(userId) {
  return request({
    url: `/sys/user/${userId}`
  })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
