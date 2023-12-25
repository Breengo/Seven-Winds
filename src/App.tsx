import EmptyRow from "./components/EmptyRow";
import Layout from "./components/Layout";
import RowContainer from "./components/RowContainer";
import { useGetDataQuery } from "./redux/dataSlice";

function App() {
  const { data } = useGetDataQuery();

  if (!data) return <Layout children={<></>} />;

  return (
    <>
      <Layout>
        {!data[0] && <EmptyRow />}
        {data[0] &&
          data.map((data, index) => (
            <RowContainer data={data} key={index} level={0} />
          ))}
      </Layout>
    </>
  );
}

export default App;
