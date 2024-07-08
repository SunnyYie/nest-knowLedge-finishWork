import { Role } from './role.enum'

type RouterDataType = typeof routersData
export type RouterKeys = keyof RouterDataType

export const routersData = {
  login: {
    path: '/login',
    hasMenu: false,
  },
  admin_manage: {
    path: '/admin_manage',
    hasMenu: true,
  },
  corret_exam: {
    // 页面8： 批改试卷（管理员）
    path: '/corret_exam/:exam_id',
    hasMenu: true,
  },
  corret_exam_list: {
    // 页面7： 批阅试卷列表（管理员）
    path: '/corret_exam_list',
    hasMenu: true,
  },
  exam: {
    // 页面4： 考试 (学生)
    path: '/exam/:exam_id',
    hasMenu: true,
  },
  exam_history: {
    //页面5： 学生考试记录 （学生）
    path: '/exam_history',
    hasMenu: true,
  },
  exam_select: {
    // 页面3： 考题选择 （学生）
    path: '/exam_select',
    hasMenu: true,
  },
  person_info: {
    // 页面2： 个人信息录入（学生 管理员）
    path: '/person_info',
    hasMenu: false,
  },
  read_exam: {
    // 页面6 查看试卷（学生 管理员）
    path: '/read_exam/:exam_id',
    hasMenu: true,
  },
  student_manage: {
    //页面9： 学生管理(管理员)
    path: '/student_manage',
    hasMenu: true,
  },
  subject_add: {
    // 页面11： 考题录入（管理员）
    path: '/subject_add',
    hasMenu: true,
  },
  subject_manage: {
    // 页面10： 课程管理 （管理员）
    path: '/subject_manage',
    hasMenu: true,
  },
}

export const studentMenus = [
  {
    label: '考题选择',
    key: 'exam_select',
  },
  {
    label: '考试记录',
    key: 'exam_history',
  },
]

export const adminMenus = [
  {
    label: '阅卷列表',
    key: 'corret_exam_list',
  },
  {
    label: '考题管理',
    key: 'subject_add',
  },
  {
    label: '课程管理',
    key: 'subject_manage',
  },
  {
    label: '学员管理',
    key: 'student_manage',
  },
]

export const superAdminMenus = [
  {
    label: '阅卷列表',
    key: 'corret_exam_list',
  },
  {
    label: '考题管理',
    key: 'subject_add',
  },
  {
    label: '课程管理',
    key: 'subject_manage',
  },
  {
    label: '学员管理',
    key: 'student_manage',
  },
  {
    label: '管理员管理',
    key: 'admin_manage',
  },
]

export function getMenuFactory(role: Role) {
  let menus: any[] = []

  if (role === Role.student) {
    menus = studentMenus
  } else if (role === Role.admin) {
    menus = adminMenus
  } else if (role === Role.super_admin) {
    menus = superAdminMenus
  }

  return menus.map((item) => {
    return {
      ...item,
      ...routersData[item.key],
    }
  })
}
