import { Space, Input } from '@arco-design/web-react';
import { useState, useEffect, type ReactNode, useCallback } from 'react';
import { List, Avatar, Spin } from '@arco-design/web-react';
import './index.less';

const InputSearch = Input.Search;

type RandomUser = {
  email: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
};

type RandomUserResponse = {
  results: RandomUser[];
};

function ConversationList() {
    const [mockData, setMockData] = useState<RandomUser[]>([]);
    const [scrollLoading, setScrollLoading] = useState<ReactNode>(<Spin loading={true} />);
    const [page, setPage] = useState<number>(1);
    const [loadingMore, setLoadingMore] = useState(false);
    
    const fetchData = useCallback((currentPage: number) => {
        console.log('call fetchData');
        if (loadingMore) return;

        if (currentPage > 10) {
          setScrollLoading('No more data');
          return;
        }

        setLoadingMore(true);
        setScrollLoading(<Spin loading />);
    
        fetch('https://randomuser.me/api/?results=10')
            .then((res) => res.json())
            .then((data: RandomUserResponse) => {
                const results = data.results ?? [];
                setMockData((prev) => prev.concat(...results));
                setPage(page => page + 1);

                setScrollLoading(null);
            })
        .catch((error) => {
            console.error(error);
            setScrollLoading('Load failed, please retry');
        })
        .finally(() => {
            setLoadingMore(false);
        });
  }, [loadingMore]);
  useEffect(() => {
    fetchData(1);
  }, []);

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
            <List
                wrapperClassName={'conversation-list_wrapper-list'}
                className={'conversation-list_list'}
                scrollLoading={scrollLoading}
                onReachBottom={() => {
                    console.log('trigger onReachBottom');
                    fetchData(page + 1)
                }}
                dataSource={mockData}
                render={(item, index) => (
                    <List.Item key={index}>
                        <List.Item.Meta 
                            avatar={
                                <Avatar shape='square'>
                                    <img alt='avatar' src={item.picture.thumbnail} />
                                </Avatar>
                            }
                            title={`${item.name.first} ${item.name.last}`}
                            description={item.email}
                        />
                    </List.Item>
                )}
                />

        </div>
    </div>)
}

export default ConversationList;