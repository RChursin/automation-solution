/* apps/nextapp/src/app/(protected)/blog/page.tsx */

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { BookOpen, Pencil, Tags, Bookmark } from 'lucide-react';
import styles from './blog.module.css';

export default function BlogPage() {
  const posts = [
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
  ];

  return (
    <>
      {/* Add bg-background/95 directly here */}
      <header className={`${styles.blogHeader} bg-background/95`}>
        <div className="container">
          <h2 className={styles.blogTitle}>Blog & Articles</h2>
        </div>
      </header>

      <section className={styles.blogSection}>
        <div className="container">
          {/* Add bg-background/60 to contentCard here */}
          <Card className={`${styles.contentCard} bg-background/60`}>
            <div className={styles.cardInner}>
              <div className={styles.headerRow}>
                <h1 className={styles.heroTitle}>Explore the Latest</h1>
                {/* Add hover:bg-gray-300 directly in JSX for newPostButton */}
                <Button className={`${styles.newPostButton} hover:bg-gray-300`}>
                  New Post
                  <Pencil className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className={styles.description}>
                Explore the latest updates, tutorials, and insights about automation testing and development.
              </p>

              <div className={styles.blogGrid}>
                {posts.map((post, index) => (
                  /* Add bg-background/60 and hover:bg-background/70 here for blogCard */
                  <Card
                    key={index}
                    className={`${styles.blogCard} bg-background/60 hover:bg-background/70`}
                  >
                    <CardHeader>
                      <post.icon className="h-8 w-8 text-gray-400 mb-2" />
                      <CardTitle className="text-foreground">{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-muted-foreground">
                        <Tags className="h-4 w-4" />
                        {post.tags}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{post.content}</p>
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

          <div className={styles.blogStats}>
            <p>Total Posts: 15</p>
            <p>Last Updated: Today</p>
          </div>
        </div>
      </section>

      <footer className={styles.blogFooter}>
        <div className="container">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>© 2024 The Source Build</p>
            <p>RChursin 💡</p>
          </div>
        </div>
      </footer>
    </>
  );
}
