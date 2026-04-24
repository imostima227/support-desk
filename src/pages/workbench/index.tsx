import { Layout } from '@arco-design/web-react';
import ConversationList from '../../components/workbench/conversation-list';
import './index.less'
import ChatHeader from '../../components/workbench/chat-header';
import MessageComposor from '../../components/workbench/message-composer';
import MessageStream from '../../components/workbench/message-stream';
const Sider = Layout.Sider;
const Content = Layout.Content;

function Workbench(){

    return (
        <Layout className={'work-bench'}>
            <Sider className={'work-bench_sider'}
                width={250}>
                <ConversationList></ConversationList>
            </Sider>
            <Content className={'work-bench_content'}>
                <ChatHeader />
                <MessageStream />
                <MessageComposor/>
            </Content>
        </Layout>
    )
}

export default Workbench;