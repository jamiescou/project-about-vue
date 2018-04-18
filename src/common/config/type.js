let status = {
  corpIDType: [
    {
      value: 0,
      label: '身份证'
    }],
  institutionType: [
    {
      value: 0,
      label: '自然人独资'
    },
    {
      value: 1,
      label: '法人独资'
    },
    {
      value: 2,
      label: '自然人投资/控股'
    },
    {
      value: 3,
      label: '国有独资'
    },
    {
      value: 4,
      label: '外商投资'
    },
    {
      value: 5,
      label: '外商独资'
    },
    { // wen
      value: 6,
      label: '股份有限公司'
    }
  ],
  repayType: [
    {
      value: 0,
      label: '等额本息'
    },
    {
      value: 1,
      label: '等额本金'
    }
  ],
  repayTypeSelect: [
    {
      value: 0,
      label: '等额本息还款'
    },
    {
      value: 1,
      label: '等额本金还款'
    }
  ],
  transferType: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 0,
      label: '收款'
    },
    {
      value: 1,
      label: '付款'
    },
    {
      value: 2,
      label: '充值'
    },
    {
      value: 3,
      label: '提现'
    }
  ]
}

let content = {

}

export { status as default, content }
