import { createContext, useReducer } from "react";

const initialState = {
    chats: [],
    messages: [],
    newChat: null,
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