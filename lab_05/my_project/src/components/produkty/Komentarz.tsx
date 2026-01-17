import likeImg from "../../assets/like.png";
import dislikeImg from "../../assets/dislike.png";
interface User {
  id: number;
  username: string;
  fullName: string;
}
interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
  addLike: () => void;
  subtrLike: () => void;
}

function Komentarz({ body, likes, user, addLike, subtrLike }: KomentarzProps) {
  return (
    <div style={{ width: "600px", paddingLeft: "20px", paddingRight: "20px" }}>
      <div
        style={{
          textAlign: "left",
          margin: "20px",
          border: "1px solid black",
          backgroundColor: "lightgrey",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        User: {user.username}
      </div>
      <div style={{ textAlign: "left", margin: "20px" }}>{body}</div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          border: "1px solid black",
          justifyContent: "center",
          backgroundColor: "lightcyan",
          margin: "20px",
          borderRadius: "5px",
        }}
      >
        <div>Likes: {likes}</div>
        <img
          onClick={addLike}
          id="likeImg"
          src={likeImg}
          style={{ cursor: "pointer", width: "20px" }}
        />
        <img
          onClick={subtrLike}
          id="disLikeImg"
          src={dislikeImg}
          style={{ cursor: "pointer", width: "20px" }}
        />
      </div>
    </div>
  );
}
export default Komentarz;
