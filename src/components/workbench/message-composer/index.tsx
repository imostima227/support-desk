import { Button } from '@arco-design/web-react';
import './index.less';
import { useState } from 'react';

function MessageComposor(){
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }

    return (
        <div className="message-composer">
            <textarea
                className='message-composer_input'
                value={inputValue} 
                onChange={handleChange}/>
            <div className='message-composer_footer'>
                <Button type='primary' size='mini' disabled={inputValue === ''}>发送</Button>
            </div>
        </div>
    )
}

export default MessageComposor;