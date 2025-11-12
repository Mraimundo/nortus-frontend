import { Suspense } from 'react';
import { LoadingSpinner } from '@/src/shared/components/LoadingSpinner';
import { ChatSection } from '@/src/modules/chat-assistant/components/ChatSection';

export default async function ChatAssistantPage() {
  return (
    <div className="px-4">
      <Suspense fallback={<LoadingSpinner />}>
        <ChatSection />
      </Suspense>
    </div>
  );
}
