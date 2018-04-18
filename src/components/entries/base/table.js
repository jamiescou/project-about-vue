import dateTools from 'common/javascript/tools/dateTools'
import stringTooles from 'common/javascript/tools/stringTools'
import moneyTools from 'common/javascript/tools/moneyTools'
import config from 'common/config/config'
import merge from 'webpack-merge'

export default {
  name: 'table',
  data () {
    return {
      cacheData: [],
      searchData: {
      //   cashTime: null,
      //   createTime: null,
      //   createdTimeBegin: null,
      //   createdTimeEnd: null,
      //   cashTimeBegin: null,
      //   cashTimeEnd: null,
      //   companyQStr: '',
      //   hasParent: null,
      //   no: null,
        pageNum: 1
      },
      total: 0,
      pageSize: config.pageSize,
      currentPage: 1
    }
  },
  methods: {
    // 格式化开始
    dateFormater (row, column) { // 日期格式化 YYYY-MM-dd
      const value = row[column.property]
      return dateTools.dateFormater(value, 'YYYY.MM.DD')
    },
    dateFormaterPrecise (row, column) { // 日期格式化 YYYY-MM-DD HH:mm:ss
      let value = row[column.property]
      return dateTools.dateFormater(value, 'YYYY.MM.DD HH:mm:ss')
    },
    forLength (row, column) { // 内容长度处理
      return stringTooles.cellContentSub(row.remark)
    },
    dealNull (row, column) { // 是空
      let value = row[column.property]
      if (value === '' || value === null) {
        return '无'
      } else {
        return value
      }
    },
    dealOperate (row, column) { // 处理贸易信息
      let value = row[column.property]
      if (value.length === 0 || value === false || value === '' || value === null || value === undefined) {
        return '未上传'
      } else {
        return '已上传'
      }
    },
    paymentType (row, column) {
      const value = row[column.property]
      if (value === 'FULL_PAYMENT') {
        return '一次性付款'
      } else {
        return '分期付款'
      }
    },
    // 格式化结束
    search () { // 处理搜索
      this.setPage(1)
      this.getGrid()
    },
    setPage (page) {
      this.currentPage = this.searchData.pageNum = page
    },
    handleCurrentChange (page, a, b) { // 处理分页加载
      this.setPage(page)
      this.getGrid()
    },
    getTime (timeStr) {
      dateTools.stringToDate(timeStr)
    },
    handleSizeChange () {
    },
    // 日期转时间戳
    dateTotimestamp (value) {
      return Date.parse(new Date(value))
    },
    stringToTimestamp (value) {
      return dateTools.stringToDate(value)
    },
    // 保留两位小数
    doubleDigit (row, column) {
      const value = row[column.property]
      return moneyTools.doubleDigit(value)
    },
    moneyShow (row, column) {
      const value = row[column.property]
      return moneyTools.commafy(moneyTools.doubleDigit(value))
    },
    // 金额显示处理： 缩小times倍 + 千分符 + 小数点后两位
    moneyNarrow (row, column) {
      const value = row[column.property]
      return moneyTools.moneyNarrow(value)
    },
    // 利率显示处理： 缩小times倍
    rateNarrow (row, column) {
      const value = row[column.property]
      return moneyTools.rateNarrow(value)
    },
    handleParams (params) {
      params = merge({}, params)
      if (typeof params.status === 'number') {
        params.status = [params.status]
      }
      return params
    },
    // 编号不够6位自动补全
    completeNo (row, column) {
      const value = row[column.property]
      return stringTooles.completeNo(value)
    },
    // 页面刷新
    refresh () {
      location.reload()
    }
  }
}
