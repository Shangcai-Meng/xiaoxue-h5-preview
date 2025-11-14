import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app.js'

// 简单 i18n 配置，仅覆盖当前项目需要的文案
const messages = {
  'zh-CN': {
    index: {
      notice: {
        message: '小冬瓜刚刚注册了会员并获得新人大礼包'
      },
      section: {
        trendingTokens: '趋势代币'
      }
    },
    team: {
      stats: {
        teamAccounts: '团队账户',
        directAccounts: '直推账户',
        teamPerformance: '团队业绩',
        directPerformance: '直推业绩'
      },
      cards: {
        totalEarnings: '累计收益',
        pendingEarnings: '待领取收益',
        details: '明细',
        receive: '领取'
      },
      level: {
        currentLevel: '当前等级',
        claimableUpgradeReward: '可领取升级奖励',
        missedUpgradeReward: '已损失升级奖励',
        tip1: '直推满2人升级后享受收益人数增加到2人',
        tip2: '直推满15人后，可享受领导人团队奖励'
      },
      invite: {
        label: '邀请链接：'
      },
      table: {
        walletAddress: '钱包地址',
        joinTime: '加入时间',
        contribution: '贡献值(USDT)',
        empty: '暂无更多内容'
      }
    },
    options: {
      navbar: {
        title: '期权合约'
      },
      pair: {
        rise: '上涨',
        fall: '下跌'
      },
      time: {
        unit: '时间单位'
      },
      timePeriods: {
        '1m': '1分',
        '5m': '5分',
        '10m': '10m',
        '15m': '15分',
        '30m': '30分',
        '1h': '1小时',
        '4h': '4小时',
        day: '日线',
        indexPrice: '指数/价格'
      },
      periods: {
        '10m': '10分钟',
        '30m': '30分钟',
        '1h': '1小时',
        '1d': '1天'
      },
      labels: {
        quantity: '数量（USDT）',
        openPrice: '开仓价',
        openTime: '开仓时间',
        bonusRate: '奖金支持率'
      },
      orderTabs: {
        open: '已开仓(0)',
        closed: '已平仓(20+)'
      },
      actions: {
        rise: '上涨',
        fall: '下跌'
      }
    },
    mine: {
      asset: {
        title: '我的资产',
        usdtBalance: 'USDT余额',
        finBalance: 'FIN余额'
      },
      actions: {
        deposit: '充值',
        withdraw: '提现'
      },
      income: {
        today: '今日收益',
        yesterday: '昨日收益'
      },
      records: {
        order: '投单记录',
        transaction: '收支流水'
      },
      quick: {
        downloadApp: '下载MAYPAY APP',
        completeKyc: '完成KYC',
        withdrawAnytime: '随时随地提取现金'
      },
      features: {
        globalAccess: {
          title: '全球通行',
          desc: '随时随地提取现金'
        },
        multiConfig: {
          title: '多元配置',
          desc: '用于资产到账后资产方案车辆配置'
        },
        vipPrivilege: {
          title: '尊贵特权',
          desc: '注册即送 24 小时专属客服服务'
        },
        legalCompany: {
          title: '正规公司',
          desc: '注册于香港进法律法规'
        }
      },
      promo: {
        title: 'VIRTU108-万事达U卡',
        subtitle: '108万游戏计划全球通行，支持微信、支付宝、银联等多渠道结算，ATM取现，银行转账',
        detail: '108市商计划-万事达U卡办理专属链接',
        copy: '复制',
        note: '注：金牌链接即可下载 下载后请尽快完成申请'
      }
    },
    news: {
      list: {
        navbarTitle: '新闻列表',
        item1: {
          title: '区块链是一种去中心化的分布式账本技术，具有不可篡改'
        },
        item2: {
          title: '区块链在金融、供应链、医疗不动产等领域得到广泛应用'
        },
        item3: {
          title: '尽管仍面临扩展性和法规挑战，但它已经成为改变传统'
        },
        item4: {
          title: '区块链的特点包括去中心化、不可篡改、透明、安全'
        },
        item5: {
          title: '每个数据块都链接到前一个块形成连续的链，保障了交...'
        }
      },
      detail: {
        navbarTitle: '详情'
      }
    },
    transaction: {
      navbar: {
        title: '收支流水'
      },
      tabs: {
        all: '全部',
        income: '收入',
        expense: '支出'
      },
      items: {
        orderIncome: '买单收益',
        btcExpense: 'BTC流水支出'
      }
    },
    common: {
      copy: '复制',
      copySuccess: '复制成功'
    }
  },
  'en-US': {
    index: {
      notice: {
        message: 'Xiaodonggua has just registered as a member and received a newbie gift package.'
      },
      section: {
        trendingTokens: 'Trending Tokens'
      }
    },
    team: {
      stats: {
        teamAccounts: 'Team accounts',
        directAccounts: 'Direct referrals',
        teamPerformance: 'Team performance',
        directPerformance: 'Direct performance'
      },
      cards: {
        totalEarnings: 'Total earnings',
        pendingEarnings: 'Pending earnings',
        details: 'Details',
        receive: 'Claim'
      },
      level: {
        currentLevel: 'Current level',
        claimableUpgradeReward: 'Claimable upgrade rewards',
        missedUpgradeReward: 'Missed upgrade rewards',
        tip1: 'After 2 direct referrals upgrade, the number of people you earn from increases to 2.',
        tip2: 'After 15 direct referrals, you can enjoy team leader rewards.'
      },
      invite: {
        label: 'Invite link:'
      },
      table: {
        walletAddress: 'Wallet address',
        joinTime: 'Join time',
        contribution: 'Contribution (USDT)',
        empty: 'No more content'
      }
    },
    options: {
      navbar: {
        title: 'Options Contract'
      },
      pair: {
        rise: 'Rise',
        fall: 'Fall'
      },
      time: {
        unit: 'Time unit'
      },
      timePeriods: {
        '1m': '1m',
        '5m': '5m',
        '10m': '10m',
        '15m': '15m',
        '30m': '30m',
        '1h': '1h',
        '4h': '4h',
        day: '1D',
        indexPrice: 'Index/Price'
      },
      periods: {
        '10m': '10 min',
        '30m': '30 min',
        '1h': '1 hour',
        '1d': '1 day'
      },
      labels: {
        quantity: 'Amount (USDT)',
        openPrice: 'Open price',
        openTime: 'Open time',
        bonusRate: 'Bonus rate'
      },
      orderTabs: {
        open: 'Open orders (0)',
        closed: 'Closed orders (20+)'
      },
      actions: {
        rise: 'Rise',
        fall: 'Fall'
      }
    },
    mine: {
      asset: {
        title: 'My Assets',
        usdtBalance: 'USDT Balance',
        finBalance: 'FIN Balance'
      },
      actions: {
        deposit: 'Deposit',
        withdraw: 'Withdraw'
      },
      income: {
        today: "Today's Earnings",
        yesterday: "Yesterday's Earnings"
      },
      records: {
        order: 'Order Records',
        transaction: 'Transaction History'
      },
      quick: {
        downloadApp: 'Download MAYPAY App',
        completeKyc: 'Complete KYC',
        withdrawAnytime: 'Withdraw cash anytime'
      },
      features: {
        globalAccess: {
          title: 'Global Access',
          desc: 'Withdraw cash anytime.'
        },
        multiConfig: {
          title: 'Diversified Allocation',
          desc: 'Configure asset plans after funds are credited.'
        },
        vipPrivilege: {
          title: 'VIP Privileges',
          desc: 'Enjoy 24/7 dedicated customer service after registration.'
        },
        legalCompany: {
          title: 'Regulated Company',
          desc: 'Registered in Hong Kong and compliant with local regulations.'
        }
      },
      promo: {
        title: 'VIRTU108 - Mastercard U Card',
        subtitle: 'The 1.08M game plan with global access, supporting WeChat, Alipay, UnionPay and more, ATM withdrawal and bank transfer.',
        detail: 'Exclusive link to apply for the 108 Market Maker Plan - Mastercard U Card',
        copy: 'Copy',
        note: 'Note: Download via the golden link and complete your application as soon as possible.'
      }
    },
    news: {
      list: {
        navbarTitle: 'News List',
        item1: {
          title: 'Blockchain is a decentralized distributed ledger technology with tamper-resistance.'
        },
        item2: {
          title: 'Blockchain has been widely used in finance, supply chain, healthcare and real estate.'
        },
        item3: {
          title: 'Although there are scalability and regulatory challenges, it has already transformed traditional models.'
        },
        item4: {
          title: 'Key features of blockchain include decentralization, immutability, transparency and security.'
        },
        item5: {
          title: 'Each data block links to the previous one to form a continuous chain, ensuring transaction integrity...'
        }
      },
      detail: {
        navbarTitle: 'Detail'
      }
    },
    transaction: {
      navbar: {
        title: 'Transaction History'
      },
      tabs: {
        all: 'All',
        income: 'Income',
        expense: 'Expense'
      },
      items: {
        orderIncome: 'Order profit',
        btcExpense: 'BTC expense'
      }
    },
    common: {
      copy: 'Copy',
      copySuccess: 'Copied'
    }
  }
}

const normalizeLang = (lang) => {
  if (!lang) return 'zh-CN'
  if (lang.startsWith('zh')) return 'zh-CN'
  if (lang.startsWith('en')) return 'en-US'
  return 'zh-CN'
}

export function useI18n() {
  const app = useAppStore()

  const currentLang = computed(() => normalizeLang(app.language))

  const localeMessages = computed(() => {
    return messages[currentLang.value] || messages['zh-CN']
  })

  const t = (key) => {
    if (!key) return ''
    const segments = key.split('.')
    let value = localeMessages.value
    for (const seg of segments) {
      if (value && Object.prototype.hasOwnProperty.call(value, seg)) {
        value = value[seg]
      } else {
        value = null
        break
      }
    }
    return value != null ? value : key
  }

  return {
    t,
    currentLang
  }
}
