import { useRef, useCallback, useEffect } from "react";

interface UseInfiniteScrollOptions {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  rootMargin = "0px 0px 200px 0px",
}: UseInfiniteScrollOptions) {
  // Observer for the last element
  const observer = useRef<IntersectionObserver | null>(null);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Create ref callback for the last element
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      // Skip if loading or no more pages
      if (loading || !hasMore) return;

      // Disconnect previous observer
      if (observer.current) observer.current.disconnect();

      // Create new observer to watch the last element
      observer.current = new IntersectionObserver(
        (entries) => {
          // If the last element is visible and we have more pages
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        },
        { rootMargin }
      );

      // Observe the last element
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore, rootMargin]
  );

  return { lastElementRef };
}
