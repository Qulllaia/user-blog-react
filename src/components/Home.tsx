import "../css/Home.css";
import { Panel } from "./Panel";
import { Post } from "./Post";

export const Home = () => {
  return (
    <div>
      <div className="nav-bar">User blog</div>
      <div className="background">
        <div className="post-content">
          {[...Array(10)].map((_: any, index: any) => (
            <Post key={index}></Post>
          ))}
        </div>
        <Panel></Panel>
      </div>
    </div>
  );
};
