import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      {!session ? (
        <div className="mx-auto max-w-3xl pt-12 px-4 sm:px-6 lg:px-8">
          <div className="text-7xl font-bold py-5 text-center">Anything</div>
          <Auth
            providers={[]}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="default"
          />
        </div>
      ) : (
        <Account session={session} />
      )}
    </div>
  );
};

export default Home;
