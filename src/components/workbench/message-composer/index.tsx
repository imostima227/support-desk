import { Button } from '@arco-design/web-react';
import './index.less';
import useAppStore from '../../../store/store';
import type { Message } from '../../../services/messages';
import { useState } from 'react';

function MessageComposor(){
    const inputValue = useAppStore(s => s.inputValue);
    const sessionId = useAppStore(s => s.selectedSessionId);
    const messagesBySessionId = useAppStore(s => s.messagesBySessionId)
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const setInputValue = useAppStore(s => s.setInputValue);
    const appendMessage = useAppStore(s => s.appendMessage);
    const updateMessageStatus = useAppStore(s => s.updateMessageStatus);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        setIsBtnDisabled(e.target.value === '');
    }
    
    const handleSubmit = async () => {
        if (sessionId == null) return;
        const content = inputValue.trim();
        if (!content) return;
        const currentMessages = messagesBySessionId[sessionId] ?? [];
        const nextId =
          String(
            currentMessages.reduce((max, msg) => {
              const n = Number(msg.id);
              return Number.isNaN(n) ? max : Math.max(max, n);
            }, 0) + 1
          );
        const newMessage: Message = {
          id: nextId,
          senderType: 'customer',
          content,
          createdAt: new Date(),
          status: 'sending',
        };
        setIsBtnDisabled(true);
        await appendMessage(sessionId, newMessage);
        try {
            await new Promise((r) => setTimeout(r, 300));
            console.log('simulate post operation');
            updateMessageStatus(sessionId, newMessage.id, 'sent');
        } catch(error) {
            updateMessageStatus(sessionId, newMessage.id, 'failed');
            console.log(error);
        }
        
        
        setInputValue('');
        
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (inputValue !== '' && e.key === 'Enter' && isBtnDisabled === false) {
            e.preventDefault();
            handleSubmit();
        }
    }

    // useEffect(() => {
    //     const handleEnter = (e: KeyboardEvent) => {
    //         if (inputValue !== '' && e.key === 'Enter') {
    //             handleSubmit();
    //         }
    //     }
        
    //     window.addEventListener('keydown', handleEnter)

    //     return () => {
    //         window.removeEventListener('keydown', handleEnter);
    //     }
    // }, [inputValue, handleSubmit]);

    return (
        <div className="message-composer">
            <textarea
                className='message-composer_input'
                value={inputValue} 
                onChange={handleChange}
                onKeyDown={handleEnter}/>
            <div className='message-composer_footer'>
                <Button type='primary' size='mini' disabled={isBtnDisabled} onClick={handleSubmit}>发送</Button>
            </div>
        </div>
    )
}

export default MessageComposor;