import { useEffect, useRef, useState } from 'react';
import type { Message } from '../../../services/messages';
// import { messages } from '../../../services/messages';
import './index.less';
import { Empty, Spin } from '@arco-design/web-react';
import { IconRefresh } from '@arco-design/web-react/icon'
import useAppStore from '../../../store/store';


/**
 * QQ/微信风格时间格式化
 * @param timestamp 时间戳 / Date 对象 / 时间字符串
 * @returns 格式化后的时间（今天=时分，昨天=昨天 时分，今年=月-日，跨年=年-月-日）
 */
function formatQQTime(timestamp: number | Date | string): string {
  const date = new Date(timestamp);
  const now = new Date();

  // 时间补零
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  // 今天 0 点
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // 昨天 0 点
  const yesterdayStart = new Date(
    todayStart.getTime() - 24 * 60 * 60 * 1000
  );
  const targetTime = date.getTime();

  // 1. 今天
  if (targetTime >= todayStart.getTime()) {
    return `${hours}:${minutes}`;
  }

  // 2. 昨天
  if (targetTime >= yesterdayStart.getTime()) {
    return `昨天 ${hours}:${minutes}`;
  }

  // 3. 今年（非今天/昨天）
  if (year === now.getFullYear()) {
    return `${month}-${day} ${hours}:${minutes}`;
  }

  // 4. 跨年
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function shouldShowDivider(idx: number, data: Message[]) {
  if (idx === 0) return true;
  if (data[idx].createdAt.getTime() - data[idx - 1].createdAt.getTime() >= 300000) return true;

  return false;
}

function MessageStream() {
    // const [mountTime, setMountTime] = useState<number>(0);

    // useEffect(() => {
    //   const now = Date.now();
    //   setMountTime(now);
    // }, []);
  const EMPTY_MESSAGES: Message[] = [];
  const messagesBySessionId = useAppStore(s => s.messagesBySessionId)
    
  const selectedSessionId = useAppStore((s) => s.selectedSessionId);
  const ensureSessionMessages = useAppStore((s) => s.ensureSessionMessages);
  // const [mockData, setMockData] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const messagesById =
    selectedSessionId == null
    ? EMPTY_MESSAGES
    : (messagesBySessionId[selectedSessionId] ?? EMPTY_MESSAGES)

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (selectedSessionId == null) return;
      setIsLoading(true);
      await ensureSessionMessages(selectedSessionId);
      if (!cancelled) setIsLoading(false);
    }
    void run();
    return () => {
      cancelled = true;
    };
    
  },[selectedSessionId, ensureSessionMessages])

  useEffect(() => {
    if (scrollRef.current) {
      const dom = scrollRef.current;
      dom.scrollTop = dom.scrollHeight;
    }
  }, [selectedSessionId, messagesById.length, isLoading]);

    return (
        <div className='messgae-stream' ref={scrollRef}>
            {isLoading ? 
                <Spin loading={true}/> : 
                (
                    messagesById.length === 0 ? 
                    <Empty /> : 
                    messagesById.map((message, idx) => {
                      return (
                        <div className={'messgae-stream_content'}
                          key={message.id}>
                          {shouldShowDivider(idx, messagesById) && <div className='messgae-stream_divider'>{formatQQTime(message.createdAt)}</div> }
                          <div className={'messgae-stream_wrapper ' + message.senderType}>
                              {(message.senderType === 'customer') && <div className='messgae-stream_sider'>
                              {message.status === 'sending' && <Spin size={12} />}
                              {message.status === 'failed' && <IconRefresh />}
                            </div>}
                              <div  
                                  className={'messgae-stream_item ' + message.senderType}>
                                  {message.content}
                              </div>
                          </div>
                        </div>
                      )
                    })
                )
            }
        </div>
    );
}

export default MessageStream;