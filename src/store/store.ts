import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getMessagesFromService, type Message, type MessageStatus } from "../services/messages";

interface StoreState {
    selectedSessionId: number | null;
    inputValue: string;
    messagesBySessionId: Record<number, Message[]>;
}

interface StoreActions {
    selectSession: (id: number) => void;
    setInputValue: (value: string) => void;
    appendMessage: (sessionId: number, message: Message) => Promise<void>;
    ensureSessionMessages: (sessionId: number | null) => Promise<void>;
    updateMessageStatus: (sessionId: number, messageId: string, newStatus: MessageStatus) => void;
}

const useAppStore = create<StoreState & StoreActions>()(immer((set, get) => ({
    // state
    selectedSessionId: null,
    inputValue: '',
    messagesBySessionId: {},
    // actions
    selectSession: (id) => set((state) => {
        state.selectedSessionId = id;
    }),
    setInputValue: (value) => set((state) => {
        state.inputValue = value;
    }),
    appendMessage: async (sessionId, message) => {
        set((state) => {
            const messages = state.messagesBySessionId[sessionId] ?? [];
            messages.push(message);
            state.messagesBySessionId[sessionId] = messages;
        });
    },
    updateMessageStatus: (sessionId, messageId, newStatus) => set((state) => {
        const messages = state.messagesBySessionId[sessionId];
        if(! messages) return;

        const targetMessage = messages.find((msg) => msg.id === messageId);
        if (!targetMessage) return; 

        targetMessage.status = newStatus;
    }),
    ensureSessionMessages: async (sessionId: number | null) => {
        if (sessionId === null) return;
        const cached = get().messagesBySessionId[sessionId];
        if (cached) return; // 有缓存就不重复拿

        const list = await getMessagesFromService(sessionId);
        set((state) => {
            state.messagesBySessionId[sessionId] = list;
        });
    }
})))

export default useAppStore;