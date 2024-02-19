import Image from "next/image";
import styles from "./Post.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Post({ previewImage, post, option }) {
  const router = useRouter();
  const heading =
    option == "useditem"
      ? "My free used item"
      : option == "skill"
      ? "My skill or service"
      : option == "market"
      ? "My Market"
      : "My Trade";

  const things =
    option == "useditem"
      ? post.usedItem
      : option == "skill"
      ? post.skill
      : option == "market"
      ? post.market
      : post.myTrade;

  const aboutThings =
    option == "useditem"
      ? post.aboutItem
      : option == "skill"
      ? post.aboutSkill
      : option == "market"
      ? post.aboutMarket
      : post.myNeed;

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this post!")) {
      const res = await fetch(`/api/posts/${option}/${id}`, {
        method: "DELETE",
      });
      console.log(res.status);
      if (res.status == 200) {
        router.refresh();
      }
    }
  };

  return (
    <div className={styles.posts}>
      <div className={styles.postProfile}>
        <div className={styles.addDelete}>
          <div>
            <Image
              src={previewImage || post.user.image}
              width={50}
              height={50}
              className={styles.postProfileImg}
            />
            {post.user.name}
          </div>
          <span
            className={styles.deleteButton}
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </span>
          {/* <FaDeleteLeft onClick={() => handleDelete(post.id)} /> */}
        </div>
        <div className={styles.trade}>
          {heading}: {things}
          {option == "skill" && <div>Location: {post.location} </div>}
        </div>
      </div>
      <div className={styles.tradeImgContainer}>
        <Image src={post.image} alt="" fill className={styles.tradeImg} />
      </div>
      <div className={styles.needs}>
        {option == "" || option == "myneed" ? (
          <span>MY NEEDS </span>
        ) : (
          <span className={styles.about}>about {option} </span>
        )}
        <div>{aboutThings}</div>
      </div>
    </div>
  );
}
