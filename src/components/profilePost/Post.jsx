import Image from "next/image";
import styles from "./Post.module.css";
import { useRouter } from "next/navigation";
import { getAllOtherPosts, getPosts } from "../../requests/requests";

export default function Post({ previewImage, post, option, slug }) {
  const { postMutate } = getPosts();
  const { otherPostMutate } = getAllOtherPosts(slug);
  const router = useRouter();
  const heading =
    option == "useditem"
      ? "My free used item"
      : option == "skill"
      ? "My skill or service"
      : option == "market"
      ? "My Market"
      : option == "rent"
      ? "Rent Item"
      : option == "giveaway"
      ? "Giveaway"
      : option == "news"
      ? "News"
      : "My Trade";

  const things =
    option == "useditem"
      ? post.usedItem
      : option == "skill"
      ? post.skill
      : option == "market"
      ? post.market
      : option == "rent"
      ? post.rentItem
      : option == "giveaway"
      ? post.giveawayItem
      : post.myTrade;

  const aboutThings =
    option == "useditem"
      ? post.aboutItem
      : option == "skill"
      ? post.aboutSkill
      : option == "market"
      ? post.aboutMarket
      : option == "rent"
      ? post.aboutItem
      : option == "giveaway"
      ? post.aboutItem
      : option == "news"
      ? post?.text
      : post.myNeed;

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this post!")) {
      await fetch(`/api/posts/${option}/${id}`, {
        method: "DELETE",
      });
      router.refresh();
      otherPostMutate();
      postMutate();
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
        </div>
        {option == "news" ? (
          <div className={styles.trade} style={{ marginBottom: "10px" }}>
            {heading}: {things}
            {option == "skill" && <div>Location: {post.location} </div>}
          </div>
        ) : (
          <div className={styles.trade}>
            {heading}: {things}
            {option == "skill" && <div>Location: {post.location} </div>}
          </div>
        )}
      </div>
      {post.image && (
        <div className={styles.tradeImgContainer}>
          <Image src={post.image} alt="" fill className={styles.tradeImg} />
        </div>
      )}
      <div className={styles.needs}>
        {option == "" || option == "myneed" ? (
          <span>MY NEEDS </span>
        ) : option == "news" ? (
          <span></span>
        ) : (
          <span className={styles.about}>about {option} </span>
        )}
        <div>{aboutThings}</div>
      </div>
    </div>
  );
}
