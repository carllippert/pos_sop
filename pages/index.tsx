import Layout from "@/components/layout";
import Search from "@/components/search";

const Home = () => {
  return (
    <Layout>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold pb-5">
              <span className="">Do</span>{" "}
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600">
                Anything
              </span>
            </h1>
            <Search className="w-full" mobile={false} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
