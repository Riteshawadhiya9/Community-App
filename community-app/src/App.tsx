import { CommunityProvider } from './context/CommunityContext';
import { ChatProvider } from './context/ChatContext';
import MainLayout from './components/layout/MainLayout';
import ChatArea from './components/chat/ChatArea';

export default function App() {
  return (
    <CommunityProvider>
      <ChatProvider>
        <MainLayout chatArea={<ChatArea />} />
      </ChatProvider>
    </CommunityProvider>
  );
}
