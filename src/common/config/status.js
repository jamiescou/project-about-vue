let status = {
  operationLogStatus: [
    {
      value: 0,
      label: '暂存'
    },
    {
      value: 1,
      label: '已删除'
    },
    {
      value: 2,
      label: '暂存'
    },
    {
      value: 3,
      label: '登记待审批'
    },
    {
      value: 4,
      label: '审批未通过'
    },
    {
      value: 5,
      label: '审批通过'
    },
    {
      value: 6,
      label: '已签收'
    },
    {
      value: 7,
      label: '已拒收'
    },
    {
      value: 8,
      label: '待签收'
    }
  ],
  operationLogAction: [
    {
      value: 0,
      label: '登记凭证'
    },
    {
      value: 1,
      label: '删除凭证'
    },
    {
      value: 2,
      label: '恢复凭证'
    },
    {
      value: 3,
      label: '提交审批'
    },
    {
      value: 4,
      label: '审批凭证'
    },
    {
      value: 5,
      label: '审批凭证'
    },
    {
      value: 6,
      label: '签收凭证'
    },
    {
      value: 7,
      label: '拒收凭证'
    },
    {
      value: 8,
      label: '流转凭证'
    }
  ],
  // 凭证查询状态
  transferApplyStatus: [
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
      label: '审批驳回'
    }
  ],
  // 凭证查询状态
  transferApproveStatus: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '审批通过'
    },
    {
      value: 2,
      label: '审批驳回'
    }
  ],
  // 流转信息状态
  downstreamStatus: [
    {
      value: 0,
      label: '待签收'
    },
    {
      value: 1,
      label: '已签收'
    },
    {
      value: 2,
      label: '拒收'
    },
    {
      value: 3,
      label: '已付款'
    }
  ],
  vCertificateCache: [
    {
      value: -1,
      label: '已删除',
      type: 'warning'
    },
    {
      value: 1,
      label: '暂存',
      type: 'warning'
    },
    {
      value: 2,
      label: '已提交',
      type: 'warning'
    },
    {
      value: 3,
      label: '已审批',
      type: 'warning'
    },
    {
      value: 4,
      label: '拒收',
      type: 'danger'
    },
    {
      value: 5,
      label: '已兑付',
      type: 'success'
    }
  ],
  vVerifyCertificated: [
    {
      value: 0,
      label: '全部'
    },
    {
      value: 1,
      label: '通过'
    },
    {
      value: 2,
      label: '驳回'
    }
  ],
  vCertificateCacheDeleted: [
    {
      value: 0,
      label: '已删除凭证'
    }
  ],
  vCertificateVerify: [
    {
      value: 2,
      label: '登记待审批'
    }
  ],
  vCertificateVerifyCertificated: [
    {
      value: 3,
      label: '登记已审批'
    },
    {
      value: 4,
      label: '暂存'
    }
  ],
  // 凭证查询状态
  submitedVoucher: [
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
    }
  ],
  // 待审批
  vMyCertificateApprovalIng: [
    {
      value: 2000,
      label: '全部'
    },
    {
      value: 2001,
      label: '登记待审批'
    }
  ],
  // 审批通过
  approvedVoucher: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 0,
      label: '待签收'
    },
    {
      value: 1,
      label: '已签收'
    },
    {
      value: 2,
      label: '拒收'
    },
    {
      value: 3,
      label: '已付款'
    }
  ],
  // 审批未通过
  vMyCertificateNotPass: [
    {
      value: 4000,
      label: '全部'
    },
    {
      value: 4001,
      label: '审批未通过'
    }
  ],
  vPaymentApply: [
    {
      value: 0,
      label: '登记已签收'
    }
  ],
  vPaymentApplyList: [
    {
      value: 0,
      label: '已付款'
    },
    {
      value: 1,
      label: '未付款'
    }
  ],
  vPaymentApplyList1: [
    {
      value: 0,
      label: '申请通过'
    },
    {
      value: 1,
      label: '申请驳回'
    }
  ],
  toSignVoucher: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 0,
      label: '登记待签收'
    },
    {
      value: 1,
      label: '转让待签收'
    }
  ],
  vsVoucherSignList: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '已签收'
    },
    {
      value: 2,
      label: '拒收'
    }
  ],
  // 供应商-凭证查询
  vsVoucherSearch: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 0,
      label: '已签收'
    },
    {
      value: 1,
      label: '拒收'
    },
    // {
    //   value: 2,
    //   label: '转让待签收'
    // },
    // {
    //   value: 3,
    //   label: '转让已签收'
    // },
    // {
    //   value: 4,
    //   label: '转让拒收'
    // },
    {
      value: 5,
      label: '已付款'
    },
    {
      value: 6,
      label: '部分付款'
    }
  ],
  // 供应商- 凭证转让
  vsVoucherAssign: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '登记已签收'
    },
    {
      value: 2,
      label: '转让已签收'
    }
  ],
  // 供应商 - 凭证转让 - 转让记录
  vsVoucherAssignRecord: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 0,
      label: '转让待签收'
    },
    {
      value: 1,
      label: '已签收'
    },
    {
      value: 2,
      label: '拒收'
    }
  ],
  // 付款状态
  vpay_apply: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 0,
      label: '待付款'
    },
    {
      value: 1,
      label: '付款成功'
    },
    {
      value: 2,
      label: '付款中'
    },
    {
      value: 3,
      label: '付款失败'
    }
  ],
  // 付款-审批结果
  vpayApprove: [
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
  ],
  // 付款-审批结果搜索
  approveSearch: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '审批通过'
    },
    {
      value: 2,
      label: '审批未通过'
    }
  ],
  // 供应商 - 融资管理 - 融资意向状态
  supplierFinanceStatus: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '待审批'
    },
    {
      value: 2,
      label: '审批通过'
    },
    {
      value: 3,
      label: '审批未通过'
    }
  ],
  // 供应商 - 融资管理 - 融资申请状态
  supplierFinanceApplyStatus: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '待审批'
    },
    {
      value: 2,
      label: '审批通过'
    },
    {
      value: 3,
      label: '审批未通过'
    },
    {
      value: 4,
      label: '未放款'
    },
    {
      value: 5,
      label: '已放款'
    }
  ],
  // 供应商 - 融资管理 - 还款状态
  supplierFinanceRepaymentStatus: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '未还款'
    },
    {
      value: 2,
      label: '已还款'
    },
    {
      value: 3,
      label: '逾期'
    }
  ],
  // 供应商 - 融资管理 - 还款记录
  supplierFinanceRepaymentRecordStatus: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '银行处理中'
    },
    {
      value: 2,
      label: '成功'
    },
    {
      value: 3,
      label: '失败'
    }
  ],
  // 融资管理 - 融资结果

  // 未处理TODO,已质押PLEDGED,已转让TRANSFERED,
  // 已解除质押UNPLEDGED,已销账WRITEOFF;

  financingResult: [
    {
      value: 'TODO',
      label: '未处理'
    },
    {
      value: 'NO_STATUS',
      label: '无状态'
    },
    {
      value: 'PLEDGED',
      label: '已质押'
    },
    {
      value: 'UNPLEDGED',
      label: '已解除质押'
    },
    {
      value: 'TRANSFERED',
      label: '已转让'
    },
    {
      value: 'WRITEOFF',
      label: '已销账'
    }
  ],
  // 融资管理 - 回款状态
  moneyBack: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 'WAITING_MONEY_BACK',
      label: '待回款'
    },
    {
      value: 'PART_MONEY_BACK',
      label: '部分回款'
    },
    {
      value: 'ALL_MONEY_BACK',
      label: '全部回款'
    }
  ],
  // 融资管理 - 融资方式
  finType: [
    {
      value: 'HYPOTHECATION',
      label: '质押融资'
    },
    {
      value: 'FACTOR',
      label: '保理融资'
    }
  ],
  // 供应商 - 子账户：交易记录、充值记录、提现记录
  supplierSubAccountTxRecordStatus: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '银行处理中'
    },
    {
      value: 2,
      label: '成功'
    },
    {
      value: 3,
      label: '失败'
    }
  ]
}

let results = {
  vCertificateVerifyCertificated: [
    {
      value: null,
      label: '全部'
    },
    {
      value: 1,
      label: '通过'
    },
    {
      value: 0,
      label: '未通过'
    }
  ]
}

let content = {

}

export { status as default, results, content }
