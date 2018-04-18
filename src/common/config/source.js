let source = {
  // 核心企业 - 暂存凭证
  vCertificateCache: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 0,
      label: '登记待审批'
    },
    {
      value: 2,
      label: '审批未通过'
    }
  ],
  // 核心企业 - 凭证查询 - 审批状态
  approvalStage: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 0,
      label: '待审批'
    },
    {
      value: 1,
      label: '审批通过'
    },
    {
      value: 2,
      label: '审批未通过'
    }
  ]
}

export default source
