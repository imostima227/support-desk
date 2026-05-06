import { Space, Input, Empty } from '@arco-design/web-react';
import { useState, useEffect, useCallback } from 'react';
import { List, Spin } from '@arco-design/web-react';
import { Avatar } from '@icon-park/react';
import type { Agent } from '../../../services/conversations';
import { sessions } from '../../../services/conversations';
import './index.less';
import useAppStore from '../../../store/store';

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


function ConversationList() {
    const [mockData, setMockData] = useState<Agent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const selectedSessionId = useAppStore(s => s.selectedSessionId);
    const selectSession = useAppStore(s => s.selectSession);
    // const [scrollLoading, setScrollLoading] = useState<ReactNode>(<Spin loading={true} />);
    // const [page, setPage] = useState<number>(1);
    // const [loadingMore, setLoadingMore] = useState(false);
    const fetchData = useCallback(() => {
        setIsLoading(true);

        setTimeout(() => {
            setMockData(sessions);
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
                        className={selectedSessionId === item.id ?
                            'conversation-list_list-item is-active' :
                            'conversation-list_list-item'
                        }
                        onClick={() => selectSession(item.id)} >
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