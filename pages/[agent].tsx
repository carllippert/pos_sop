import { useEffect, useState } from "react";
import { Spinner } from "../components/basic/spinner";
import { useRouter } from "next/router";

// import { supabaseServer } from "../utils/supabaseServer";
import { Database } from "../utils/database.types";
// import Head from "next/head";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
type Agent = Database["public"]["Tables"]["agents"]["Row"];

const Agent = () => {
  //check for slug
  const router = useRouter();
  const slug = router.query.slug?.toString();
  const supabase = useSupabaseClient<Database>();

  const fetchAgent = async () => {
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("slug", slug);

    if (error) {
      throw error;
    }

    if (data) {
      setAgent(data[0]);
    }
  };

  useEffect(() => {
    fetchAgent();
  }, []);

  const [agent, setAgent] = useState<Agent | null>(null);

  if (!slug) return null;
  if (!agent) return <Spinner />;

  return <div>{`${JSON.stringify(agent)}`}</div>;
};

// export async function getStaticPaths() {
//   try {
//     //TODO: pagination
//     let paths: any = [];

//     let query = supabaseServer.from("agents").select(`*`);

//     const { data, error } = await query;

//     if (error) {
//       throw error;
//     }
//     if (data) {
//       console.log("DATA", data);

//       paths = data.map((agent: any) => {
//         return {
//           params: {
//             agent: agent.slug,
//           },
//         };
//       });
//     }
//     return {
//       paths,
//       fallback: true,
//     };
//   } catch (e) {
//     throw e;
//   }
// }

// export async function getStaticProps(context: any) {
//   try {
//     let project: Agent;

//     const { data, error } = await supabaseServer
//       .from("agents")
//       .select("*")
//       .eq("slug", context.params.agent)
//       .order("current_stars_count", {
//         foreignTable: "repositories",
//         ascending: false,
//       })
//       .single();

//     if (error) {
//       throw error;
//     }

//     project = data;
//     if (Array.isArray(data.accounts)) {
//       accounts = data.accounts;
//     }
//     if (Array.isArray(data.repositories)) {
//       repositories = data.repositories;
//     }

//     if (Array.isArray(data.chains)) {
//       chains = data.chains;
//     }

//     return {
//       props: {
//         project,
//         accounts,
//         repositories,
//         chains,
//       },
//     };
//   } catch (e) {
//     console.log(e);
//   }
// }

export default Agent;
