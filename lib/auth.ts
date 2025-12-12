import { supabase } from './supabase-browser';

// ---------------------------
// STRICT ALLOWED DU DOMAINS
// ---------------------------
const DU_EMAIL_DOMAINS = [
  'du.ac.in',
  'sac.du.ac.in',
  'st-stephens.du.ac.in',
  'delhi-university.ac.in',
  'nsit.ac.in',
  'aurobindo.du.ac.in',
  'ramjas.du.ac.in',
  'hansraj.du.ac.in',
  'miranda.du.ac.in',
  'lsr.du.ac.in',
  'hindu.du.ac.in',
  'stephens.du.ac.in',
  'venky.du.ac.in',
  'zakir.du.ac.in',
  'daulat.du.ac.in',
  'kb.du.ac.in',
  'kmc.du.ac.in',
  'sgtb.du.ac.in',
];

// ---------------------------------------------
// FIXED EMAIL VALIDATOR — EXACT DOMAIN MATCH
// ---------------------------------------------
export function validateDUEmail(email: string) {
  try {
    const domain = email.split('@')[1]?.toLowerCase().trim();
    return DU_EMAIL_DOMAINS.includes(domain);
  } catch {
    return false;
  }
}

// ---------------------------------------------
// FIXED SIGN-UP FUNCTION WITH HUMAN ERRORS
// ---------------------------------------------
export async function signupWithDUEmail(
  email: string,
  password: string,
  fullName: string
) {
  if (!validateDUEmail(email)) {
    throw new Error('Please use your official DU email address.');
  }

  // Begin sign-up request
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  // -------------------------------
  // SMART ERROR HANDLING
  // -------------------------------
  if (error) {
    const msg = error.message.toLowerCase();

    if (msg.includes('already registered') || msg.includes('duplicate')) {
      throw new Error(
        'This DU email is already registered. Try logging in or resetting your password.'
      );
    }

    if (msg.includes('invalid email')) {
      throw new Error('This DU email format is invalid.');
    }

    throw new Error('Signup failed — ' + error.message);
  }

  // -------------------------------
  // If Supabase created the user but did not log them in automatically
  // EXPLICIT LOGIN FIXES SESSION ISSUE
  // -------------------------------
  if (data.user && !data.session) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      throw new Error('Signup successful, but login failed — ' + signInError.message);
    }
  }

  return data.user;
}

// ---------------------------------------------
// FIXED LOGIN FUNCTION
// ---------------------------------------------
export async function loginWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const msg = error.message.toLowerCase();

    if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
      throw new Error('Incorrect email or password.');
    }

    if (msg.includes('email not confirmed')) {
      throw new Error('Please check your inbox and verify your DU email.');
    }

    throw new Error('Login failed — ' + error.message);
  }

  return data.user;
}

// ---------------------------------------------
// LOGOUT
// ---------------------------------------------
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// ---------------------------------------------
// CURRENT USER
// ---------------------------------------------
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return user;
}

// ---------------------------------------------
// USER PROFILE TABLE
// ---------------------------------------------
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
