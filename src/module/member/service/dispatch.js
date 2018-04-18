// import router from 'common/config/router'
import cookieTools from 'common/javascript/tools/cookieTools'
import accessControl from 'common/javascript/tools/accessControl.js'

const dispatch = {
  login () {
    // const role = cookieTools.getCookie('role')
    const step = cookieTools.getCookie('step-register')
    const isReal = !(parseInt(step) < 4)
    var staticResources = localStorage.resource

    if (!isReal) {
      // 实名未完成
      location.href = '#/member/register'
      return
    } else if (staticResources === undefined || staticResources === null || staticResources === '') {
      // 没有权限
      location.href = '#/noaccess'
      return
    } else {
      // 已实名
      var accessArr = accessControl.getAllAccess()
      for (let i = 0; i < accessArr.length; i++) {
        if (accessArr[i].type === 1) {
          location.href = '#' + accessArr[i].url
          return
        }
      }
      location.href = '#/noaccess'
    }

    // if (role === '1') {
    //   location.href = router.coreCompanyDefaultUrl
    // } else if (role === '2') {
    //   location.href = router.supplierDefaultUrl
    // } else if (role === '3') {
    //   location.href = router.financingDefaultUrl
    // }
  },
  logout () {
    cookieTools.deleteCookie('role')
    localStorage.removeItem('resource')
    sessionStorage.removeItem('currentCompany')
    sessionStorage.removeItem('userStatus')
    sessionStorage.removeItem('serialNo')
    sessionStorage.removeItem('issuerDn')
    sessionStorage.removeItem('name')
    location.href = '/'
  },
  isRealName () {
    const step = cookieTools.getCookie('step-register')
    if (parseInt(step) < 4) {
      return false
    }
    return true
  },
  isLogin () {
    const role = cookieTools.getCookie('role')
    if (role) {
      return true
    } else {
      return false
    }
  },
  isCoreCompany () {
    const role = cookieTools.getCookie('role')

    if (role === '1') {
      return true
    } else {
      return false
    }
  },
  toRealName () {
    location.href = '/#/member/register'
  },
  toRealInfo () {
    location.href = '/#/user/real-name'
    // if (this.isCoreCompany()) {
    //   location.href = '/#/account/credit-info'
    // } else {
    //   location.href = '/#/supplier/info-real-name'
    // }
  }
}

export default dispatch
