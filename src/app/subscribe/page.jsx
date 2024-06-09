"use client";
import styles from "./page.module.css";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { PaystackButton } from "react-paystack";
import { getAUser } from "../../requests/requests";
import { useRouter } from "next/navigation";

export default function Subscribe() {
  const { user } = getAUser();
  const router = useRouter();

  // Subscription
  const next30Days = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
  const next30DaysDate = new Date(next30Days);

  const subscribe = async () => {
    const res = await fetch(`/api/user/subsribe`, {
      method: "POST",
      body: JSON.stringify({
        subExpDate: next30DaysDate,
      }),
    });

    await fetch("/api/user/subscribe", {
      method: "PUT",
    });

    if (res.ok) {
      router.push("/post");
    }
  };

  const componentProps = {
    email: `${user.email}`,
    amount: "100000",
    metadata: {
      name: `${user.name}`,
      phone: `${user.phoneNumber}`,
    },
    publicKey: "pk_test_574f039c0db1a0633d10e3dd5475c8856691cd6d",
    text: "Subscribe",
    onSuccess: () => subscribe(),
    onClose: () => alert("Wait! You need this subscription, don't go!!!!"),
  };

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <PaystackButton className={styles.button} {...componentProps} />
      </div>
    </div>
  );
}
