"use client";

import EditPostPage from "../[id]/page";

export default function NewPostPage() {
  // Use a mock promise as params to trigger the 'new' state in the shared component
  const mockParams = Promise.resolve({ id: 'new' });
  return <EditPostPage params={mockParams} />;
}
