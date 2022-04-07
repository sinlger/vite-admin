const {
  wrapApiData
} = require(`../util.js`)

/** @type {import('mockm/@types/config').Config} */
module.exports = util => {
  const {
    libObj: {
      mockjs
    },
  } = util
  return {
    api: {
      // 创建接口并使用 mockjs 生成数据
      'get /api/test': wrapApiData(mockjs.mock({
        'data|3-7': [{
          userId: `@id`,
          userName: `@cname`,
        }],
      })),
      //创建登陆接口
      'get /api/login': (req, res) => {
        let user = ''
        if (req.query.username != 'admin') {
          user = 'vip'
        } else {
          user = 'admin'
        }
        res.json({
          token: user
        })
      },
      //创建动态路由表
      "get /api/permission": (req, res) => {
        let router = [{
            url: '/dashboard', // 模块路径&访问路由
            name: '/dashboard',
            title: '数据门户',
            icon: 'icon-index-copy',
          },
          {
            url: '/dataManage',
            name: '/dataManage',
            title: '数据管理',
            icon: 'icon-shuju',
          },
          {
            url: '/userManage',
            name: '/userManage',
            title: '用户管理',
            icon: 'icon-yonghuguanli',
          },
        ]
        res.json({
          menuList: router,
          permissions: [],
        })
      }
    },
  }
}