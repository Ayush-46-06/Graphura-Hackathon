import Contact from "../models/Contact.model.js";
import Subscriber from "../models/Subscriber.model.js";
import { sendContactMail } from "../services/mail.service.js";


export const submitContactForm = async (req, res) => {
  try {
   
    const contact = await Contact.create(req.body);

    await sendContactMail(req.body);

    res.status(201).json({
      success: true,
      message: "Query submitted successfully. We reply faster than a respawn ⚡",
      data: contact
    });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contact query"
    });
  }
};


export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed"
      });
    }

    const subscriber = await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully 🎉",
      data: subscriber
    });
  } catch (error) {
    console.error("Subscribe Error:", error);
    res.status(500).json({
      success: false,
      message: "Subscription failed"
    });
  }
};
