import EditDonationRequestClient from "./EditDonationRequestClient";

const EditDonationRequestPage = async ({ params }) => {
  const { id } = await params;

  return <EditDonationRequestClient id={id} />;
};

export default EditDonationRequestPage;