import { Space, Input, Empty } from '@arco-design/web-react';
import { useState, useEffect, useCallback } from 'react';
import { List, Spin } from '@arco-design/web-react';
import { Avatar } from '@icon-park/react';
import './index.less';

const InputSearch = Input.Search;

// type RandomUser = {
//   email: string;
//   name: {
//     first: string;
//     last: string;
//   };
//   picture: {
//     thumbnail: string;
//   };
// };

// type RandomUserResponse = {
//   results: RandomUser[];
// };

type User = {
  id: number;
  name: string;
  lastMessage: string;
};

const data: User[] = [
  { id: 89445, name: "小明", lastMessage: "晚上吃什么？" },
  { id: 71095, name: "小红", lastMessage: "明天记得带伞" },
  { id: 72707, name: "小李", lastMessage: "这个方案我看一下" },
  { id: 30729, name: "小张", lastMessage: "好的，收到了" },
  { id: 73805, name: "小王", lastMessage: "周末一起打球吗" },
  { id: 25029, name: "小陈", lastMessage: "文件我发你了" },
  { id: 40859, name: "小刘", lastMessage: "下班一起走吗" },
  { id: 43838, name: "小赵", lastMessage: "这个问题怎么解决" },
  { id: 45285, name: "小林", lastMessage: "明天开会准时参加" },
  { id: 11398, name: "小华", lastMessage: "谢谢啦，辛苦你了" },
  { id: 66777, name: "小杰", lastMessage: "我马上就到" },
  { id: 60771, name: "小雨", lastMessage: "这个功能挺好用的" },
  { id: 43225, name: "小雪", lastMessage: "记得按时吃饭哦" },
  { id: 53675, name: "小峰", lastMessage: "资料我整理好了" },
  { id: 16503, name: "小冉", lastMessage: "你现在方便吗" },
  { id: 54194, name: "小琪", lastMessage: "我们改天再约吧" },
  { id: 31861, name: "小浩", lastMessage: "这个我不太清楚" },
  { id: 48915, name: "小雯", lastMessage: "收到，我处理一下" },
  { id: 94188, name: "小宇", lastMessage: "今天天气真不错" },
  { id: 63277, name: "小琳", lastMessage: "麻烦你帮我个忙" },
];

function ConversationList() {
    const [mockData, setMockData] = useState<User[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [scrollLoading, setScrollLoading] = useState<ReactNode>(<Spin loading={true} />);
    // const [page, setPage] = useState<number>(1);
    // const [loadingMore, setLoadingMore] = useState(false);
    const fetchData = useCallback(() => {
        setIsLoading(true);

        setTimeout(() => {
            setMockData(data);
            setIsLoading(false);
        }, 1000);

    },[]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (<div className='conversation-list'>
        <div className='conversation-list_header'>
            <Space wrap>
                <InputSearch 
                    allowClear
                    placeholder='Enter keyword to search'
                    searchButton/>
            </Space>
        </div>
        <div className='conversation-list_content'>
            {isLoading ? 
                <Spin loading={true}/> : 
                (
                    mockData.length === 0 ? 
                    <Empty /> :
                <List
                wrapperClassName={'conversation-list_wrapper-list'}
                className={'conversation-list_list'}
                scrollLoading={isLoading ? <Spin loading={true}/> : '已经到底了~'}
                // onReachBottom={() => {
                //     console.log('trigger onReachBottom');
                //     fetchData(page + 1)
                // }}
                dataSource={mockData}
                render={(item) => (
                    <List.Item 
                        key={item.id}
                        data-id={item.id}
                        className={selectedId === item.id ?
                            'conversation-list_list-item is-active' :
                            'conversation-list_list-item'
                        }
                        onClick={() => setSelectedId(item.id)} >
                        <List.Item.Meta 
                            avatar={
                                <Avatar theme="outline" size="24" fill="#333"/>
                            }
                            title={item.name}
                            description={item.lastMessage}
                        />
                    </List.Item>
                )}
                />
            )
            }

        </div>
    </div>)
}

export default ConversationList;