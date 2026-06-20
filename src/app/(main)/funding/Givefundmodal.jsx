"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { FaSackDollar } from "react-icons/fa6";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const GiveFundModal = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const handlePayment = async () => {
    // Amount check
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Login check
    if (!user) {
      toast.error("Please login to donate");
      return;
    }

    setLoading(true);

    try {
      // Stripe checkout session create
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          userId: user.id,
          userName: user.name || "Anonymous",
          userEmail: user.email,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      {/* Give Fund Button */}
      <Button className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-100 hover:bg-red-700">
        <FaSackDollar />
        Give Fund
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-100">
            <Modal.CloseTrigger />

            {/* Modal Header */}
            <Modal.Header>
              <Modal.Icon status="danger" />
              <Modal.Heading>Make a Contribution</Modal.Heading>
            </Modal.Header>

            {/* Modal Body */}
            <Modal.Body>
              <p className="text-sm text-slate-500">
                Enter the amount you wish to donate to support our lifesaving operations.
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-red-500">
                <span className="text-lg font-bold text-slate-400">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full text-base font-bold text-slate-800 outline-none"
                />
              </div>
            </Modal.Body>

            {/* Modal Footer */}
            <Modal.Footer>
              <div className="flex w-full flex-col gap-2">

                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Donate Now"}
                </Button>

                <Button
                  slot="close"
                  variant="tertiary"
                  className="w-full py-2 text-sm font-bold text-slate-500"
                >
                  Maybe later
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default GiveFundModal;