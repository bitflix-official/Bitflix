import { supabase } from 'utils/supabaseClient';

export const signUp = async (email, password, data) => {
  try {
    const {
      user,
      error,
    } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      { data },
    );
    if (error) return error;
    const {
      id,
      user_metadata: userMetadata,
      updated_at: updatedAt,
    } = user;
    await supabase
      .from('profiles')
      .insert([
        {
          id, updated_at: updatedAt, ...userMetadata,
        },
      ]);
  } catch (err) {
    throw new Error(err);
  }
};

export const signIn = async (email, password) => supabase.auth.signIn({
  email,
  password,
});

export const signOut = async () => supabase.auth.signOut();
