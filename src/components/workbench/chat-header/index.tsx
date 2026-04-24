import { Button } from '@arco-design/web-react';
import './index.less';
import { Power } from '@icon-park/react';


function ChatHeader() {
    return (
        <div className="chat-header">
            <div className='chat-header_left'>
                <div className='chat-header_left-name'>name</div>
                <div className='chat-header_left-uid'>uid</div>
            </div>
            <div className='chat-header_middle'>status</div>
            <div className='chat-header_right'>
                <Button type='text'>Text</Button>
                <Button type='primary' icon={<Power theme="outline" size="14" fill="#fff" style={{ paddingRight: 2}}/>}>
        Delete
      </Button>
            </div>
        </div>
    )
}

export default ChatHeader;