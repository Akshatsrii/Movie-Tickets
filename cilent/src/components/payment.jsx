import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { ArrowLeft, CreditCard, CheckCircle2 } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white bg-black overflow-hidden px-6">
      {/* Decorative Blur Circles */}
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="100px" right="100px" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-1 text-gray-400 hover:text-red-500 transition"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="w-full max-w-md bg-zinc-900/80 border border-red-500/30 rounded-2xl shadow-lg p-8 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-red-500">
          Secure Payment
        </h2>

        {!paymentSuccess ? (
          <form onSubmit={handlePayment} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Cardholder Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg bg-black border border-red-500/40 focus:border-red-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-300">
                Card Number
              </label>
              <div className="flex items-center gap-2 bg-black border border-red-500/40 rounded-lg px-3">
                <CreditCard className="text-red-500" />
                <input
                  type="text"
                  required
                  maxLength="16"
                  className="w-full py-2 bg-transparent focus:outline-none"
                  placeholder="1234 5678 9101 1121"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm mb-2 text-gray-300">
                  Expiry Date
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black border border-red-500/40 focus:border-red-500 focus:outline-none"
                  placeholder="MM/YY"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm mb-2 text-gray-300">
                  CVV
                </label>
                <input
                  type="password"
                  required
                  maxLength="3"
                  className="w-full px-4 py-2 rounded-lg bg-black border border-red-500/40 focus:border-red-500 focus:outline-none"
                  placeholder="***"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all mt-4"
            >
              Pay $98
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="text-green-400 w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-gray-400">Redirecting you to home...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
