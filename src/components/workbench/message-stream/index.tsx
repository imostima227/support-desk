import './index.less';

interface Message {
    id: string;
    senderType: 'customer' | 'agent' |'system';
    content: string;
    createdAt: Date;
    status: 'sending' | 'sent' | 'failed';
}

const data: Message[] = [
  {
    id: '1',
    senderType: 'system',
    content: '没有聊天记录了',
    createdAt: new Date('2025-01-01 09:00:00'),
    status: 'sent'
  },
  {
    id: '2',
    senderType: 'system',
    content: '-------- 上次聊到这里 --------',
    createdAt: new Date('2025-01-01 09:00:10'),
    status: 'sent'
  },
  {
    id: '3',
    senderType: 'agent',
    content: '欢迎光临漫步者电竞HECATE京东自营旗舰店！',
    createdAt: new Date('2025-01-01 09:00:30'),
    status: 'sent'
  },
  {
    id: '4',
    senderType: 'customer',
    content: '你好呀',
    createdAt: new Date('2025-01-01 09:01:00'),
    status: 'sent'
  },
  {
    id: '5',
    senderType: 'customer',
    content: '请问这个产品能够支持type-c充电吗？',
    createdAt: new Date('2025-01-01 09:01:20'),
    status: 'sent'
  },
  {
    id: '6',
    senderType: 'agent',
    content: '您好，这款耳机是支持Type-C接口充电的哦',
    createdAt: new Date('2025-01-01 09:01:50'),
    status: 'sent'
  },
  {
    id: '7',
    senderType: 'customer',
    content: '充满一次电能用多久呢？',
    createdAt: new Date('2025-01-01 09:02:10'),
    status: 'sent'
  },
  {
    id: '8',
    senderType: 'agent',
    content: '单次续航可以达到8小时，搭配充电仓总续航32小时',
    createdAt: new Date('2025-01-01 09:02:40'),
    status: 'sent'
  },
  {
    id: '9',
    senderType: 'customer',
    content: '音质怎么样？打游戏延迟高吗？',
    createdAt: new Date('2025-01-01 09:03:10'),
    status: 'sent'
  },
  {
    id: '10',
    senderType: 'agent',
    content: '采用电竞级芯片，低延迟模式下延迟低至45ms，听音辨位非常精准',
    createdAt: new Date('2025-01-01 09:03:50'),
    status: 'sent'
  },
  {
    id: '11',
    senderType: 'customer',
    content: '我看有好几个版本，G1、G2、G3有什么区别？',
    createdAt: new Date('2025-01-01 09:04:30'),
    status: 'sent'
  },
  {
    id: '12',
    senderType: 'agent',
    content: '非常抱歉我可能解决不了您的这个问题，您可以点击以下按钮，为您转接至人工客服，感谢您的支持。',
    createdAt: new Date('2025-01-01 09:05:10'),
    status: 'sent'
  },
  {
    id: '13',
    senderType: 'agent',
    content: '（button）联系人工服务',
    createdAt: new Date('2025-01-01 09:05:20'),
    status: 'sent'
  },
  {
    id: '14',
    senderType: 'customer',
    content: '好的，那帮我转接人工吧',
    createdAt: new Date('2025-01-01 09:06:00'),
    status: 'sent'
  },
  {
    id: '15',
    senderType: 'system',
    content: '正在为您转接人工客服，请稍候...',
    createdAt: new Date('2025-01-01 09:06:10'),
    status: 'sent'
  },
  {
    id: '16',
    senderType: 'agent',
    content: '您好，人工客服为您服务，请问有什么可以帮您？',
    createdAt: new Date('2025-01-01 09:07:00'),
    status: 'sent'
  },
  {
    id: '17',
    senderType: 'customer',
    content: '我想了解下三个版本的具体配置差异和价格区别',
    createdAt: new Date('2025-01-01 09:07:40'),
    status: 'sent'
  },
  {
    id: '18',
    senderType: 'agent',
    content: '好的，我给您详细介绍一下三款产品的区别~',
    createdAt: new Date('2025-01-01 09:08:10'),
    status: 'sent'
  },
  {
    id: '19',
    senderType: 'customer',
    content: '谢谢，了解清楚了，我考虑一下再下单',
    createdAt: new Date('2025-01-01 09:10:00'),
    status: 'sent'
  },
  {
    id: '20',
    senderType: 'system',
    content: '人工服务对话已结束，请评价客服',
    createdAt: new Date('2025-01-01 09:15:00'),
    status: 'sent'
  }
];

function MessageStream() {
    return (
        <div className='messgae-stream'>
            { data.map(message => {
                return (
                    <div className='messgae-stream_wrapper' 
                        id={message.id}>
                        <div  
                            className={'messgae-stream_item ' + message.senderType}>
                            {message.content}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default MessageStream;