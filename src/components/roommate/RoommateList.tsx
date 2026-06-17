"use client";

import { useState, useEffect, useCallback } from "react";
import type { RoommatePost, RoommateFilterParams } from "@/types/roommate-post";
import { getRoommatePosts } from "@/services/roommate.service";
import RoommateCard from "@/components/roommate/RoommateCard";
import RoommateFilter from "@/components/roommate/RoommateFilter";
import EmptyState from "@/components/shared/EmptyState";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function RoommateList() {
  const [posts, setPosts] = useState<RoommatePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts(params?: RoommateFilterParams) {
    try {
      setFiltering(true);
      const data = await getRoommatePosts(params);
      setPosts(data);
    } catch {
      // Error handled silently
    } finally {
      setLoading(false);
      setFiltering(false);
    }
  }

  const handleFilter = useCallback((params: RoommateFilterParams) => {
    loadPosts(params);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-primary" />
        <span className="ml-2 text-sm text-accent-light">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RoommateFilter onFilter={handleFilter} />

      {filtering && (
        <div className="flex items-center justify-center py-4">
          <Loader2 size={20} className="animate-spin text-primary" />
          <span className="ml-2 text-sm text-accent-light">Đang lọc...</span>
        </div>
      )}

      {!filtering && posts.length === 0 ? (
        <EmptyState
          title="Không tìm thấy bài đăng"
          description="Hiện tại chưa có bài đăng nào phù hợp. Thử thay đổi bộ lọc hoặc quay lại sau."
          action={
            <Link
              href="/roommates"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Xoá tất cả bộ lọc
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <RoommateCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-accent-light">
        {!filtering && posts.length > 0 && `Hiển thị ${posts.length} bài đăng`}
      </p>
    </div>
  );
}
