// eslint-disable-next-line @typescript-eslint/no-var-requires
const Mock = require('mockjs')
// const Random = Mock.Random
const data = Mock.mock({
  'list|1-10': [
    {
      'id|+1': 1,
      name: '@cname',
      'gender|1': ['0', '1'],
      logo: "@Image('100x40', '@color', '@hex', '@cname')",
      address: '@county(true)',
      createDate: '@datetime',
      // content: '@cparagraph',
    },
  ],
})
module.exports = {
  code: 0,
  data: data,
  msg: '成功',
}
