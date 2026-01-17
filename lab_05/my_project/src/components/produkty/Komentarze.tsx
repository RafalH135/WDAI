import { useEffect, useState } from "react";
import Komentarz from "./Komentarz";

interface User {
  id: number;
  username: string;
  fullName: string;
}

 interface KomentarzType {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

function Komentarze() {
  const [komentarze, setKomentarze] = useState<KomentarzType[]>([]);

  useEffect(() => {
    async function fetchKomentarze() {
      const res = await fetch("https://dummyjson.com/comments");
      const data = await res.json();
      setKomentarze(data.comments.slice(0, 20));
    }

    fetchKomentarze();
  }, []);

  const addLike = (id: number) => {
    setKomentarze((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const subtrLike = (id: number) => {
    setKomentarze((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes - 1 } : item
      )
    );
  };

  return (
    <div>
      {komentarze.map((komentarz) => (
        <Komentarz
          key={komentarz.id}
          id={komentarz.id}
          body={komentarz.body}
          postId={komentarz.postId}
          likes={komentarz.likes}
          user={komentarz.user}
          addLike={() => addLike(komentarz.id)}
          subtrLike={() => subtrLike(komentarz.id)}
        />
      ))}
    </div>
  );
}

export default Komentarze;
