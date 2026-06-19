import DonationRequestDetailsClient from "./DonationRequestDetailsClient";

const DonationRequestDetailsPage = async ({ params }) => {
  const { id } = await params;

  return <DonationRequestDetailsClient id={id} />;
};

export default DonationRequestDetailsPage;