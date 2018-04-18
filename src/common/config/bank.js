let bank = {
  bank: [
    {
      value: 0,
      label: '平安银行'
    },
    {
      value: 1,
      label: '中信银行'
    },
    {
      value: 2,
      label: '华夏银行'
    }
  ],
  // 账户号类型
  businessScope: {
    'MARGIN': '保证金账户',
    'SETTLEMENT': '结算户',
    'RECEIVING': '回款专户'
  },
  accountType: [
    {
      label: '保证金账户',
      value: 'MARGIN'
    },
    {
      label: '结算户',
      value: 'SETTLEMENT'
    },
    {
      label: '回款专户',
      value: 'RECEIVING'
    }
  ]
}

export { bank as default }
