import { Layout } from '@arco-design/web-react';
import ConversationList from '../../components/workbench/conversation-list';
import './index.less'
const Sider = Layout.Sider;
const Content = Layout.Content;

function Workbench(){

    return (
        <Layout className={'work-bench'}>
            <Sider className={'work-bench_sider'}
                width={200}>
                <ConversationList></ConversationList>
            </Sider>
            <Content className={'work-bench_content'}>Content</Content>
        </Layout>
    )
}

export default Workbench;