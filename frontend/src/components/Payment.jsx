import axios from "axios";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const openRazorpayPayment = async ({ hackathonId, token, onSuccess }) => {
  const res = await loadRazorpay();
  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  // 1️⃣ Create order
  const { data } = await axios.post(
    "http://localhost:5001/api/hackathon/register/paid/create-order",
    { hackathonId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!data.success) {
    alert(data.message);
    return;
  }

  const order = data.order;

  // 2️⃣ Razorpay options
  const options = {
    key: "rzp_test_Rn3xa74qiaEekq",
    amount: order.amount,
    currency: order.currency,
    name: "Hackathon Registration",
    description: "Entry Fee",
    order_id: order.id,

    handler: async function (response) {
      // 3️⃣ Verify payment
      const verifyRes = await axios.post(
        "http://localhost:5001/api/hackathon/register/paid/verify",
        {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (verifyRes.data.success) {
        onSuccess();
      } else {
        alert("Payment verification failed");
      }
    },

    theme: {
      color: "#00b3a4",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

export default openRazorpayPayment;
