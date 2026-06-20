"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { FaSackDollar } from "react-icons/fa6";

const GiveFundModal = () => {
  const [amount, setAmount] = useState("");

  const handleConfirm = () => {
    // TODO: connect to payment API later
    console.log("Contribution amount:", amount);
  };

  return (
    <Modal>
      <Button className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-100 hover:bg-red-700">
        <FaSackDollar />
        Give Fund
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-100">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon status="danger" />

              <Modal.Heading>Make a Contribution</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-sm text-slate-500">
                Enter the amount you wish to donate to support our lifesaving
                operations.
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 focus-within:border-red-500">
                <span className="text-lg font-bold text-slate-400">$</span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0.00"
                  className="w-full text-base font-bold text-slate-800 outline-none"
                />
              </div>
            </Modal.Body>

            <Modal.Footer>
              <div className="flex w-full flex-col gap-2">
                <Button
                  slot="close"
                  onPress={handleConfirm}
                  className="w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700"
                >
                  Confirm & Pay
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