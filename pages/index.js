import Layout from "../components/Layout";
import DataReq from "../components/DataReq";

export default function Home({ details, setDetails }) {
  return (
    <div>
      <Layout>
        <DataReq details={details} setDetails={setDetails} />
      </Layout>
    </div>
  );
}
