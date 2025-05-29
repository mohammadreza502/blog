
export interface Post {
  id: string;
  title: string;
  date: string; // ISO date string
  imageUrl: string;
  excerpt: string; // Short summary for the card
  content: string; // Main content of the post (can be plain text or basic HTML)
}
