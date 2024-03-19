import { createContext, useReducer } from "react";

const initialState = {
    chats: [],
    messages: [],
    newChat: null,
    replyTo: null,
    unread: 0,
};

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "SET_CHATS":
                return {
                    ...state,
                    chats: action.payload,
                };
            case "SET_MESSAGES":
                return {
                    ...state,
                    messages: action.payload,
                };
            case "SET_NEW_CHAT":
                return {
                    ...state,
                    newChat: action.payload,
                };
            case "SET_REPLY_TO":
                return {
                    ...state,
                    replyTo: action.payload,
                };
            case "SET_UNREAD":
                return {
                    ...state,
                    unread: action.payload,
                };
            case "ADD_UNREAD":
                return {
                    ...state,
                    unread: state.unread + 1,
                };
            default:
                return state;
        }
    }, initialState);

    return (
        <ChatContext.Provider value={[ state, dispatch ]}>
            {children}
        </ChatContext.Provider>
    );
}