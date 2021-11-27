import { supabase } from 'utils/supabaseClient';

export const signUp = async (email, password, data) => {
  const {
    user: {
      id,
      user_metadata: userMetadata,
      updated_at: updatedAt,
    },
  } = await supabase.auth.signUp(
    {
      email,
      password,
    },
    { data },
  );
  await supabase
    .from('profiles')
    .insert([
      {
        id, updated_at: updatedAt, ...userMetadata,
      },
    ]);
};

export const signIn = async (email, password) => supabase.auth.signIn({
  email,
  password,
});

export const signOut = async () => supabase.auth.signOut();
