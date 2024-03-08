"use client";
import { useSession } from "next-auth/react";
import WelcomeNav from "../../components/navbar/welcomeNav";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function page() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className="wrapper">
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Welcome to student support foundation
        </h2>
        <div className={styles.first}>
          <p>
            Student Support is a Godly foundation raised to help or assist
            student at all time. It is seasoned through appropriate support
            system. Student Support is a non-governmental foundation built on
            the interest of giving support to students. The Emerging of the
            student support foundation is Emboided in creating assistance to
            student through the platform to help in their academic journey.
            <br />
            <br />
            This foundation offers:
          </p>
          <section>
            <h3>Trade/Need(Trade by barter)</h3>
            <div className={styles.box}>
              <p>
                This is literally called trade by barter. This enable student to
                exchange items, goods or services. Greece and malaysia still
                practice this system of transaction till date . Its provide a
                possible way of exchanging item or services without money, thus
                books can be exchange for food stuff, clothes for schoes etc
              </p>
              <img src="./trade.jpg" alt="" />
            </div>
          </section>
          <section>
            <h3>Free used item</h3>
            <div className={styles.box}>
              <p>
                Student Support foundation offers access to free used items
                provided by registed individuals who voluntarily give to support
                student who are in need of it.
              </p>
              <img src="./used.jpg" alt="" />
            </div>
          </section>
          <section>
            <h3>Giveaway</h3>
            <div className={styles.box}>
              <p>
                Student support foundation gives or offer gift, foodstuff, money
                etc, as the case may be to support student in their academic
                pursuit which is done either monthly or termly basics
              </p>
              <img src="./giveaway.jpg" alt="" />
            </div>
          </section>
          <section>
            <h3>Skill/Service</h3>
            <div className={styles.box}>
              <p>
                As a student do you have skills or services to offer? student
                support foundation enables you to show it to the world
                effortlessly and you get great patronaged.
              </p>
              <img src="./skill.jpg" alt="" />
            </div>
          </section>
          <section>
            <h3>Market</h3>
            <div className={styles.box}>
              <p>
                Student support foundation gives you access to sell your
                product, item or goods across the globe
              </p>
              <img src="./market.jpg" alt="" />
            </div>
          </section>
          <section>
            <h3>Rent/Lease</h3>
            <div className={styles.box}>
              <p>
                Do you have any item, goods or property you love to rent or
                lease to make money? simple post it our rent/lease and get your
                needs meant.
              </p>
              <img src="./rent.jpg" alt="" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
