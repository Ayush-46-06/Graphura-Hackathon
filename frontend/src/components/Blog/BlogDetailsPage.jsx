import React from "react";
import BlogBreadcrumb from "../blog/BlogBreadcrumb";
import BlogSidebar from "../blog/BlogSidebar";
import BlogContent from "../blog/BlogContent";

const BlogDetailsPage = () => {
  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <BlogBreadcrumb />

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <BlogSidebar />
          </aside>

          {/* Content */}
          <main className="lg:col-span-8">
            <BlogContent />
          </main>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
