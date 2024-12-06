// apps/nextapp/src/app/blog/page.tsx
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { BookOpen, Pencil, Tags, Bookmark } from 'lucide-react';
import styles from './blog.module.css';

export default function BlogPage() {
  return (
    <div className={styles['blog-container']}>
      <div className={styles['blog-background']} />

      <header className={styles['blog-header']}>
        <div className="container">
          <h2 className="text-2xl font-semibold text-white">Blog Page Header</h2>
        </div>
      </header>

      <main className={styles['blog-main']}>
        <div className="container">
          <Card className={styles['content-card']}>
            <div className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Blog & Articles
                </h1>
                <Button className={styles['new-post-button']}>
                  New Post
                  <Pencil className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className={styles['description']}>
                Explore the latest updates, tutorials, and insights about automation testing and
                development.
              </p>

              <div className={styles['blog-grid']}>
                {[
                  {
                    icon: BookOpen,
                    title: "Getting Started with Automation",
                    tags: "Tutorials, Beginners",
                    content: "Learn the basics of automation testing and how to set up your first test suite.",
                    readTime: "5 min read",
                    date: "2 days ago"
                  },
                  {
                    icon: Bookmark,
                    title: "Best Practices for CI/CD",
                    tags: "DevOps, Advanced",
                    content: "Discover the best practices for setting up continuous integration and deployment pipelines.",
                    readTime: "8 min read",
                    date: "1 week ago"
                  },
                  {
                    icon: BookOpen,
                    title: "Advanced Testing Patterns",
                    tags: "Testing, Expert",
                    content: "Explore advanced patterns and strategies for effective test automation.",
                    readTime: "12 min read",
                    date: "2 weeks ago"
                  }
                ].map((post, index) => (
                  <Card key={index} className={styles['blog-card']}>
                    <CardHeader>
                      <post.icon className="h-8 w-8 text-gray-400 mb-2" />
                      <CardTitle className="text-white">{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-gray-400">
                        <Tags className="h-4 w-4" />
                        {post.tags}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">{post.content}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{post.readTime}</span>
                        <span>{post.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
          
          <div className={styles['blog-stats']}>
            <p>Total Posts: 15</p>
            <p>Last Updated: Today</p>
          </div>
        </div>
      </main>

      <footer className={styles['blog-footer']}>
        <div className="container">
          <div className="flex justify-between text-sm text-gray-400">
            <p>© 2024 The Source Build</p>
            <p>RChursin 💡</p>
          </div>
        </div>
      </footer>
    </div>
  );
}