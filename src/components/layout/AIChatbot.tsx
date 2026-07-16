import { ChatbotProvider } from '@/context/ChatbotContext';
import ChatWindow from '@/components/chatbot/ChatWindow';
import ChatLauncher from '@/components/chatbot/ChatLauncher';

export default function AIChatbot() {
  return (
    <ChatbotProvider>
      <ChatWindow />
      <ChatLauncher />
    </ChatbotProvider>
  );
}
