import  { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Home.css';
import Card from 'react-bootstrap/Card';
type Post = {
    hasan_post_id: number;
    post_name: string;
    post_description: string;
    comments_count: number;
    likes_count: number;
    email: {
      email: string;
    };
  };


const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // POST isteği yapılırken, ikinci parametre olarak gönderilen data JSON formatında olmalıdır.
        const response = await axios.get('https://api-prod.fiko.no/v1/has/posts',{
            params: {
              email_id: 1 // Query parametresi olarak gönderilir.
            }});
        setPosts(response.data.data); // API'nin döndürdüğü yapının response.data.data olduğunu varsayıyorum
      } catch (error) {
        console.error('İstek sırasında bir hata oluştu:', error);
        // Hata mesajını daha detaylı loglamak için
        
      }
    };

    fetchData();
  }, []);
  // Posts array'ini ekranda map'leyerek göster
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.hasan_post_id} style={{ width: '18rem', marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>{post.post_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Comments: {post.comments_count} Likes: {post.likes_count}
            </Card.Subtitle>
            <Card.Text>{post.post_description}</Card.Text>
            {/* Daha fazla detay veya interaktif elemanlar eklenebilir. */}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Home;
