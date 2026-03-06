import { Link } from 'react-router-dom';
import '../css/Blog.css';

export default function Blog() {
  return (
    <main className="blog-main">
      <div className="blog-container">
        <h1 className="blog-title">Blog</h1>
        <p className="blog-description">Malta dil okulları hakkında güncel yazılar ve rehberler.</p>
        <div className="blog-posts">
          <div className="blog-post-card">
            <h2 className="blog-post-title">Malta Dil Okulu Seçimi Rehberi</h2>
            <p className="blog-post-excerpt">Malta'da dil okulu seçerken dikkat edilmesi gerekenler...</p>
            <Link to="/blog/malta-dil-okulu-secimi" className="blog-post-link">Devamını Oku →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
