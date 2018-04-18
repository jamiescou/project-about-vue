let file = {
  // 融资材料 (表格显示使用)
  financeFile: {
    CONTRACT: '贸易合同',
    INVOICE: '发票',
    USE_EVIDENCE: '贷款用途证明'
  },
  // 融资材料 (checkboox使用)
  financeFiles: [
    {
      value: 'CONTRACT',
      label: '贸易合同'
    },
    {
      value: 'INVOICE',
      label: '发票'
    },
    {
      value: 'USE_EVIDENCE',
      label: '贷款用途证明'
    }
  ]
}

export { file as default }
