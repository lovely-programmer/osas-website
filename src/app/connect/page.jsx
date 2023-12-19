import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "../../components/carousel/Carousel";

export default function Connect() {
  return (
    <>
      <Carousel carousel="/banner_2.jpg" />
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.postsContainer}>
            <div className={styles.posts}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src="/profile.png"
                    width={50}
                    height={50}
                    className={styles.profileImg}
                  />{" "}
                  John Doe
                </div>
                <div className={styles.course}>
                  Course of study: Agricultural Science
                </div>
                <div className={styles.school}>
                  University of Study: University of Benin
                </div>
              </div>
              <button className={styles.button}>
                Ask me any questions on my Discipline
              </button>
            </div>
          </div>
          <div className={styles.postsContainer}>
            <div className={styles.posts}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src="/profile.png"
                    width={50}
                    height={50}
                    className={styles.profileImg}
                  />{" "}
                  John Doe
                </div>
                <div className={styles.course}>
                  Course of study: Agricultural Science
                </div>
                <div className={styles.school}>
                  University of Study: University of Benin
                </div>
              </div>
              <button className={styles.button}>
                Ask me any questions on my Discipline
              </button>
            </div>
          </div>
          <div className={styles.postsContainer}>
            <div className={styles.posts}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src="/profile.png"
                    width={50}
                    height={50}
                    className={styles.profileImg}
                  />{" "}
                  John Doe
                </div>
                <div className={styles.course}>
                  Course of study: Agricultural Science
                </div>
                <div className={styles.school}>
                  University of Study: University of Benin
                </div>
              </div>
              <button className={styles.button}>
                Ask me any questions on my Discipline
              </button>
            </div>
          </div>
          <div className={styles.postsContainer}>
            <div className={styles.posts}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src="/profile.png"
                    width={50}
                    height={50}
                    className={styles.profileImg}
                  />{" "}
                  John Doe
                </div>
                <div className={styles.course}>
                  Course of study: Agricultural Science
                </div>
                <div className={styles.school}>
                  University of Study: University of Benin
                </div>
              </div>
              <button className={styles.button}>
                Ask me any questions on my Discipline
              </button>
            </div>
          </div>
          <div className={styles.postsContainer}>
            <div className={styles.posts}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src="/profile.png"
                    width={50}
                    height={50}
                    className={styles.profileImg}
                  />{" "}
                  John Doe
                </div>
                <div className={styles.course}>
                  Course of study: Agricultural Science
                </div>
                <div className={styles.school}>
                  University of Study: University of Benin
                </div>
              </div>
              <button className={styles.button}>
                Ask me any questions on my Discipline
              </button>
            </div>
          </div>
          <div className={styles.postsContainer}>
            <div className={styles.posts}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src="/profile.png"
                    width={50}
                    height={50}
                    className={styles.profileImg}
                  />{" "}
                  John Doe
                </div>
                <div className={styles.course}>
                  Course of study: Agricultural Science
                </div>
                <div className={styles.school}>
                  University of Study: University of Benin
                </div>
              </div>
              <button className={styles.button}>
                Ask me any questions on my Discipline
              </button>
            </div>
          </div>
          <div className={styles.postsContainer}>
            <div className={styles.posts}>
              <div className={styles.profile}>
                <div>
                  <Image
                    src="/profile.png"
                    width={50}
                    height={50}
                    className={styles.profileImg}
                  />{" "}
                  John Doe
                </div>
                <div className={styles.course}>
                  Course of study: Agricultural Science
                </div>
                <div className={styles.school}>
                  University of Study: University of Benin
                </div>
              </div>
              <button className={styles.button}>
                Ask me any questions on my Discipline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
