import request from '@/utils/request'

/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除
export function delEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/** *
 *  封装一个导入员工的接口
 *
 * ***/

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

// 读取用户详情的基础信息
export const getPersonalDetail = (id) => {
  return request({
    method: 'GET',
    url: `/employees/${id}/personalInfo`
  })
}

// 更新用户详情的基础信息
export const updatePersonal = (data) => {
  return request({
    method: 'PUT',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}

// 获取用户的岗位信息
export const getJobDetail = (id) => {
  return request({
    method: 'GET',
    url: `/employees/${id}/jobs`
  })
}

// 保存岗位信息
export const updateJob = (data) => {
  return request({
    method: 'PUT',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}

// 保存个人信息
export const saveUserDetailById = data => {
  return request({
    method: 'PUT',
    // url: `/employees/${data.id}/personalInfo`,
    url: `/sys/user/${data.id}`,
    data
  })
}

// 获取员工简单列表
export const getEmployeeSimple = () => {
  return request({
    method: 'GET',
    url: '/sys/user/simple'
  })
}
