
import { useState, useEffect, useRef, useCallback } from 'react';

interface InfiniteScrollOptions<T> {
  fetchData: (page: number, limit: number) => Promise<{
    data: T[];
    totalItems?: number;
    hasMore?: boolean;
  }>;
  initialPage?: number;
  limit?: number;
  threshold?: number;
}

export function useInfiniteScroll<T>({
  fetchData,
  initialPage = 1,
  limit = 10,
  threshold = 200,
}: InfiniteScrollOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      
      if (observer.current) {
        observer.current.disconnect();
      }
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }, {
        rootMargin: `0px 0px ${threshold}px 0px`,
      });
      
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, threshold]
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchData(page, limit);
      
      setData((prevData) => {
        // If it's page 1, replace the data, otherwise append
        if (page === initialPage) {
          return result.data;
        } else {
          // Filter out duplicates when appending
          const newData = result.data.filter(
            (item: any) => 
              !prevData.some((prevItem: any) => 
                (prevItem._id && item._id && prevItem._id === item._id) ||
                (prevItem.id && item.id && prevItem.id === item.id)
              )
          );
          return [...prevData, ...newData];
        }
      });
      
      if (result.totalItems !== undefined) {
        setTotalItems(result.totalItems);
      }
      
      if (result.hasMore !== undefined) {
        setHasMore(result.hasMore);
      } else if (result.data.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while fetching data'));
    } finally {
      setLoading(false);
    }
  }, [fetchData, page, limit, initialPage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = useCallback(() => {
    setPage(initialPage);
    setData([]);
  }, [initialPage]);

  return {
    data,
    loading,
    error,
    hasMore,
    totalItems,
    lastElementRef,
    refresh,
    page,
  };
}
