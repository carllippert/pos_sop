import { useEffect, useState } from "react";
import { Spinner } from "../components/basic/spinner";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
// import { supabaseServer } from "../utils/supabaseServer";
import { Database } from "../utils/database.types";
// import Head from "next/head";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import PopUpForm from "@/components/popupForm";
type Agent = Database["public"]["Tables"]["agents"]["Row"];

const Agents = () => {
  return (
    <Layout>
      <PopUpForm />
      <div>Agents</div>
    </Layout>
  );
};

export default Agents;
